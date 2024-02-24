import useToday from '@/hooks/useToday'
import {useAccountSnapshotsConnectionQuery} from '@/lib/subsquidQuery'
import {subsquidClientAtom} from '@/store/common'
import {compactFormat} from '@phala/lib'
import {addDays} from 'date-fns'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {type FC, useMemo} from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import RechartsTooltip from './RechartsTooltip'

const days = 30

const DelegationValueChart: FC<{address?: string}> = ({address}) => {
  const [subsquidClient] = useAtom(subsquidClientAtom)
  const today = useToday()
  const startTime = useMemo(() => addDays(today, -days).toISOString(), [today])
  const {data} = useAccountSnapshotsConnectionQuery(
    subsquidClient,
    {
      orderBy: 'updatedTime_ASC',
      where: {
        account_eq: address,
        updatedTime_gte: startTime,
      },
      withDelegationValue: true,
    },
    {
      enabled: address !== undefined,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  )

  const chartData = useMemo(() => {
    if (data == null) return []
    const result: Array<{date: Date; dateString: string; value?: number}> = []
    for (const {node} of data.accountSnapshotsConnection.edges) {
      const date = new Date(node.updatedTime)
      result.push({
        date,
        dateString: date.toLocaleDateString(),
        value:
          node.delegationValue != null
            ? new Decimal(node.delegationValue).floor().toNumber()
            : undefined,
      })
    }

    return result
  }, [data])

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
          tickFormatter={(value) => compactFormat(value as number, 2)}
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
