import type {WikiEntry} from '@/assets/wikiData'
import Property from '@/components/Property'
import type {BasePoolCommonFragment} from '@/lib/subsquidQuery'
import {Box, Stack, type SxProps} from '@mui/material'
import {toCurrency, toPercentage} from '@phala/lib'
import Decimal from 'decimal.js'
import {type FC, type ReactNode, useMemo} from 'react'

const ExtraProperties: FC<{basePool: BasePoolCommonFragment; sx?: SxProps}> = ({
  basePool,
  sx,
}) => {
  const entries = useMemo<
    Array<[string, ReactNode] | [string, ReactNode, WikiEntry]>
  >(() => {
    const {vault, stakePool} = basePool

    const entries: Array<
      [string, ReactNode] | [string, ReactNode, WikiEntry] | false
    > = [
      stakePool != null && [
        'Capacity',
        stakePool.capacity != null
          ? `${toCurrency(stakePool.capacity)} PHA`
          : '∞',
        'capacity',
      ],
      ['Commission', toPercentage(basePool.commission), 'commission'],
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
        'totalDelegation',
      ],
      ['Free', `${toCurrency(basePool.freeValue)} PHA`, 'freeValue'],
      [
        'Withdrawing',
        `${toCurrency(basePool.withdrawingValue)} PHA`,
        'withdrawing',
      ],
      [
        'Price',
        `${toCurrency(
          new Decimal(basePool.sharePrice).toDP(6, Decimal.ROUND_HALF_UP),
          6,
        )} PHA`,
        'price',
      ],
    ]

    return entries.filter(Boolean)
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
        // biome-ignore lint/suspicious/noArrayIndexKey: static list
        <Stack flex="1 0" spacing={0.5} key={i}>
          {entries
            .slice(i * count, (i + 1) * count)
            .map(([label, value, wikiEntry]) => (
              <Property
                size="small"
                label={label}
                key={label}
                fullWidth
                wikiEntry={wikiEntry}
              >
                {value}
              </Property>
            ))}
        </Stack>
      ))}
    </Stack>
  )
}

export default ExtraProperties
