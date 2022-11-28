import {BasePoolCommonFragment} from '@/lib/subsquid'
import {theme} from '@/lib/theme'
import {Stack, SxProps} from '@mui/material'
import {formatCurrency, toFixed} from '@phala/util'
import Decimal from 'decimal.js'
import {FC} from 'react'
import Property from './Property'

const ExtraProperties: FC<{basePool: BasePoolCommonFragment; sx?: SxProps}> = ({
  basePool,
  sx,
}) => {
  const {vault, stakePool} = basePool
  return (
    <Stack
      direction={{xs: 'column', sm: 'row'}}
      spacing={{xs: 0.5, sm: 2}}
      sx={sx}
    >
      <Stack flex="1 0" spacing={0.5}>
        {stakePool && (
          <Property size="small" label="Capacity">
            {stakePool.capacity
              ? `${formatCurrency(stakePool.capacity)} PHA`
              : '∞'}
          </Property>
        )}
        <Property size="small" label="Commission">
          {`${toFixed(new Decimal(basePool.commission).times(100), 2)}%`}
        </Property>
        {stakePool && (
          <Property size="small" label="Workers">
            {stakePool.workerCount}
            <span css={{color: theme.palette.text.secondary}}>
              {` / ${stakePool.idleWorkerCount} Idle`}
            </span>
          </Property>
        )}
        {vault && (
          <Property size="small" label="Stake Pools">
            {basePool.account.stakePoolNftCount}
          </Property>
        )}
        <Property size="small" label="Delegators">
          {basePool.delegatorCount}
        </Property>
      </Stack>
      <Stack flex="1 0" spacing={0.5}>
        {stakePool && (
          <Property size="small" label="Delegation">
            {`${formatCurrency(basePool.totalValue)} PHA`}
          </Property>
        )}
        <Property size="small" label="Free">
          {`${formatCurrency(basePool.freeValue)} PHA`}
        </Property>
        <Property size="small" label="Withdrawing">
          {`${formatCurrency(basePool.withdrawalValue)} PHA`}
        </Property>
        <Property size="small" label="Price">
          {`${formatCurrency(basePool.sharePrice)} PHA`}
        </Property>
      </Stack>
    </Stack>
  )
}

export default ExtraProperties
