import {type WikiEntry} from '@/assets/wikiData'
import {khalaSubsquidClient, phalaSubsquidClient} from '@/config'
import useGetApr from '@/hooks/useGetApr'
import useSWRValue from '@/hooks/useSWRValue'
import compactFormat from '@/lib/compactFormat'
import {
  useGlobalRewardsSnapshotsConnectionQuery,
  useGlobalStateQuery,
  useIdleWorkerCountQuery,
} from '@/lib/subsquidQuery'
import {chainAtom} from '@/store/common'
import {Skeleton, Stack, useMediaQuery, useTheme} from '@mui/material'
import {useInterval} from '@phala/lib'
import {toPercentage} from '@phala/util'
import {useQuery} from '@tanstack/react-query'
import {addDays} from 'date-fns'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {useMemo, useState, type FC} from 'react'
import Property from '../Property'

interface CirculationData {
  data?: {circulations?: {nodes?: [{amount: string}?]}}
}

const NetworkStats: FC = () => {
  const theme = useTheme()
  const match = useMediaQuery(theme.breakpoints.down('lg'))
  const getPhalaApr = useGetApr('phala')
  const getKhalaApr = useGetApr('khala')
  const yesterday = useSWRValue([], () => {
    const date = new Date()
    date.setUTCMinutes(0, 0, 0)
    return addDays(date, -1).toISOString()
  })
  const [chain] = useAtom(chainAtom)
  const {data: phalaGlobalRewardsSnapshotData} =
    useGlobalRewardsSnapshotsConnectionQuery(phalaSubsquidClient, {
      orderBy: 'updatedTime_ASC',
      where: {updatedTime_gte: yesterday},
      first: 1,
    })
  const {data: khalaGlobalRewardsSnapshotData} =
    useGlobalRewardsSnapshotsConnectionQuery(khalaSubsquidClient, {
      orderBy: 'updatedTime_ASC',
      where: {updatedTime_gte: yesterday},
      first: 1,
    })
  const {data: circulationData} = useQuery<CirculationData>(
    ['circulations', chain],
    async () => {
      const res = await fetch(
        'https://api.subquery.network/sq/Phala-Network/khala-chainbridge__UGhhb?query=%7Bcirculations(first:1,orderBy:BLOCK_HEIGHT_DESC)%7Bnodes%7Bamount%7D%7D%7D'
      )
      return (await res.json()) as CirculationData
    }
  )
  const {data: phalaGlobalStateData} = useGlobalStateQuery(phalaSubsquidClient)
  const {data: khalaGlobalStateData} = useGlobalStateQuery(khalaSubsquidClient)
  const {data: phalaIdleWorkerCountData} =
    useIdleWorkerCountQuery(phalaSubsquidClient)
  const {data: khalaIdleWorkerCountData} =
    useIdleWorkerCountQuery(khalaSubsquidClient)
  const circulationValue =
    circulationData?.data?.circulations?.nodes?.[0]?.amount
  const {
    totalValue: phalaTotalValue,
    averageAprMultiplier: phalaAverageAprMultiplier,
  } = phalaGlobalStateData?.globalStateById ?? {}
  const {
    totalValue: khalaTotalValue,
    averageAprMultiplier: khalaAverageAprMultiplier,
  } = khalaGlobalStateData?.globalStateById ?? {}
  const totalValue = useMemo(() => {
    if (phalaTotalValue === undefined || khalaTotalValue === undefined) return
    return new Decimal(phalaTotalValue).plus(khalaTotalValue)
  }, [phalaTotalValue, khalaTotalValue])
  const stakeRatio = useMemo(() => {
    if (circulationValue === undefined || totalValue === undefined) return
    return toPercentage(totalValue.times(1e12).div(circulationValue))
  }, [circulationValue, totalValue])
  const dailyRewards = useMemo(() => {
    const phalaValue =
      phalaGlobalRewardsSnapshotData?.globalRewardsSnapshotsConnection.edges[0]
        ?.node.value
    const khalaValue =
      khalaGlobalRewardsSnapshotData?.globalRewardsSnapshotsConnection.edges[0]
        ?.node.value
    if (
      phalaValue == null ||
      khalaValue == null ||
      phalaGlobalStateData?.globalStateById == null ||
      khalaGlobalStateData?.globalStateById == null
    ) {
      return
    }

    return compactFormat(
      new Decimal(phalaGlobalStateData.globalStateById.cumulativeRewards)
        .minus(phalaValue)
        .plus(khalaGlobalStateData.globalStateById.cumulativeRewards)
        .minus(khalaValue)
    )
  }, [
    khalaGlobalRewardsSnapshotData?.globalRewardsSnapshotsConnection.edges,
    khalaGlobalStateData?.globalStateById,
    phalaGlobalRewardsSnapshotData?.globalRewardsSnapshotsConnection.edges,
    phalaGlobalStateData?.globalStateById,
  ])
  const avgApr = useMemo(() => {
    if (
      phalaAverageAprMultiplier == null ||
      khalaAverageAprMultiplier == null ||
      phalaTotalValue == null ||
      khalaTotalValue == null
    ) {
      return
    }
    const phalaApr = getPhalaApr(phalaAverageAprMultiplier)
    const khalaApr = getKhalaApr(khalaAverageAprMultiplier)
    if (phalaApr == null || khalaApr == null) return
    const apr = phalaApr
      .times(phalaTotalValue)
      .plus(khalaApr.times(khalaTotalValue))
      .div(new Decimal(phalaTotalValue).plus(khalaTotalValue))
    return toPercentage(apr)
  }, [
    getKhalaApr,
    getPhalaApr,
    khalaAverageAprMultiplier,
    khalaTotalValue,
    phalaAverageAprMultiplier,
    phalaTotalValue,
  ])
  const idleWorkerCount = useMemo(() => {
    const phalaCount = phalaIdleWorkerCountData?.sessionsConnection.totalCount
    const khalaCount = khalaIdleWorkerCountData?.sessionsConnection.totalCount
    return typeof phalaCount === 'number' && typeof khalaCount === 'number'
      ? compactFormat(phalaCount + khalaCount)
      : undefined
  }, [
    khalaIdleWorkerCountData?.sessionsConnection.totalCount,
    phalaIdleWorkerCountData?.sessionsConnection.totalCount,
  ])
  const items = useMemo<
    Array<[string, string | undefined | false, WikiEntry]>
  >(() => {
    return [
      [
        'Total Value',
        totalValue != null && compactFormat(totalValue),
        'totalValue',
      ],
      ['Stake Ratio', stakeRatio, 'stakeRatio'],
      ['Daily Rewards', dailyRewards, 'dailyRewards'],
      ['Avg APR', avgApr, 'avgApr'],
      ['Online Workers', idleWorkerCount, 'onlineWorkers'],
    ]
  }, [totalValue, stakeRatio, dailyRewards, avgApr, idleWorkerCount])

  const [currentIndex, setCurrentIndex] = useState(0)
  useInterval(
    () => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    },
    match ? 5000 : null
  )

  return (
    <Stack direction="row" spacing={{xs: 0, lg: 3}} flex="none">
      {items.map(([label, value, wikiEntry], index) => {
        return (
          <Property
            size="small"
            label={label}
            wikiEntry={wikiEntry}
            key={label}
            sx={{display: match && currentIndex !== index ? 'none' : undefined}}
          >
            {value ?? <Skeleton width={40} />}
          </Property>
        )
      })}
    </Stack>
  )
}

export default NetworkStats
