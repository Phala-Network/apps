import useGetApr from '@/hooks/useGetApr'
import {useDelegationsConnectionQuery} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import {subsquidClientAtom} from '@/store/common'
import {compactFormat} from '@phala/lib'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {type FC, useMemo} from 'react'
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
import RechartsTooltip from './RechartsTooltip'

interface ChartData {
  name: string
  value: number
  apr: number | undefined
}

const DelegationScatterChart: FC<{address?: string}> = ({address}) => {
  const getApr = useGetApr()
  const [subsquidClient] = useAtom(subsquidClientAtom)
  const {data} = useDelegationsConnectionQuery(
    subsquidClient,
    {
      orderBy: 'value_DESC',
      first: 50,
      where: {account: {id_eq: address}, value_gt: '1'},
    },
    {enabled: address !== undefined},
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

  if (data == null) {
    return null
  }

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
              unit=" PHA"
              tickLine={false}
              tickFormatter={(value) => compactFormat(value as number, 0)}
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
            <Scatter data={chartData.vault} fill={colors.vault[400]} />
            <Scatter data={chartData.stakePool} fill={colors.main[300]} />
            <Tooltip isAnimationActive={false} content={<RechartsTooltip />} />
          </ScatterChart>
        </ResponsiveContainer>
      ) : (
        <Empty message="No Delegation" />
      )}
    </>
  )
}

export default DelegationScatterChart
