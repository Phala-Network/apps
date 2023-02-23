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
  isVault,
  label,
  payload,
}: {
  isVault: boolean
  label?: string
  payload?: Array<{
    name: string
    value: number | string
    unit?: string
    payload: {
      date: Date
    }
  }>
}): ReactElement | null => {
  if (payload?.[0] != null) {
    return (
      <Paper sx={{p: 1}}>
        <Typography variant="subtitle2">
          {payload[0].payload.date.toLocaleString()}
        </Typography>
        <Property
          fullWidth
          size="small"
          label={isVault ? 'APY' : 'APR'}
        >{`${payload[0].value}%`}</Property>
      </Paper>
    )
  }

  return null
}

const days = 7

export type ChartKind = 'totalValue' | 'commission' | 'apr' | 'delegatorCount'

const BasePoolChart: FC<{
  basePool: BasePoolCommonFragment
  kind: ChartKind
}> = ({basePool, kind}) => {
  const isPercentage = kind === 'apr' || kind === 'commission'
  const isVault = basePool.kind === 'Vault'
  const color = isVault ? colors.vault[500] : colors.main[400]
  const now = useSWRValue(() => {
    const now = new Date()
    now.setMinutes(0, 0, 0)
    return now
  })
  const {data} = useBasePoolSnapshotsConnectionQuery(subsquidClient, {
    orderBy: 'updatedTime_ASC',
    first: days * 24 + 1,
    withApr: kind === 'apr',
    withCommission: kind === 'commission',
    withTotalValue: kind === 'totalValue',
    withDelegatorCount: kind === 'delegatorCount',
    where: {
      basePool: {id_eq: basePool.id},
      updatedTime_gte: addDays(now, -days).toISOString(),
    },
  })

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
        }
        if (value == null) continue
        if (isPercentage) {
          value = value.times(100)
        }
        result[index].value = value.toDP(2, Decimal.ROUND_DOWN).toNumber()
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
          unit={kind === 'apr' || kind === 'commission' ? '%' : undefined}
          tickLine={false}
          domain={
            isPercentage
              ? [0, (dataMax: number) => Math.ceil(dataMax)]
              : ['auto', 'auto']
          }
          tickFormatter={
            isPercentage
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
          content={<CustomTooltip isVault={isVault} />}
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
