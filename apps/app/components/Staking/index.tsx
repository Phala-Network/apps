import {
  useRewardRate,
  useShares,
  useSharesToAssets,
  useTotalAssets,
} from '@/hooks/staking'
import {useAutoSwitchChain} from '@/hooks/useAutoSwitchChain'
import {Box, Grid2 as Grid, Paper, Stack} from '@mui/material'
import {toCurrency, toPercentage} from '@phala/lib'
import Decimal from 'decimal.js'
import {useMemo} from 'react'
import {formatUnits} from 'viem'
import {useAccount} from 'wagmi'
import Property from '../Property'
import Stake from './Stake'
import Unstake from './Unstake'

const Staking = () => {
  const {address} = useAccount()
  const shares = useShares(address)
  const assets = useSharesToAssets(shares)
  const totalAssets = useTotalAssets()
  const rewardRate = useRewardRate()
  useAutoSwitchChain()

  const apr = useMemo(() => {
    if (rewardRate == null || !totalAssets) {
      return null
    }
    return Decimal.mul(rewardRate.toString(), 365 * 24 * 60 * 60).div(
      totalAssets.toString(),
    )
  }, [rewardRate, totalAssets])

  return (
    <Box pb={10}>
      <Grid container spacing={2}>
        <Grid size={{xs: 6, sm: 4}}>
          <Paper sx={{p: 2, background: 'transparent', flex: 1}}>
            <Property
              center
              size="large"
              label="Staking APR"
              sx={{color: 'primary.main'}}
            >
              {apr != null ? toPercentage(apr) : '-'}
            </Property>
          </Paper>
        </Grid>

        <Grid size={{xs: 6, sm: 4}}>
          <Paper sx={{p: 2, background: 'transparent', flex: 1}}>
            <Property size="large" label="My staking" wrapDecimal center>
              {assets != null ? toCurrency(formatUnits(assets, 18)) : '-'}
            </Property>
          </Paper>
        </Grid>

        <Grid size={{xs: 12, sm: 4}}>
          <Paper sx={{p: 2, background: 'transparent', flex: 1}}>
            <Property size="large" label="Total staking" wrapDecimal center>
              {totalAssets != null
                ? toCurrency(formatUnits(totalAssets, 18))
                : '-'}
            </Property>
          </Paper>{' '}
        </Grid>
      </Grid>

      <Stack direction={{xs: 'column', md: 'row'}} spacing={2} mt={2}>
        <Paper sx={{flex: 1, background: 'transparent'}}>
          <Stake />
        </Paper>
        <Paper sx={{flex: 1, background: 'transparent'}}>
          <Unstake />
        </Paper>
      </Stack>
    </Box>
  )
}

export default Staking
