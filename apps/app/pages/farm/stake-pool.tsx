import ClaimReward from '@/components/BasePool/ClaimReward'
import BasePoolList from '@/components/BasePool/List'
import CreateBasePoolButton from '@/components/CreateBasePoolButton'
import PageHeader from '@/components/PageHeader'
import Property from '@/components/Property'
import {subsquidClient} from '@/lib/graphql'
import {useClaimableStakePoolsQuery} from '@/lib/subsquidQuery'
import {Box, Button, Dialog, Skeleton, Stack} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {toCurrency} from '@phala/util'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {useCallback, useMemo, useState, type FC} from 'react'

const MyStakePools: FC = () => {
  const [account] = useAtom(polkadotAccountAtom)
  const [dialogOpen, setDialogOpen] = useState(false)
  const {data: edges} = useClaimableStakePoolsQuery(
    subsquidClient,
    {accountId: account?.address, gt: '0'},
    {
      enabled: account !== null,
      select: (data) => data.basePoolsConnection.edges,
    }
  )
  const ownerReward = useMemo(() => {
    if (edges == null) return
    return edges.reduce((acc, cur) => {
      if (cur.node.stakePool != null) {
        return acc.plus(cur.node.stakePool.ownerReward)
      }
      return acc
    }, new Decimal(0))
  }, [edges])
  const claimablePools = useMemo(() => {
    if (edges == null) return []
    return edges.map((edge) => edge.node)
  }, [edges])

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
          <Property
            label="Owner Rewards"
            wikiEntry="stakePoolOwnerRewards"
            size="large"
          >
            {ownerReward != null ? (
              `${toCurrency(ownerReward)} PHA`
            ) : (
              <Skeleton width={100} />
            )}
          </Property>

          <Button
            size="small"
            disabled={ownerReward == null || ownerReward.eq(0)}
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
