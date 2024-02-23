import useToday from '@/hooks/useToday'
import {aprToApy} from '@/lib/apr'
import {
  type BasePoolCommonFragment,
  useBasePoolSnapshotsConnectionQuery,
} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import {subsquidClientAtom} from '@/store/common'
import {compactFormat} from '@phala/lib'
import {addDays} from 'date-fns'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {type FC, useMemo} from 'react'
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

const days = 30

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
  const today = useToday()
  const startTime = useMemo(() => addDays(today, -days).toISOString(), [today])
  const [subsquidClient] = useAtom(subsquidClientAtom)
  const {data} = useBasePoolSnapshotsConnectionQuery(
    subsquidClient,
    {
      orderBy: 'updatedTime_ASC',
      withApr: kind === 'apr',
      withCommission: kind === 'commission',
      withTotalValue: kind === 'totalValue',
      withDelegatorCount: kind === 'delegatorCount',
      withWorkerCount: kind === 'workerCount',
      withStakePoolCount: kind === 'stakePoolCount',
      withCumulativeOwnerRewards: kind === 'ownerRewards',
      where: {
        basePool_eq: basePool.id,
        updatedTime_gte: startTime,
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
    const result: ChartData = []
    if (kind === 'ownerRewards') {
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

    for (const {node} of data.basePoolSnapshotsConnection.edges) {
      const date = new Date(node.updatedTime)

      let value: Decimal | number | null | undefined
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

      if (isPercentage && Decimal.isDecimal(value)) {
        value = value.times(100)
      }

      result.push({
        date,
        dateString: date.toLocaleDateString(),
        value: Decimal.isDecimal(value)
          ? value.toDP(2, Decimal.ROUND_DOWN).toNumber()
          : value ?? undefined,
      })
    }

    return result
  }, [data, kind, isPercentage, isVault])

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
              : (value) => compactFormat(value as number, 1)
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
