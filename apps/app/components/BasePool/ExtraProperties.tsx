import Property from '@/components/Property'
import {type BasePoolCommonFragment} from '@/lib/subsquidQuery'
import {Box, Stack, type SxProps} from '@mui/material'
import {isTruthy, toCurrency, toPercentage} from '@phala/util'
import Decimal from 'decimal.js'
import {useMemo, type FC, type ReactNode} from 'react'

const ExtraProperties: FC<{basePool: BasePoolCommonFragment; sx?: SxProps}> = ({
  basePool,
  sx,
}) => {
  const entries = useMemo<Array<[string, ReactNode]>>(() => {
    const {vault, stakePool} = basePool

    const entries: Array<[string, ReactNode] | false> = [
      stakePool != null && [
        'Capacity',
        stakePool.capacity != null
          ? `${toCurrency(stakePool.capacity)} PHA`
          : '∞',
      ],
      ['Commission', toPercentage(basePool.commission)],
      stakePool != null && [
        'Workers',
        <>
          {`${stakePool.idleWorkerCount} Idle`}
          <Box component="span" color="text.secondary">
            {` / ${stakePool.workerCount}`}
          </Box>
        </>,
      ],
      vault != null && ['StakePools', basePool.account.stakePoolNftCount],
      ['Delegators', basePool.delegatorCount],
      stakePool != null && [
        'Delegation',
        `${toCurrency(basePool.totalValue)} PHA`,
      ],
      ['Free', `${toCurrency(Decimal.max(basePool.freeValue, 0))} PHA`],
      ['Withdrawing', `${toCurrency(basePool.withdrawingValue)} PHA`],
      [
        'Price',
        `${toCurrency(
          new Decimal(basePool.sharePrice).toDP(6, Decimal.ROUND_HALF_UP),
          6
        )} PHA`,
      ],
    ]

    return entries.filter(isTruthy)
  }, [basePool])

  const groups = 2
  const count = Math.ceil(entries.length / groups)

  return (
    <Stack
      direction={{xs: 'column', sm: 'row'}}
      spacing={{xs: 0.5, sm: 2}}
      sx={sx}
    >
      {Array.from({length: groups}).map((_, i) => (
        <Stack flex="1 0" spacing={0.5} key={i}>
          {entries
            .slice(i * count, (i + 1) * count)
            .map(([label, value]: [string, ReactNode]) => (
              <Property size="small" label={label} key={label} fullWidth>
                {value}
              </Property>
            ))}
        </Stack>
      ))}
    </Stack>
  )
}

export default ExtraProperties
