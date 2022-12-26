import Property from '@/components/Property'
import {aprToApy} from '@/lib/apr'
import {subsquidClient} from '@/lib/graphql'
import {
  BasePoolCommonFragment,
  useBasePoolAprRecordsConnectionQuery,
} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import {Paper, Typography} from '@mui/material'
import {addDays} from 'date-fns'
import Decimal from 'decimal.js'
import {FC, ReactElement, useMemo, useState} from 'react'
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
  payload?: {
    name: string
    value: number | string
    unit?: string
  }[]
}): ReactElement | null => {
  if (payload?.[0]) {
    return (
      <Paper sx={{p: 1}}>
        <Typography variant="subtitle2">{label}</Typography>
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

const BasePoolAprChart: FC<{basePool: BasePoolCommonFragment}> = ({
  basePool,
}) => {
  const isVault = basePool.kind === 'Vault'
  const color = isVault ? colors.vault[500] : colors.main[400]
  const [now] = useState(() => {
    const now = new Date()
    now.setMinutes(0, 0, 0)
    return now
  })
  const {data} = useBasePoolAprRecordsConnectionQuery(subsquidClient, {
    orderBy: 'updatedTime_DESC',
    where: {
      basePool: {id_eq: basePool.id},
      updatedTime_gte: addDays(now, -days).toISOString(),
    },
  })

  const chartData = useMemo(() => {
    const result: {date: Date; dateString: string; value?: number}[] =
      Array.from({
        length: days,
      }).map((_, i) => {
        const date = addDays(now, i - days + 1)
        return {
          dateString: date.toLocaleDateString(),
          date,
        }
      })

    if (!data) return result

    for (const {node} of data.basePoolAprRecordsConnection.edges) {
      const date = new Date(node.updatedTime)
      const index = result.findIndex((r) => r.date.getTime() >= date.getTime())
      if (index !== -1) {
        let value = new Decimal(node.value)
        if (isVault) {
          value = aprToApy(value)
        }
        result[index].value = value
          .times(100)
          .toDP(2, Decimal.ROUND_DOWN)
          .toNumber()
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
  }, [data, isVault, now])

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
          width={38}
          type="number"
          dataKey="value"
          name={isVault ? 'APY' : 'APR'}
          unit="%"
          tickLine={false}
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

export default BasePoolAprChart
