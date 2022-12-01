import Property from '@/components/Property'
import {BasePoolCommonFragment} from '@/lib/subsquidQuery'
import {Box, Stack, SxProps} from '@mui/material'
import {isTruthy, toCurrency, toPercentage} from '@phala/util'
import {FC, ReactNode, useMemo} from 'react'

const ExtraProperties: FC<{basePool: BasePoolCommonFragment; sx?: SxProps}> = ({
  basePool,
  sx,
}) => {
  const entries = useMemo<Array<[string, ReactNode]>>(() => {
    const {vault, stakePool} = basePool

    const entries: Array<[string, ReactNode] | undefined | null> = [
      stakePool && [
        'Capacity',
        stakePool.capacity ? `${toCurrency(stakePool.capacity)} PHA` : '∞',
      ],
      ['Commission', toPercentage(basePool.commission)],
      stakePool && [
        'Workers',
        <>
          {`${stakePool.idleWorkerCount} Idle`}
          <Box component="span" color="text.secondary">
            {` / ${stakePool.workerCount}`}
          </Box>
        </>,
      ],
      vault && ['Stake Pools', basePool.account.stakePoolNftCount],
      ['Delegators', basePool.delegatorCount],
      stakePool && ['Delegation', `${toCurrency(basePool.totalValue)} PHA`],
      ['Free', `${toCurrency(basePool.freeValue)} PHA`],
      ['Withdrawing', `${toCurrency(basePool.withdrawalValue)} PHA`],
      ['Price', `${toCurrency(basePool.sharePrice)} PHA`],
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
              <Property size="small" label={label} key={label}>
                {value}
              </Property>
            ))}
        </Stack>
      ))}
    </Stack>
  )
}

export default ExtraProperties
