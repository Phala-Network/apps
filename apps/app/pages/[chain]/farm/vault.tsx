import ClaimDelegation from '@/components/BasePool/ClaimDelegation'
import BasePoolList from '@/components/BasePool/List'
import FarmChart from '@/components/FarmChart'
import PageHeader from '@/components/PageHeader'
import PromiseButton from '@/components/PromiseButton'
import Property from '@/components/Property'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import getVaultOwnerCut from '@/lib/getVaultOwnerCut'
import {useOwnedVaultsQuery} from '@/lib/subsquidQuery'
import {subsquidClientAtom} from '@/store/common'
import {
  Box,
  Button,
  Dialog,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import {toCurrency} from '@phala/lib'
import {polkadotAccountAtom} from '@phala/store'
import type {SubmittableExtrinsic} from '@polkadot/api/types'
import type {ISubmittableResult} from '@polkadot/types/types'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {type FC, useCallback, useMemo, useState} from 'react'

const MyVaults: FC = () => {
  const api = usePolkadotApi()
  const [dialogOpen, setDialogOpen] = useState(false)
  const onClose = useCallback(() => {
    setDialogOpen(false)
  }, [])
  const [account] = useAtom(polkadotAccountAtom)
  const signAndSend = useSignAndSend()
  const [subsquidClient] = useAtom(subsquidClientAtom)
  const {data: edges, isLoading} = useOwnedVaultsQuery(
    subsquidClient,
    {accountId: account?.address},
    {
      enabled: account !== null,
      select: (data) => data.basePoolsConnection.edges,
    },
  )
  const vaultsWithOwnerCut = useMemo(() => {
    if (edges != null) {
      return edges
        .map((edge) => {
          return [edge.node.id, getVaultOwnerCut(edge.node)] as const
        })
        .filter(([, reward]) => reward.gt(0))
    }
    return []
  }, [edges])
  const ownerCut = useMemo(() => {
    return vaultsWithOwnerCut.reduce(
      (acc, [, reward]) => acc.plus(reward),
      new Decimal(0),
    )
  }, [vaultsWithOwnerCut])
  const vaultsWithOwnerRewards = useMemo(() => {
    if (edges !== undefined) {
      return edges
        .map(({node}) => node)
        .filter(
          (node) =>
            node.vault != null && node.vault.claimableOwnerShares !== '0',
        )
    }
    return []
  }, [edges])
  const ownerRewards = useMemo(() => {
    return vaultsWithOwnerRewards.reduce((acc, cur) => {
      if (cur.vault == null) return acc
      return acc.plus(
        new Decimal(cur.sharePrice).times(cur.vault?.claimableOwnerShares),
      )
    }, new Decimal(0))
  }, [vaultsWithOwnerRewards])

  const mintAll = useCallback(async () => {
    if (api == null) return
    let extrinsic: SubmittableExtrinsic<'promise', ISubmittableResult>
    const calls = vaultsWithOwnerCut.map(([id]) =>
      api.tx.phalaVault.maybeGainOwnerShares(id),
    )
    if (calls.length === 1) {
      extrinsic = calls[0]
    } else {
      extrinsic = api.tx.utility.batch(calls)
    }
    await signAndSend(extrinsic)
  }, [api, vaultsWithOwnerCut, signAndSend])

  return (
    <>
      <PageHeader title="My Vaults" />
      <Stack
        mt={{xs: 0, md: -12}}
        direction={{xs: 'column', md: 'row'}}
        alignItems={{xs: 'unset', md: 'flex-end'}}
        spacing={2}
      >
        <Stack
          flex={{xs: 0, md: 1}}
          spacing={3}
          direction={{xs: 'column', md: 'row'}}
        >
          <Stack spacing={2} direction="row" alignItems="center">
            <Property label="Owner Cut" wikiEntry="ownerCut">
              {!isLoading ? (
                `${toCurrency(ownerCut)} PHA`
              ) : (
                <Skeleton width={100} />
              )}
            </Property>

            <PromiseButton
              size="small"
              color="secondary"
              variant="contained"
              onClick={mintAll}
              disabled={vaultsWithOwnerCut.length === 0}
            >
              Mint Cut
            </PromiseButton>
          </Stack>

          <Stack spacing={2} direction="row" alignItems="center">
            <Property label="Owner Rewards" wikiEntry="vaultOwnerRewards">
              {!isLoading ? (
                `${toCurrency(ownerRewards)} PHA`
              ) : (
                <Skeleton width={100} />
              )}
            </Property>

            <Button
              size="small"
              color="secondary"
              variant="contained"
              disabled={vaultsWithOwnerRewards.length === 0}
              onClick={() => {
                setDialogOpen(true)
              }}
            >
              Claim to Delegation
            </Button>
          </Stack>
        </Stack>
        <Paper sx={{background: 'transparent', flex: {xs: 0, md: 1}}}>
          <Typography variant="h6" lineHeight={1} m={2}>
            Total Daily Owner Rewards
          </Typography>
          <Box height={140}>
            {account != null && (
              <FarmChart account={account.address} kind="Vault" />
            )}
          </Box>
        </Paper>
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
