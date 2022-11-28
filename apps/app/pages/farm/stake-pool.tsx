import BasePoolList from '@/components/BasePool/List'
import CreateBasePoolButton from '@/components/CreateBasePoolButton'
import PageHeader from '@/components/PageHeader'
import useAccountQuery from '@/hooks/useAccountQuery'
import {BasePoolKind} from '@/lib/subsquid'
import {LoadingButton} from '@mui/lab'
import {Box, Skeleton, Stack, Typography, useTheme} from '@mui/material'
import {formatCurrency} from '@phala/util'
import {FC} from 'react'

const MyStakePools: FC = () => {
  const theme = useTheme()
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
        <Typography
          variant="h6"
          component="h2"
          color={theme.palette.text.secondary}
        >
          Owner Rewards
        </Typography>
        <Typography variant="num3">
          {isLoading ? (
            <Skeleton width={100} />
          ) : (
            `${formatCurrency(stakePoolOwnerReward)} PHA`
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
