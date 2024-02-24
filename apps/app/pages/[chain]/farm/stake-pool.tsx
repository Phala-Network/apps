import ClaimReward from '@/components/BasePool/ClaimReward'
import BasePoolList from '@/components/BasePool/List'
import FarmChart from '@/components/FarmChart'
import PageHeader from '@/components/PageHeader'
import Property from '@/components/Property'
import {useClaimableStakePoolsQuery} from '@/lib/subsquidQuery'
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
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {type FC, useCallback, useMemo, useState} from 'react'

const MyStakePools: FC = () => {
  const [account] = useAtom(polkadotAccountAtom)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [subsquidClient] = useAtom(subsquidClientAtom)
  const {data: edges} = useClaimableStakePoolsQuery(
    subsquidClient,
    {accountId: account?.address, gt: '0'},
    {
      enabled: account !== null,
      select: (data) => data.basePoolsConnection.edges,
    },
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
        mt={{xs: 0, md: -12}}
        direction={{xs: 'column', md: 'row'}}
        alignItems={{xs: 'flex-start', md: 'flex-end'}}
        spacing={2}
      >
        <Stack flex={{xs: 0, md: 1}}>
          <Stack flex={1} spacing={4} direction="row" alignItems="center">
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
              variant="contained"
              disabled={ownerReward == null || ownerReward.eq(0)}
              onClick={() => {
                setDialogOpen(true)
              }}
            >
              Claim All
            </Button>
          </Stack>
        </Stack>
        <Paper sx={{background: 'transparent', flex: {xs: 0, md: 1}}}>
          <Typography variant="h6" lineHeight={1} m={2}>
            Total Daily Owner Rewards
          </Typography>
          <Box height={140}>
            {account != null && (
              <FarmChart account={account.address} kind="StakePool" />
            )}
          </Box>
        </Paper>
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
