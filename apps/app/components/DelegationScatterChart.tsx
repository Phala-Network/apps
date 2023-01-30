import useGetApr from '@/hooks/useGetApr'
import {subsquidClient} from '@/lib/graphql'
import {useDelegationsConnectionQuery} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import {Paper, Typography} from '@mui/material'
import {toCurrency} from '@phala/util'
import Decimal from 'decimal.js'
import {useMemo, type FC, type ReactElement} from 'react'
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts'
import Empty from './Empty'
import Property from './Property'

interface ChartData {
  name: string
  value: number
  apr: number | undefined
}

const CustomTooltip = ({
  payload,
}: {
  payload?: Array<{
    name: string
    payload: {name: string}
    value: number | string
    unit: string
  }>
}): ReactElement | null => {
  if (payload?.[0] != null) {
    return (
      <Paper sx={{p: 1}}>
        <Typography variant="subtitle2">{payload[0].payload.name}</Typography>
        {payload.map(({name, value, unit}) => (
          <Property fullWidth size="small" label={name} key={name}>{`${
            name === 'Value' ? toCurrency(value) : value
          }${name === 'Value' ? ' PHA' : unit}`}</Property>
        ))}
      </Paper>
    )
  }

  return null
}

const DelegationScatterChart: FC<{address?: string}> = ({address}) => {
  const getApr = useGetApr()
  const {data, isLoading} = useDelegationsConnectionQuery(
    subsquidClient,
    {
      orderBy: 'value_DESC',
      first: 50,
      where: {account: {id_eq: address}, value_gt: '1'},
    },
    {enabled: address !== undefined}
  )

  const chartData = useMemo(() => {
    if (data == null) return {vault: [], stakePool: []}
    const result: {vault: ChartData[]; stakePool: ChartData[]} = {
      vault: [],
      stakePool: [],
    }
    for (const {node} of data.delegationsConnection.edges) {
      const cell = {
        name: `${node.basePool.kind} #${node.basePool.id}`,
        value: new Decimal(node.value).floor().toNumber(),
        apr: getApr(node.basePool.aprMultiplier)
          ?.times(100)
          .toDP(2, Decimal.ROUND_DOWN)
          .toNumber(),
      }
      if (node.basePool.kind === 'StakePool') {
        result.stakePool.push(cell)
      } else {
        result.vault.push(cell)
      }
    }

    return result
  }, [data, getApr])

  const hasDelegation =
    chartData.vault.length !== 0 || chartData.stakePool.length !== 0

  if (isLoading) return null

  return (
    <>
      {hasDelegation ? (
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              height={20}
              type="number"
              dataKey="value"
              name="Value"
              tickLine={false}
              tickFormatter={(value) =>
                Intl.NumberFormat('en-US', {
                  notation: 'compact',
                  maximumFractionDigits: 0,
                }).format(value)
              }
            />
            <YAxis
              type="number"
              dataKey="apr"
              name="APR"
              unit="%"
              tickLine={false}
              width={35}
            />
            <ZAxis range={[120, 120]} />
            <Scatter data={chartData.vault} fill={colors.vault[400]}></Scatter>
            <Scatter
              data={chartData.stakePool}
              fill={colors.main[300]}
            ></Scatter>
            <Tooltip isAnimationActive={false} content={<CustomTooltip />} />
          </ScatterChart>
        </ResponsiveContainer>
      ) : (
        <Empty message="No Delegation" />
      )}
    </>
  )
}

export default DelegationScatterChart
