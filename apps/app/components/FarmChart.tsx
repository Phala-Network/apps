import useSWRValue from '@/hooks/useSWRValue'
import compactFormat from '@/lib/compactFormat'
import {
  useAccountSnapshotsConnectionQuery,
  type BasePoolKind,
} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import {subsquidClientAtom} from '@/store/common'
import {addDays} from 'date-fns'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {useMemo, type FC} from 'react'
import {
  Bar,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import RechartsTooltip from './RechartsTooltip'

const days = 7

const FarmChart: FC<{
  account: string
  kind: BasePoolKind
}> = ({kind, account}) => {
  const isVault = kind === 'Vault'
  const color = isVault ? colors.vault[500] : colors.main[400]
  const duration = useSWRValue([days], () => {
    const date = new Date()
    date.setUTCHours(0, 0, 0, 0)
    return Array.from({length: days + 1}).map((_, i) =>
      addDays(date, i - days).toISOString()
    )
  })
  const [subsquidClient] = useAtom(subsquidClientAtom)
  const {data} = useAccountSnapshotsConnectionQuery(
    subsquidClient,
    {
      orderBy: 'updatedTime_ASC',
      first: days + 1,
      where: {
        account: {id_eq: account},
        updatedTime_in: duration,
      },
      withCumulativeStakePoolOwnerRewards: kind === 'StakePool',
      withCumulativeVaultOwnerRewards: kind === 'Vault',
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )

  const chartData = useMemo(() => {
    if (data == null) return []
    type ChartData = Array<{date: Date; dateString: string; value?: number}>
    const result: ChartData = []
    const edges = data.accountSnapshotsConnection.edges

    for (let i = 1; i < edges.length; i++) {
      const current = edges[i].node
      const prev = edges[i - 1].node
      const date = new Date(current.updatedTime)
      let value = new Decimal(0)
      const key = isVault
        ? 'cumulativeVaultOwnerRewards'
        : 'cumulativeStakePoolOwnerRewards'
      const prevValue = prev[key]
      const currentValue = current[key]
      if (prevValue != null && currentValue != null) {
        value = new Decimal(currentValue).minus(prevValue)
      }

      result.push({
        date,
        dateString: date.toLocaleDateString(),
        value: value.toDP(2, Decimal.ROUND_DOWN).toNumber(),
      })
    }
    return result
  }, [data, isVault])

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
          <linearGradient id={kind} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis tickLine={false} dataKey="dateString" />
        <YAxis
          width={45}
          type="number"
          dataKey="value"
          // name={label}
          tickLine={false}
          domain={[0, 'auto']}
          tickFormatter={(value) => compactFormat(value, 1)}
        />
        <Tooltip isAnimationActive={false} content={<RechartsTooltip />} />
        <Bar
          dataKey="value"
          name="Reward"
          unit=" PHA"
          fill={color}
          barSize={24}
          radius={[4, 4, 0, 0]}
        />
        )
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default FarmChart
