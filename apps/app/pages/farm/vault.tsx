import ClaimDelegation from '@/components/BasePool/ClaimDelegation'
import BasePoolList from '@/components/BasePool/List'
import CreateBasePoolButton from '@/components/CreateBasePoolButton'
import PageHeader from '@/components/PageHeader'
import PromiseButton from '@/components/PromiseButton'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import getCastableReward from '@/lib/getVaultCastableReward'
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
  const castableVaults = useMemo(() => {
    return (
      edges
        ?.map((edge) => {
          return [edge.node.id, getCastableReward(edge.node)] as const
        })
        .filter(([, reward]) => reward.gt(0)) || []
    )
  }, [edges])
  const castableRewards = useMemo(() => {
    return castableVaults.reduce(
      (acc, [, reward]) => acc.plus(reward),
      new Decimal(0)
    )
  }, [castableVaults])
  const claimableVaults = useMemo(
    () =>
      edges
        ?.map(({node}) => node)
        .filter(
          (node) => node.vault && node.vault.claimableOwnerShares !== '0'
        ) || [],
    [edges]
  )
  const claimableDelegation = useMemo(() => {
    return claimableVaults.reduce((acc, cur) => {
      if (!cur.vault) return acc
      return acc.plus(
        new Decimal(cur.sharePrice).times(cur.vault?.claimableOwnerShares)
      )
    }, new Decimal(0))
  }, [claimableVaults])

  const mintAll = useCallback(async () => {
    if (!api) return
    let extrinsic
    const extrinsics = castableVaults.map(([id]) =>
      api.tx.phalaVault.maybeGainOwnerShares(id)
    )
    if (extrinsics.length === 1) {
      extrinsic = extrinsics[0]
    } else {
      extrinsic = api.tx.utility.batch(extrinsics)
    }
    return signAndSend(extrinsic)
  }, [api, castableVaults, signAndSend])

  return (
    <>
      <PageHeader title="My Vaults" />
      <Stack
        direction="row"
        spacing={2}
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Stack spacing={0.5}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Typography variant="h6" component="h2" color="text.secondary">
              Castable Rewards
            </Typography>
            <Typography variant="num3">
              {!isLoading && castableRewards ? (
                `${toCurrency(castableRewards)} PHA`
              ) : (
                <Skeleton width={100} />
              )}
            </Typography>
            <PromiseButton
              size="small"
              onClick={mintAll}
              disabled={!castableVaults.length}
            >
              Mint All
            </PromiseButton>
          </Stack>

          <Stack spacing={2} direction="row" alignItems="center">
            <Typography variant="h6" component="h2" color="text.secondary">
              Claimable Delegation
            </Typography>
            <Typography variant="num3">
              {!isLoading && claimableDelegation ? (
                `${toCurrency(claimableDelegation)} PHA`
              ) : (
                <Skeleton width={100} />
              )}
            </Typography>
            <Button
              size="small"
              disabled={!claimableVaults.length}
              onClick={() => {
                setDialogOpen(true)
              }}
            >
              Claim All
            </Button>
          </Stack>
        </Stack>

        <CreateBasePoolButton kind="Vault" />
      </Stack>
      <Box mt={3}>
        <BasePoolList kind="Vault" variant="farm" />
      </Box>
      <Dialog open={dialogOpen} onClose={onClose}>
        <ClaimDelegation basePools={claimableVaults} onClose={onClose} />
      </Dialog>
    </>
  )
}

export default MyVaults
