import useSWRValue from '@/hooks/useSWRValue'
import compactFormat from '@/lib/compactFormat'
import {useAccountSnapshotsConnectionQuery} from '@/lib/subsquidQuery'
import {subsquidClientAtom} from '@/store/common'
import {addDays} from 'date-fns'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {useMemo, type FC} from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import RechartsTooltip from './RechartsTooltip'

const DelegationValueChart: FC<{address?: string; days: number}> = ({
  address,
  days,
}) => {
  const [subsquidClient] = useAtom(subsquidClientAtom)
  const startTime = useSWRValue([days], () => {
    const date = new Date()
    date.setUTCHours(0, 0, 0, 0)
    return addDays(date, -days).toISOString()
  })
  const {data} = useAccountSnapshotsConnectionQuery(
    subsquidClient,
    {
      orderBy: 'updatedTime_DESC',
      where: {
        account: {id_eq: address},
        updatedTime_gte: startTime,
      },
      withDelegationValue: true,
    },
    {
      enabled: address !== undefined,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )

  const chartData = useMemo(() => {
    if (data == null) return []
    const result: Array<{date: Date; dateString: string; value?: number}> =
      Array.from({length: days}).map((_, i) => {
        const date = addDays(new Date(startTime), i)
        return {dateString: date.toLocaleDateString(), date}
      })

    for (const {node} of data.accountSnapshotsConnection.edges) {
      const date = new Date(node.updatedTime)
      const index = result.findIndex((r) => r.date.getTime() >= date.getTime())
      if (index !== -1 && node.delegationValue != null) {
        result[index].value = new Decimal(node.delegationValue)
          .floor()
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
  }, [data, days, startTime])

  if (chartData.length === 0) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        key={days}
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
          tickFormatter={(value) => compactFormat(value, 2)}
        />
        <Tooltip isAnimationActive={false} content={<RechartsTooltip />} />
        <Area
          unit=" PHA"
          name="Value"
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
