import useGetApr from '@/hooks/useGetApr'
import useSWRValue from '@/hooks/useSWRValue'
import compactFormat from '@/lib/compactFormat'
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
import {addDays} from 'date-fns'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {useMemo, type FC} from 'react'
import WikiButton from './Wiki/Button'

interface CirculationData {
  data?: {circulations?: {nodes?: [{amount: string}?]}}
}

const NetworkStats: FC = () => {
  const getApr = useGetApr()
  const yesterday = useSWRValue(() => addDays(new Date(), -1).toISOString())
  const [chain] = useAtom(chainAtom)
  const {data: rewardRecordsData} = useRewardRecordsConnectionQuery(
    subsquidClient,
    {orderBy: 'time_DESC', where: {time_gt: yesterday}}
  )
  const {data: circulationData} = useQuery<CirculationData>(
    ['circulations', chain],
    async () => {
      const res = await fetch(
        'https://api.subquery.network/sq/Phala-Network/khala-chainbridge__UGhhb?query=%7Bcirculations(first:1,orderBy:BLOCK_HEIGHT_DESC)%7Bnodes%7Bamount%7D%7D%7D'
      )
      return (await res.json()) as CirculationData
    }
  )
  const {data: globalStateData} = useGlobalStateQuery(subsquidClient, {})
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
    return compactFormat(sum)
  }, [rewardRecordsData])
  const avgApr = useMemo(() => {
    if (averageAprMultiplier === undefined) return
    const apr = getApr(averageAprMultiplier)
    if (apr == null) return
    return toPercentage(apr)
  }, [getApr, averageAprMultiplier])
  const idleWorkerCount = useMemo(() => {
    const count = idleWorkerCountData?.sessionsConnection.totalCount
    return typeof count === 'number' && compactFormat(count)
  }, [idleWorkerCountData])
  const items = useMemo<
    Array<[string, string | false | undefined, string | undefined]>
  >(() => {
    return [
      [
        'Total Value',
        totalValue !== undefined && compactFormat(new Decimal(totalValue)),
        'totalValue',
      ],
      ['Stake Ratio', stakeRatio, 'stakeRatio'],
      ['Daily Rewards', dailyRewards, 'dailyRewards'],
      ['Avg APR', avgApr, 'avgApr'],
      ['Online Workers', idleWorkerCount, 'onlineWorkers'],
    ]
  }, [stakeRatio, totalValue, dailyRewards, avgApr, idleWorkerCount])

  return (
    <>
      <Stack
        display={{xs: 'none', sm: 'flex'}}
        direction="row"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        {items.map(([label, value, wikiEntry]) => {
          const title = (
            <Typography
              variant="subtitle2"
              component="div"
              color="text.secondary"
            >
              {label}
            </Typography>
          )
          return (
            <Box key={label} flexShrink={0}>
              {wikiEntry == null ? (
                title
              ) : (
                <WikiButton entry={wikiEntry}>{title}</WikiButton>
              )}

              <Typography variant="num3" component="div" color="primary">
                {value ?? <Skeleton width={80} />}
              </Typography>
            </Box>
          )
        })}
      </Stack>
      <Stack
        display={{sm: 'none', xs: 'flex'}}
        direction="row"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        {items.map(([label, value]) => (
          <Stack
            key={label}
            direction="row"
            justifyContent="space-between"
            width={0.48}
            flexShrink={0}
            alignItems="baseline"
          >
            <Typography
              variant="subtitle2"
              component="div"
              color="text.secondary"
            >
              {label}
            </Typography>
            <Typography variant="num5" component="div" color="primary">
              {value ?? <Skeleton width={32} />}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </>
  )
}

export default NetworkStats
