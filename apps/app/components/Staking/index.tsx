import {
  useAssets,
  useRewardsPerSecond,
  useShares,
  useTotalAssets,
} from '@/hooks/staking'
import {TrendingUp} from '@mui/icons-material'
import {Box, Divider, Paper, Stack, Tab, Tabs} from '@mui/material'
import {toCurrency, toPercentage} from '@phala/lib'
import phaIcon from '@phala/ui/icons/asset/pha.png'
import Decimal from 'decimal.js'
import Image from 'next/image'
import {useMemo, useState} from 'react'
import {formatUnits} from 'viem'
import {useAccount} from 'wagmi'
import Property from '../Property'
import StakeTab from './StakeTab'
import UnstakeTab from './UnstakeTab'

const Staking = () => {
  const [tab, setTab] = useState(0)
  const account = useAccount()

  const shares = useShares(account.address)
  const assets = useAssets(shares)
  const totalAssets = useTotalAssets()
  const rewardsPerSecond = useRewardsPerSecond()

  const apr = useMemo(() => {
    if (rewardsPerSecond == null || !totalAssets) {
      return 0
    }
    return Decimal.mul(rewardsPerSecond.toString(), 365 * 24 * 60 * 60).div(
      totalAssets.toString(),
    )
  }, [rewardsPerSecond, totalAssets])

  return (
    <div>
      <Paper sx={{background: 'transparent'}}>
        <Stack
          direction={{xs: 'column', md: 'row'}}
          py={{md: 3}}
          px={{xs: 3, md: 0}}
        >
          <Stack
            direction="row"
            flex={{md: 1}}
            spacing={3}
            alignItems="center"
            px={{md: 3}}
            py={{xs: 3, md: 0}}
          >
            <TrendingUp sx={{width: 36, height: 36}} />
            <Property
              size="large"
              label="Staking APR"
              sx={{color: 'primary.main'}}
            >
              {apr != null ? toPercentage(apr) : '-'}
            </Property>
          </Stack>
          <Divider
            orientation="vertical"
            flexItem
            sx={{display: {xs: 'none', md: 'block'}}}
          />
          <Divider
            orientation="horizontal"
            flexItem
            sx={{display: {md: 'none'}}}
          />
          <Stack
            direction="row"
            flex={{md: 1}}
            spacing={3}
            alignItems="center"
            px={{md: 3}}
            py={{xs: 3, md: 0}}
          >
            <Stack direction="row" alignItems="center" spacing={3} flex={1}>
              <Image src={phaIcon} width={36} height={36} alt="PHA" />
              <Property size="large" label="My staking">
                {assets != null ? toCurrency(formatUnits(assets, 18)) : '-'}
              </Property>
            </Stack>
            <Stack width={140} justifyContent="flex-start">
              <Property label="Shares" size="small" fullWidth>
                {shares != null ? toCurrency(formatUnits(shares, 18)) : '-'}
              </Property>
            </Stack>
          </Stack>
        </Stack>
      </Paper>

      <Stack direction={{xs: 'column', md: 'row'}} spacing={4} mt={4}>
        <Paper sx={{flex: 1, background: 'transparent', p: 3}}>
          <Property size="large" label="Total staking" wrapDecimal>
            {totalAssets != null
              ? toCurrency(formatUnits(totalAssets, 18))
              : '-'}
          </Property>
        </Paper>
        <Paper sx={{flex: 1, background: 'transparent', pt: 1, px: 3}}>
          <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)}>
              <Tab sx={{flex: 1}} label="Stake" value={0} />
              <Tab sx={{flex: 1}} label="Unstake" value={1} />
            </Tabs>
          </Box>
          {tab === 0 && (
            <Box role="tabpanel" pt={2} pb={3}>
              <StakeTab />
            </Box>
          )}
          {tab === 1 && (
            <Box role="tabpanel" pt={2} pb={3}>
              <UnstakeTab />
            </Box>
          )}
        </Paper>
      </Stack>
    </div>
  )
}

export default Staking
