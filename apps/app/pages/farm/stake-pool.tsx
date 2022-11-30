import BasePoolList from '@/components/BasePool/List'
import CreateBasePoolButton from '@/components/CreateBasePoolButton'
import PageHeader from '@/components/PageHeader'
import useAccountQuery from '@/hooks/useAccountQuery'
import {BasePoolKind} from '@/lib/subsquid'
import {LoadingButton} from '@mui/lab'
import {Box, Skeleton, Stack, Typography} from '@mui/material'
import {toCurrency} from '@phala/util'
import {FC} from 'react'

const MyStakePools: FC = () => {
  const {data, isLoading} = useAccountQuery()
  const stakePoolOwnerReward = data?.accountById?.stakePoolOwnerReward ?? '0'
  return (
    <>
      <PageHeader title="My Stake Pools" />
      <Stack
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          '>*:last-child': {
            ml: 'auto',
          },
        }}
      >
        <Typography variant="h6" component="h2" color="text.secondary">
          Owner Rewards
        </Typography>
        <Typography variant="num3">
          {isLoading ? (
            <Skeleton width={100} />
          ) : (
            `${toCurrency(stakePoolOwnerReward)} PHA`
          )}
        </Typography>

        <LoadingButton disabled={stakePoolOwnerReward === '0'}>
          Claim All
        </LoadingButton>
        <CreateBasePoolButton kind={BasePoolKind.StakePool} />
      </Stack>
      <Box mt={3}>
        <BasePoolList kind={BasePoolKind.StakePool} variant="farm" />
      </Box>
    </>
  )
}

export default MyStakePools
