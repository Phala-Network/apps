import ClaimDelegation from '@/components/BasePool/ClaimDelegation'
import BasePoolList from '@/components/BasePool/List'
import CreateBasePoolButton from '@/components/CreateBasePoolButton'
import PageHeader from '@/components/PageHeader'
import PromiseButton from '@/components/PromiseButton'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import getVaultOwnerCut from '@/lib/getVaultOwnerCut'
import {subsquidClient} from '@/lib/graphql'
import {useOwnedVaultsQuery} from '@/lib/subsquidQuery'
import {Box, Button, Dialog, Skeleton, Stack, Typography} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {toCurrency} from '@phala/util'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {FC, useCallback, useMemo, useState} from 'react'

const MyVaults: FC = () => {
  const api = usePolkadotApi()
  const [dialogOpen, setDialogOpen] = useState(false)
  const onClose = useCallback(() => {
    setDialogOpen(false)
  }, [])
  const [account] = useAtom(polkadotAccountAtom)
  const signAndSend = useSignAndSend()
  const {data, isLoading} = useOwnedVaultsQuery(
    subsquidClient,
    {accountId: account?.address},
    {enabled: !!account}
  )
  const edges = data?.basePoolsConnection.edges
  const vaultsWithOwnerCut = useMemo(() => {
    return (
      edges
        ?.map((edge) => {
          return [edge.node.id, getVaultOwnerCut(edge.node)] as const
        })
        .filter(([, reward]) => reward.gt(0)) || []
    )
  }, [edges])
  const ownerCut = useMemo(() => {
    return vaultsWithOwnerCut.reduce(
      (acc, [, reward]) => acc.plus(reward),
      new Decimal(0)
    )
  }, [vaultsWithOwnerCut])
  const vaultsWithOwnerRewards = useMemo(
    () =>
      edges
        ?.map(({node}) => node)
        .filter(
          (node) => node.vault && node.vault.claimableOwnerShares !== '0'
        ) || [],
    [edges]
  )
  const ownerRewards = useMemo(() => {
    return vaultsWithOwnerRewards.reduce((acc, cur) => {
      if (!cur.vault) return acc
      return acc.plus(
        new Decimal(cur.sharePrice).times(cur.vault?.claimableOwnerShares)
      )
    }, new Decimal(0))
  }, [vaultsWithOwnerRewards])

  const mintAll = useCallback(async () => {
    if (!api) return
    let extrinsic
    const calls = vaultsWithOwnerCut.map(([id]) =>
      api.tx.phalaVault.maybeGainOwnerShares(id)
    )
    if (calls.length === 1) {
      extrinsic = calls[0]
    } else {
      extrinsic = api.tx.utility.batch(calls)
    }
    return signAndSend(extrinsic)
  }, [api, vaultsWithOwnerCut, signAndSend])

  return (
    <>
      <PageHeader title="My Vaults" />
      <Stack
        direction="row"
        spacing={2}
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Stack spacing={0.5}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Typography variant="h6" component="h2" color="text.secondary">
              Owner Cut
            </Typography>
            <Typography variant="num3">
              {!isLoading && ownerCut ? (
                `${toCurrency(ownerCut)} PHA`
              ) : (
                <Skeleton width={100} />
              )}
            </Typography>
            <PromiseButton
              size="small"
              onClick={mintAll}
              disabled={!vaultsWithOwnerCut.length}
            >
              Mint Cut
            </PromiseButton>
          </Stack>

          <Stack spacing={2} direction="row" alignItems="center">
            <Typography variant="h6" component="h2" color="text.secondary">
              Owner Rewards
            </Typography>
            <Typography variant="num3">
              {!isLoading && ownerRewards ? (
                `${toCurrency(ownerRewards)} PHA`
              ) : (
                <Skeleton width={100} />
              )}
            </Typography>
            <Button
              size="small"
              disabled={!vaultsWithOwnerRewards.length}
              onClick={() => {
                setDialogOpen(true)
              }}
            >
              Claim to Delegation
            </Button>
          </Stack>
        </Stack>

        <CreateBasePoolButton kind="Vault" />
      </Stack>
      <Box mt={3}>
        <BasePoolList kind="Vault" variant="farm" />
      </Box>
      <Dialog open={dialogOpen} onClose={onClose}>
        <ClaimDelegation basePools={vaultsWithOwnerRewards} onClose={onClose} />
      </Dialog>
    </>
  )
}

export default MyVaults
