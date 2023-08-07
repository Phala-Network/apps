import useSWRValue from '@/hooks/useSWRValue'
import getDelegationProfit from '@/lib/getDelegationProfit'
import {
  useDelegationSnapshotsConnectionQuery,
  type DelegationCommonFragment,
} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import {subsquidClientAtom} from '@/store/common'
import {compactFormat} from '@phala/util'
import {addDays} from 'date-fns'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {useMemo, type FC} from 'react'
import {
  Bar,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import RechartsTooltip from '../RechartsTooltip'

const days = 7

const DelegationChart: FC<{
  delegation: DelegationCommonFragment
}> = ({delegation}) => {
  const isVault = delegation.basePool.kind === 'Vault'
  const color = isVault ? colors.vault[500] : colors.main[400]

  const duration = useSWRValue([], () => {
    const date = new Date()
    date.setUTCHours(0, 0, 0, 0)
    return Array.from({length: days + 1}).map((_, i) =>
      addDays(date, i - days).toISOString(),
    )
  })
  const [subsquidClient] = useAtom(subsquidClientAtom)
  const {data} = useDelegationSnapshotsConnectionQuery(
    subsquidClient,
    {
      orderBy: 'updatedTime_ASC',
      where: {delegation: {id_eq: delegation.id}, updatedTime_in: duration},
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  )

  const chartData = useMemo(() => {
    if (data == null) return []
    const result: Array<{
      date: Date
      value: number
      reward?: number
      dateString: string
    }> = []
    const edges = data.delegationSnapshotsConnection.edges

    for (let i = 1; i < edges.length; i++) {
      const current = edges[i].node
      const prev = edges[i - 1].node
      const date = new Date(current.updatedTime)

      result.push({
        date,
        dateString: date.toLocaleDateString(),
        value: new Decimal(current.value)
          .toDP(2, Decimal.ROUND_DOWN)
          .toNumber(),
        reward: getDelegationProfit(current, prev)
          .toDP(2, Decimal.ROUND_DOWN)
          .toNumber(),
      })
    }

    return result
  }, [data])

  if (chartData.length === 0) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={chartData}
        margin={{top: 10, right: 30, left: 0, bottom: 0}}
      >
        <XAxis tickLine={false} dataKey="dateString" />
        <YAxis
          yAxisId="left"
          width={45}
          type="number"
          dataKey="value"
          tickLine={false}
          name="Value"
          domain={['auto', 'auto']}
          tickFormatter={(value) => compactFormat(value, 1)}
        />
        <YAxis
          width={45}
          yAxisId="right"
          orientation="right"
          type="number"
          dataKey="reward"
          name="Reward"
          tickLine={false}
          tickFormatter={(value) => compactFormat(value, 0)}
        />
        <Bar
          yAxisId="right"
          dataKey="reward"
          name="Reward"
          unit=" PHA"
          fill="#666"
          barSize={24}
          radius={[4, 4, 0, 0]}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="value"
          name="Value"
          unit=" PHA"
          stroke={color}
          dot={false}
          strokeWidth={3}
        />

        <Tooltip isAnimationActive={false} content={<RechartsTooltip />} />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default DelegationChart
