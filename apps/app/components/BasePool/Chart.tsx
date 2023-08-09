import useSWRValue from '@/hooks/useSWRValue'
import {aprToApy} from '@/lib/apr'
import {
  useBasePoolSnapshotsConnectionQuery,
  type BasePoolCommonFragment,
} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import {subsquidClientAtom} from '@/store/common'
import {compactFormat} from '@phala/lib'
import {addDays, addHours} from 'date-fns'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {useMemo, type FC} from 'react'
import {
  Area,
  Bar,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import RechartsTooltip from '../RechartsTooltip'

const days = 7

export type BasePoolChartKind =
  | 'totalValue'
  | 'commission'
  | 'apr'
  | 'delegatorCount'
  | 'workerCount'
  | 'stakePoolCount'
  | 'ownerRewards'

const BasePoolChart: FC<{
  basePool: BasePoolCommonFragment
  kind: BasePoolChartKind
}> = ({basePool, kind}) => {
  const isPercentage = kind === 'apr' || kind === 'commission'
  const isPHA = kind === 'totalValue'
  const isVault = basePool.kind === 'Vault'
  const isInteger = kind === 'delegatorCount' || kind === 'workerCount'
  const color = isVault ? colors.vault[500] : colors.main[400]
  const dimension = kind === 'ownerRewards' ? 'day' : 'hour'
  const startTime = useSWRValue([days], () => {
    const date = new Date()
    date.setUTCMinutes(0, 0, 0)
    return addDays(date, -days).toISOString()
  })
  const duration = useSWRValue([days], () => {
    const date = new Date()
    date.setUTCHours(0, 0, 0, 0)
    return Array.from({length: days + 1}).map((_, i) =>
      addDays(date, i - days).toISOString(),
    )
  })
  const [subsquidClient] = useAtom(subsquidClientAtom)
  const {data} = useBasePoolSnapshotsConnectionQuery(
    subsquidClient,
    {
      orderBy: 'updatedTime_ASC',
      first: dimension === 'day' ? days + 1 : days * 24 + 1,
      withApr: kind === 'apr',
      withCommission: kind === 'commission',
      withTotalValue: kind === 'totalValue',
      withDelegatorCount: kind === 'delegatorCount',
      withWorkerCount: kind === 'workerCount',
      withStakePoolCount: kind === 'stakePoolCount',
      withCumulativeOwnerRewards: kind === 'ownerRewards',
      where: {
        basePool: {id_eq: basePool.id},
        ...(dimension === 'day'
          ? {updatedTime_in: duration}
          : {updatedTime_gte: startTime}),
      },
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  )

  const chartData = useMemo(() => {
    if (data == null) return []
    type ChartData = Array<{date: Date; dateString: string; value?: number}>
    if (kind === 'ownerRewards') {
      const result: ChartData = []
      const edges = data.basePoolSnapshotsConnection.edges

      for (let i = 1; i < edges.length; i++) {
        const current = edges[i].node
        const prev = edges[i - 1].node
        const date = new Date(current.updatedTime)
        let value = new Decimal(0)
        if (
          current.cumulativeOwnerRewards != null &&
          prev.cumulativeOwnerRewards != null
        ) {
          value = new Decimal(current.cumulativeOwnerRewards).minus(
            prev.cumulativeOwnerRewards,
          )
        }

        result.push({
          date,
          dateString: date.toLocaleDateString(),
          value: value.toDP(2, Decimal.ROUND_DOWN).toNumber(),
        })
      }
      return result
    }

    const result: ChartData = Array.from({
      length: dimension === 'day' ? days : days * 24 + 1,
    }).map((_, i) => {
      const date = addHours(new Date(startTime), i)
      return {dateString: date.toLocaleString(), date}
    })

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
  }, [data, kind, dimension, startTime, isPercentage, isVault])

  const label = useMemo(() => {
    switch (kind) {
      case 'totalValue':
        return isVault ? 'TVL' : 'Delegation'
      case 'commission':
        return 'Commission'
      case 'apr':
        return isVault ? 'APY' : 'APR'
      case 'delegatorCount':
        return 'Delegator count'
      case 'workerCount':
        return 'Idle worker count'
      case 'stakePoolCount':
        return 'StakePool count'
    }
  }, [kind, isVault])

  if (chartData.length === 0) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
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
          name={label}
          unit={isPercentage ? '%' : undefined}
          tickLine={false}
          domain={
            isPercentage || isInteger || kind === 'ownerRewards'
              ? [0, 'auto']
              : ['auto', 'auto']
          }
          tickFormatter={
            isPercentage || isInteger
              ? undefined
              : (value) => compactFormat(value, 1)
          }
        />
        <Tooltip isAnimationActive={false} content={<RechartsTooltip />} />
        {kind === 'ownerRewards' ? (
          <Bar
            dataKey="value"
            name="Reward"
            unit=" PHA"
            fill={color}
            barSize={24}
            radius={[4, 4, 0, 0]}
          />
        ) : (
          <Area
            name={label}
            unit={isPercentage ? '%' : isPHA ? ' PHA' : undefined}
            connectNulls
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={3}
            fillOpacity={1}
            fill={`url(#${basePool.kind})`}
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default BasePoolChart
