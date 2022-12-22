import BasePoolList from '@/components/BasePool/List'
import CreateBasePoolButton from '@/components/CreateBasePoolButton'
import PageHeader from '@/components/PageHeader'
import {subsquidClient} from '@/lib/graphql'
import {useClaimableStakePoolsQuery} from '@/lib/subsquidQuery'
import {Box, Button, Dialog, Skeleton, Stack, Typography} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {toCurrency} from '@phala/util'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import dynamic from 'next/dynamic'
import {FC, useCallback, useMemo, useState} from 'react'

const ClaimReward = dynamic(() => import('@/components/BasePool/ClaimReward'))

const MyStakePools: FC = () => {
  const [account] = useAtom(polkadotAccountAtom)
  const [dialogOpen, setDialogOpen] = useState(false)
  const {data} = useClaimableStakePoolsQuery(
    subsquidClient,
    {
      accountId: account?.address,
    },
    {enabled: !!account}
  )
  const ownerReward = useMemo(() => {
    if (!data) return
    return data.basePoolsConnection.edges.reduce((acc, cur) => {
      if (cur.node.stakePool) {
        return acc.plus(cur.node.stakePool.ownerReward)
      }
      return acc
    }, new Decimal(0))
  }, [data])
  const claimablePools = useMemo(() => {
    if (!data) return []
    return data.basePoolsConnection.edges.map((edge) => edge.node)
  }, [data])

  const onClose = useCallback(() => {
    setDialogOpen(false)
  }, [])

  return (
    <>
      <PageHeader title="My StakePools" />
      <Stack
        direction="row"
        alignContent="center"
        justifyContent="space-between"
      >
        <Stack spacing={2} direction="row" alignItems="center">
          <Typography variant="h6" component="h2" color="text.secondary">
            Owner Rewards
          </Typography>
          <Typography variant="num3">
            {ownerReward ? (
              `${toCurrency(ownerReward)} PHA`
            ) : (
              <Skeleton width={100} />
            )}
          </Typography>

          <Button
            size="small"
            disabled={!ownerReward || ownerReward.eq(0)}
            onClick={() => {
              setDialogOpen(true)
            }}
          >
            Claim All
          </Button>
        </Stack>
        <CreateBasePoolButton kind="StakePool" />
      </Stack>
      <Box mt={3}>
        <BasePoolList kind="StakePool" variant="farm" />
      </Box>

      <Dialog open={dialogOpen} onClose={onClose}>
        <ClaimReward basePools={claimablePools} onClose={onClose} />
      </Dialog>
    </>
  )
}

export default MyStakePools
