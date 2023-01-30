import {subsquidClient} from '@/lib/graphql'
import {useAccountValueSnapshotsConnectionQuery} from '@/lib/subsquidQuery'
import {Paper, Typography} from '@mui/material'
import {toCurrency} from '@phala/util'
import {addDays} from 'date-fns'
import Decimal from 'decimal.js'
import {useMemo, useState, type FC, type ReactElement} from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Property from './Property'

const CustomTooltip = ({
  label,
  payload,
}: {
  label?: string
  payload?: Array<{
    name: string
    value: number | string
    unit?: string
  }>
}): ReactElement | null => {
  if (payload?.[0] != null) {
    return (
      <Paper sx={{p: 1}}>
        <Typography variant="subtitle2">{label}</Typography>
        <Property fullWidth size="small" label="Value">{`${toCurrency(
          payload[0].value
        )} PHA`}</Property>
      </Paper>
    )
  }

  return null
}

const DelegationValueChart: FC<{address?: string; days: number}> = ({
  address,
  days,
}) => {
  const [now] = useState(() => {
    const now = new Date()
    now.setMinutes(0, 0, 0)
    return now
  })
  const {data} = useAccountValueSnapshotsConnectionQuery(
    subsquidClient,
    {
      orderBy: 'updatedTime_DESC',
      where: {
        account: {id_eq: address},
        updatedTime_gte: addDays(now, -days).toISOString(),
      },
    },
    {enabled: address !== undefined}
  )

  const chartData = useMemo(() => {
    const result: Array<{date: Date; dateString: string; value?: number}> =
      Array.from({
        length: days,
      }).map((_, i) => {
        const date = addDays(now, i - days + 1)
        return {
          dateString: date.toLocaleDateString(),
          date,
        }
      })

    if (data == null) return result

    for (const {node} of data.accountValueSnapshotsConnection.edges) {
      const date = new Date(node.updatedTime)
      const index = result.findIndex((r) => r.date.getTime() >= date.getTime())
      if (index !== -1) {
        result[index].value = new Decimal(node.value).floor().toNumber()
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
  }, [data, days, now])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{top: 10, right: 20, left: 0, bottom: 0}}
      >
        <defs>
          <linearGradient id="main" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#C5FF46" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#C5FF46" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis height={20} tickLine={false} dataKey="dateString" />
        <YAxis
          domain={['auto', 'auto']}
          width={40}
          type="number"
          dataKey="value"
          name="Value"
          tickLine={false}
          tickFormatter={(value) =>
            Intl.NumberFormat('en-US', {
              notation: 'compact',
              maximumFractionDigits: 2,
            }).format(value)
          }
        />
        <Tooltip isAnimationActive={false} content={<CustomTooltip />} />
        <Area
          connectNulls
          type="monotone"
          dataKey="value"
          stroke="#C5FF46"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#main)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default DelegationValueChart
