import useGetApr from '@/hooks/useGetApr'
import {subsquidClient} from '@/lib/graphql'
import {
  RewardRecordOrderByInput,
  useGlobalStateQuery,
  useRewardRecordsConnectionQuery,
} from '@/lib/subsquidQuery'
import {chainAtom} from '@/store/common'
import {Box, Divider, Skeleton, Stack, Typography} from '@mui/material'
import {toPercentage} from '@phala/util'
import {useQuery} from '@tanstack/react-query'
import {addDays} from 'date-fns'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {FC, useMemo, useState} from 'react'

type CirculationData = {
  data?: {circulations?: {nodes?: [{amount: string}?]}}
}

const numberFormat = (value: Decimal) =>
  Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(BigInt(value.floor().toString()))

const NetworkOverview: FC = () => {
  const getApr = useGetApr()
  const [yesterday] = useState(() => addDays(new Date(), -1).toISOString())
  const [chain] = useAtom(chainAtom)
  const {data: rewardRecordsData} = useRewardRecordsConnectionQuery(
    subsquidClient,
    {
      orderBy: RewardRecordOrderByInput.TimeDesc,
      where: {time_gt: yesterday},
    }
  )
  const {data: circulationData} = useQuery<CirculationData>(
    ['circulations', chain],
    async () => {
      const res = await fetch(
        'https://api.subquery.network/sq/Phala-Network/khala-chainbridge__UGhhb?query=%7Bcirculations(first:1,orderBy:BLOCK_HEIGHT_DESC)%7Bnodes%7Bamount%7D%7D%7D'
      )
      return res.json()
    }
  )
  const {data: globalStateData} = useGlobalStateQuery(subsquidClient)
  const circulationValue =
    circulationData?.data?.circulations?.nodes?.[0]?.amount
  const {totalValue, averageAprMultiplier} =
    globalStateData?.globalStateById || {}
  const stakeRatio = useMemo(() => {
    if (!circulationValue || !totalValue) return
    return toPercentage(
      new Decimal(totalValue).times(1e12).div(circulationValue)
    )
  }, [circulationValue, totalValue])
  const dailyRewards = useMemo(() => {
    if (!rewardRecordsData) return
    const sum = rewardRecordsData.rewardRecordsConnection.edges.reduce(
      (acc, cur) => acc.plus(cur.node.value),
      new Decimal(0)
    )
    return numberFormat(sum)
  }, [rewardRecordsData])
  const avgApr = useMemo(() => {
    if (!averageAprMultiplier) return
    const apr = getApr(averageAprMultiplier)
    if (!apr) return
    return toPercentage(apr)
  }, [getApr, averageAprMultiplier])
  const items = useMemo<[string, string | undefined][]>(() => {
    return [
      ['Total Value', totalValue && numberFormat(new Decimal(totalValue))],
      ['Stake Ratio', stakeRatio],
      ['Daily Rewards', dailyRewards],
      ['Avg APR', avgApr],
    ]
  }, [stakeRatio, totalValue, dailyRewards, avgApr])

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
            {value || <Skeleton width={80} />}
          </Typography>
          <Typography
            variant="num6"
            display={{sm: 'none'}}
            component="div"
            color="primary"
          >
            {value || <Skeleton width={32} />}
          </Typography>
        </Box>
      ))}
    </Stack>
  )
}

export default NetworkOverview
