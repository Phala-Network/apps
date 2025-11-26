'use client'

import {Box, Paper, Stack} from '@mui/material'
import Decimal from 'decimal.js'
import {useMemo} from 'react'

import {
  useRewardRate,
  useShares,
  useSharesToAssets,
  useTotalAssets,
} from '@/hooks/staking'
import {useValidConnection} from '@/hooks/use-valid-connection'
import Stake from './stake'
import StakingStats from './staking-stats'
import Unstake from './unstake'

const Staking = () => {
  const {address, isValidConnection} = useValidConnection()

  const shares = useShares(address, isValidConnection)
  const assets = useSharesToAssets(shares)
  const totalAssets = useTotalAssets()
  const rewardRate = useRewardRate()

  const apr = useMemo(() => {
    if (rewardRate == null || !totalAssets) {
      return null
    }
    return Decimal.mul(rewardRate.toString(), 365 * 24 * 60 * 60).div(
      totalAssets.toString(),
    )
  }, [rewardRate, totalAssets])

  return (
    <Box pb={10} pt={{xs: 1, md: 2}}>
      <StakingStats
        apr={apr}
        myStaking={isValidConnection ? (assets ?? null) : null}
        totalStaking={totalAssets ?? null}
      />

      <Stack direction={{xs: 'column', xl: 'row'}} spacing={3} mt={3}>
        <Paper sx={{flex: 1, background: 'transparent', minWidth: 0}}>
          <Stake />
        </Paper>
        <Paper sx={{flex: 1, background: 'transparent', minWidth: 0}}>
          <Unstake />
        </Paper>
      </Stack>
    </Box>
  )
}

export default Staking
