import useGetApr from '@/hooks/useGetApr'
import useYesterday from '@/hooks/useYesterday'
import {subsquidClient} from '@/lib/graphql'
import {
  useGlobalStateQuery,
  useIdleWorkerCountQuery,
  useRewardRecordsConnectionQuery,
} from '@/lib/subsquidQuery'
import {chainAtom} from '@/store/common'
import {Box, Divider, Skeleton, Stack, Typography} from '@mui/material'
import {toPercentage} from '@phala/util'
import {useQuery} from '@tanstack/react-query'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {useMemo, type FC} from 'react'

interface CirculationData {
  data?: {circulations?: {nodes?: [{amount: string}?]}}
}

const numberFormat = (value: Decimal | number): string =>
  Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(
    typeof value === 'number' ? value : BigInt(value.floor().toString())
  )

const NetworkOverview: FC = () => {
  const getApr = useGetApr()
  const yesterday = useYesterday()
  const [chain] = useAtom(chainAtom)
  const {data: rewardRecordsData} = useRewardRecordsConnectionQuery(
    subsquidClient,
    {orderBy: 'time_DESC', where: {time_gt: yesterday}},
    {enabled: yesterday !== undefined}
  )
  const {data: circulationData} = useQuery<CirculationData>(
    ['circulations', chain],
    async () => {
      const res = await fetch(
        'https://api.subquery.network/sq/Phala-Network/khala-chainbridge__UGhhb?query=%7Bcirculations(first:1,orderBy:BLOCK_HEIGHT_DESC)%7Bnodes%7Bamount%7D%7D%7D'
      )
      return await res.json()
    }
  )
  const {data: globalStateData} = useGlobalStateQuery(subsquidClient)
  const {data: idleWorkerCountData} = useIdleWorkerCountQuery(subsquidClient)
  const circulationValue =
    circulationData?.data?.circulations?.nodes?.[0]?.amount
  const {totalValue, averageAprMultiplier} =
    globalStateData?.globalStateById ?? {}
  const stakeRatio = useMemo(() => {
    if (circulationValue === undefined || totalValue === undefined) return
    return toPercentage(
      new Decimal(totalValue).times(1e12).div(circulationValue)
    )
  }, [circulationValue, totalValue])
  const dailyRewards = useMemo(() => {
    if (rewardRecordsData == null) return
    const sum = rewardRecordsData.rewardRecordsConnection.edges.reduce(
      (acc, cur) => acc.plus(cur.node.value),
      new Decimal(0)
    )
    return numberFormat(sum)
  }, [rewardRecordsData])
  const avgApr = useMemo(() => {
    if (averageAprMultiplier === undefined) return
    const apr = getApr(averageAprMultiplier)
    if (apr == null) return
    return toPercentage(apr)
  }, [getApr, averageAprMultiplier])
  const idleWorkerCount = useMemo(() => {
    const count = idleWorkerCountData?.sessionsConnection.totalCount
    return typeof count === 'number' && numberFormat(count)
  }, [idleWorkerCountData])
  const items = useMemo<Array<[string, string | false | undefined]>>(() => {
    return [
      [
        'Total Value',
        totalValue !== undefined && numberFormat(new Decimal(totalValue)),
      ],
      ['Stake Ratio', stakeRatio],
      ['Daily Rewards', dailyRewards],
      ['Avg APR', avgApr],
      ['Online Workers', idleWorkerCount],
    ]
  }, [stakeRatio, totalValue, dailyRewards, avgApr, idleWorkerCount])

  return (
    <Stack
      direction="row"
      spacing={{xs: 1.5, sm: 3}}
      divider={<Divider orientation="vertical" flexItem />}
    >
      {items.map(([label, value]) => (
        <Box key={label} flexShrink={0}>
          <Typography
            variant="subtitle2"
            display={{xs: 'none', sm: 'block'}}
            component="div"
          >
            {label}
          </Typography>
          <Typography variant="caption" display={{sm: 'none'}} component="div">
            {label}
          </Typography>
          <Typography
            variant="num3"
            display={{xs: 'none', sm: 'block'}}
            component="div"
            color="primary"
          >
            {value ?? <Skeleton width={80} />}
          </Typography>
          <Typography
            variant="num6"
            display={{sm: 'none'}}
            component="div"
            color="primary"
          >
            {value ?? <Skeleton width={32} />}
          </Typography>
        </Box>
      ))}
    </Stack>
  )
}

export default NetworkOverview
