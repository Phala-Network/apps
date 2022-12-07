import useGetApr from '@/hooks/useGetApr'
import {subsquidClient} from '@/lib/graphql'
import {
  DelegationOrderByInput,
  useDelegationsConnectionQuery,
} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import {Paper, Stack, Typography} from '@mui/material'
import Decimal from 'decimal.js'
import {FC, ReactElement, useMemo} from 'react'
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Property from './Property'

type ChartData = {
  name: string
  value: number
  apr: number | undefined
}

const CustomTooltip = ({
  payload,
}: {
  payload?: {
    name: string
    payload: {name: string}
    value: number | string
    unit: string
  }[]
}): ReactElement | null => {
  if (payload?.[0]) {
    return (
      <Paper sx={{p: 1}}>
        <Typography variant="subtitle2">{payload[0].payload.name}</Typography>
        {payload.map(({name, value, unit}) => (
          <Property
            sx={{justifyContent: 'space-between'}}
            size="small"
            label={name}
            key={name}
          >{`${value}${unit}`}</Property>
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
      orderBy: DelegationOrderByInput.ValueDesc,
      first: 50,
      where: {account: {id_eq: address}, value_gt: '1'},
    },
    {enabled: !!address}
  )

  const chartData = useMemo(() => {
    if (!data) return {vault: [], stakePool: []}
    const result: {vault: ChartData[]; stakePool: ChartData[]} = {
      vault: [],
      stakePool: [],
    }
    for (const {node} of data.delegationsConnection.edges) {
      const cell = {
        name: `${
          node.basePool.kind === 'StakePool' ? 'Stake Pool' : 'Vault'
        } #${node.basePool.id}`,
        value: new Decimal(node.value).floor().toNumber(),
        apr: getApr(node.basePool.aprMultiplier)?.times(100).floor().toNumber(),
      }
      if (node.basePool.kind === 'StakePool') {
        result.stakePool.push(cell)
      } else {
        result.vault.push(cell)
      }
    }

    return result
  }, [data, getApr])

  const hasDelegation = !!chartData.vault.length || !!chartData.stakePool.length

  if (isLoading) return null

  return (
    <>
      {hasDelegation ? (
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              type="number"
              dataKey="value"
              name="Value"
              unit="PHA"
              tickLine={false}
            />
            <YAxis
              type="number"
              dataKey="apr"
              name="APR"
              unit="%"
              tickLine={false}
              width={40}
            />
            <XAxis dataKey="name" />
            <Scatter data={chartData.vault} fill={colors.vault[400]}></Scatter>
            <Scatter
              data={chartData.stakePool}
              fill={colors.main[300]}
            ></Scatter>
            <Tooltip isAnimationActive={false} content={<CustomTooltip />} />
          </ScatterChart>
        </ResponsiveContainer>
      ) : (
        <Stack alignItems="center" justifyContent="center" height="100%">
          No Delegation
        </Stack>
      )}
    </>
  )
}

export default DelegationScatterChart
