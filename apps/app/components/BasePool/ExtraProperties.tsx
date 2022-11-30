import Property from '@/components/Property'
import {BasePoolCommonFragment} from '@/lib/subsquidQuery'
import {Box, Stack, SxProps} from '@mui/material'
import {toCurrency, toFixed} from '@phala/util'
import Decimal from 'decimal.js'
import {FC} from 'react'

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
            {stakePool.capacity ? `${toCurrency(stakePool.capacity)} PHA` : '∞'}
          </Property>
        )}
        <Property size="small" label="Commission">
          {`${toFixed(new Decimal(basePool.commission).times(100), 2)}%`}
        </Property>
        {stakePool && (
          <Property size="small" label="Workers">
            {`${stakePool.idleWorkerCount} Idle`}
            <Box component="span" color="text.secondary">
              {` / ${stakePool.workerCount}`}
            </Box>
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
            {`${toCurrency(basePool.totalValue)} PHA`}
          </Property>
        )}
        <Property size="small" label="Free">
          {`${toCurrency(basePool.freeValue)} PHA`}
        </Property>
        <Property size="small" label="Withdrawing">
          {`${toCurrency(basePool.withdrawalValue)} PHA`}
        </Property>
        <Property size="small" label="Price">
          {`${toCurrency(basePool.sharePrice)} PHA`}
        </Property>
      </Stack>
    </Stack>
  )
}

export default ExtraProperties
