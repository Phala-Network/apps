import {
  useRewardRate,
  useShares,
  useSharesToAssets,
  useTotalAssets,
} from '@/hooks/staking'
import {useAutoSwitchChain} from '@/hooks/useAutoSwitchChain'
import {Paper, Stack} from '@mui/material'
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
    <div>
      <Stack
        direction={{xs: 'column', sm: 'row'}}
        justifyContent="space-between"
        gap={2}
      >
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

        <Paper sx={{p: 2, background: 'transparent', flex: 1}}>
          <Property size="large" label="My Staking" wrapDecimal center>
            {assets != null ? toCurrency(formatUnits(assets, 18)) : '-'}
          </Property>
        </Paper>

        <Paper sx={{p: 2, background: 'transparent', flex: 1}}>
          <Property size="large" label="Total Staking" wrapDecimal center>
            {totalAssets != null
              ? toCurrency(formatUnits(totalAssets, 18))
              : '-'}
          </Property>
        </Paper>
      </Stack>

      <Stack direction={{xs: 'column', md: 'row'}} spacing={2} mt={2}>
        <Paper sx={{flex: 1, background: 'transparent', height: 500}}>
          <Stake />
        </Paper>
        <Paper sx={{flex: 1, background: 'transparent', height: 500}}>
          <Unstake />
        </Paper>
      </Stack>
    </div>
  )
}

export default Staking
