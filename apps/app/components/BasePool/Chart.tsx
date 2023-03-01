import Property from '@/components/Property'
import useSWRValue from '@/hooks/useSWRValue'
import {aprToApy} from '@/lib/apr'
import {subsquidClient} from '@/lib/graphql'
import {
  useBasePoolSnapshotsConnectionQuery,
  type BasePoolCommonFragment,
} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import {Paper, Typography} from '@mui/material'
import {toCurrency} from '@phala/util'
import {addDays, addHours} from 'date-fns'
import Decimal from 'decimal.js'
import {useMemo, type FC, type ReactElement} from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const CustomTooltip = ({
  label,
  tooltipLabel,
  isPercentage,
  isPHA,
  payload,
}: {
  label?: string
  tooltipLabel?: string
  isPercentage: boolean
  isPHA: boolean
  payload?: Array<{
    value: number | string
    payload: {
      date: Date
    }
  }>
}): ReactElement | null => {
  if (payload?.[0] != null) {
    const unit = isPercentage ? '%' : isPHA ? ' PHA' : ''
    const value = payload[0].value
    return (
      <Paper sx={{p: 1}}>
        <Typography variant="subtitle2">{label}</Typography>
        <Property fullWidth size="small" label={tooltipLabel}>{`${
          isPHA ? toCurrency(value) : value
        }${unit}`}</Property>
      </Paper>
    )
  }

  return null
}

const days = 7

export type BasePoolChartKind =
  | 'totalValue'
  | 'commission'
  | 'apr'
  | 'delegatorCount'
  | 'workerCount'
  | 'stakePoolCount'

const BasePoolChart: FC<{
  basePool: BasePoolCommonFragment
  kind: BasePoolChartKind
}> = ({basePool, kind}) => {
  const isPercentage = kind === 'apr' || kind === 'commission'
  const isPHA = kind === 'totalValue'
  const isVault = basePool.kind === 'Vault'
  const isInteger = kind === 'delegatorCount' || kind === 'workerCount'
  const color = isVault ? colors.vault[500] : colors.main[400]
  const now = useSWRValue(() => {
    const now = new Date()
    now.setMinutes(0, 0, 0)
    return now
  })
  const {data} = useBasePoolSnapshotsConnectionQuery(
    subsquidClient,
    {
      orderBy: 'updatedTime_ASC',
      first: days * 24 + 1,
      withApr: kind === 'apr',
      withCommission: kind === 'commission',
      withTotalValue: kind === 'totalValue',
      withDelegatorCount: kind === 'delegatorCount',
      withWorkerCount: kind === 'workerCount',
      withStakePoolCount: kind === 'stakePoolCount',
      where: {
        basePool: {id_eq: basePool.id},
        updatedTime_gte: addDays(now, -days).toISOString(),
      },
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )

  const chartData = useMemo(() => {
    const result: Array<{date: Date; dateString: string; value?: number}> =
      Array.from({
        length: days * 24 + 1,
      }).map((_, i) => {
        const date = addHours(now, i - days * 24)
        return {
          dateString: date.toLocaleString(),
          date,
        }
      })

    if (data === undefined) return result

    for (const {node} of data.basePoolSnapshotsConnection.edges) {
      const date = new Date(node.updatedTime)
      const index = result.findIndex((r) => r.date.getTime() >= date.getTime())
      if (index !== -1) {
        let value
        if (kind === 'totalValue' && node.totalValue != null) {
          value = new Decimal(node.totalValue)
        } else if (kind === 'apr' && node.apr != null) {
          value = new Decimal(node.apr)
          if (isVault) {
            value = aprToApy(value)
          }
        } else if (kind === 'commission' && node.commission != null) {
          value = new Decimal(node.commission)
        } else if (kind === 'delegatorCount') {
          value = node.delegatorCount
        } else if (kind === 'workerCount') {
          value = node.idleWorkerCount
        } else if (kind === 'stakePoolCount') {
          value = node.stakePoolCount
        }
        if (value == null) continue
        if (isPercentage && Decimal.isDecimal(value)) {
          value = value.times(100)
        }
        result[index].value = Decimal.isDecimal(value)
          ? value.toDP(2, Decimal.ROUND_DOWN).toNumber()
          : value
      }
    }

    for (const r of result) {
      if (r.value === undefined) {
        r.value = 0
      } else {
        break
      }
    }

    return result
  }, [data, isVault, now, kind, isPercentage])

  const label = useMemo(() => {
    switch (kind) {
      case 'totalValue':
        return isVault ? 'TVL' : 'Delegation'
      case 'commission':
        return 'Commission'
      case 'apr':
        return isVault ? 'APY' : 'APR'
      case 'delegatorCount':
        return 'Delegator Count'
    }
  }, [kind, isVault])

  if (data == null) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{top: 10, right: 30, left: 0, bottom: 0}}
      >
        <defs>
          <linearGradient id={basePool.kind} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis tickLine={false} dataKey="dateString" />
        <YAxis
          width={45}
          type="number"
          dataKey="value"
          name={isVault ? 'APY' : 'APR'}
          unit={isPercentage ? '%' : undefined}
          tickLine={false}
          domain={
            isPercentage || isInteger
              ? [0, (dataMax: number) => Math.ceil(dataMax)]
              : ['auto', 'auto']
          }
          tickFormatter={
            isPercentage || isInteger
              ? undefined
              : (value) =>
                  Intl.NumberFormat('en-US', {
                    notation: 'compact',
                    maximumFractionDigits: 2,
                  }).format(value)
          }
        />
        <Tooltip
          isAnimationActive={false}
          content={
            <CustomTooltip
              tooltipLabel={label}
              isPHA={isPHA}
              isPercentage={isPercentage}
            />
          }
        />
        <Area
          connectNulls
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={3}
          fillOpacity={1}
          fill={`url(#${basePool.kind})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default BasePoolChart
