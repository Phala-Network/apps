import Property from '@/components/Property'
import useSWRValue from '@/hooks/useSWRValue'
import getDelegationProfit from '@/lib/getDelegationProfit'
import {subsquidClient} from '@/lib/graphql'
import {
  useDelegationSnapshotsConnectionQuery,
  type DelegationCommonFragment,
} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import {Paper, Typography} from '@mui/material'
import {toCurrency} from '@phala/util'
import {addDays} from 'date-fns'
import Decimal from 'decimal.js'
import {useMemo, type FC, type ReactElement} from 'react'
import {
  Bar,
  BarChart,
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

export type DelegationChartKind = 'value' | 'dailyReward'

const DelegationChart: FC<{
  delegation: DelegationCommonFragment
  kind: DelegationChartKind
}> = ({delegation, kind}) => {
  const isVault = delegation.basePool.kind === 'Vault'
  const color = isVault ? colors.vault[500] : colors.main[400]
  const updatedTime = useSWRValue(() => {
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)
    return Array.from({length: days + 1}).map((_, i) =>
      addDays(today, i - days).toISOString()
    )
  })
  const {data} = useDelegationSnapshotsConnectionQuery(
    subsquidClient,
    {
      orderBy: 'updatedTime_ASC',
      where: {
        delegation: {id_eq: delegation.id},
        updatedTime_in: updatedTime,
      },
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )

  const chartData = useMemo(() => {
    if (data === undefined) return []
    const result: Array<{date: Date; value: number; dateString: string}> = []
    const edges = data.delegationSnapshotsConnection.edges

    for (let i = 1; i < edges.length; i++) {
      const prev = edges[i - 1].node
      const current = edges[i].node
      const profit = getDelegationProfit(current, prev)
      const date = new Date(current.updatedTime)
      result.push({
        date,
        dateString: date.toLocaleDateString(),
        value: profit.toDP(2, Decimal.ROUND_DOWN).toNumber(),
      })
    }

    return result
  }, [data])

  if (data == null) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{top: 10, right: 30, left: 0, bottom: 0}}
      >
        <defs>
          <linearGradient
            id={delegation.basePool.kind}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
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
          tickLine={false}
          tickFormatter={(value) =>
            Intl.NumberFormat('en-US', {
              notation: 'compact',
              maximumFractionDigits: 2,
            }).format(value)
          }
        />
        <Tooltip
          cursor={{fill: '#222'}}
          isAnimationActive={false}
          content={
            <CustomTooltip tooltipLabel="Reward" isPHA isPercentage={false} />
          }
        />
        <Bar dataKey="value" fill={color} barSize={12} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default DelegationChart
