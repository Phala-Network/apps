import {type WikiEntry} from '@/assets/wikiData'
import {khalaSubsquidClient, phalaSubsquidClient} from '@/config'
import useGetApr from '@/hooks/useGetApr'
import useSWRValue from '@/hooks/useSWRValue'
import {
  useGlobalRewardsSnapshotsConnectionQuery,
  useGlobalStateQuery,
  useIdleWorkerCountQuery,
} from '@/lib/subsquidQuery'
import {chainAtom} from '@/store/common'
import {Skeleton, Stack, Tooltip, useMediaQuery, useTheme} from '@mui/material'
import {compactFormat, useInterval} from '@phala/lib'
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
        'https://api.subquery.network/sq/Phala-Network/khala-chainbridge__UGhhb?query=%7Bcirculations(first:1,orderBy:BLOCK_HEIGHT_DESC)%7Bnodes%7Bamount%7D%7D%7D',
      )
      return (await res.json()) as CirculationData
    },
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
    idleWorkerShares: phalaIdleWorkerShares,
    budgetPerBlock: phalaBudgetPerBlock,
    averageBlockTime: phalaAverageBlockTime,
  } = phalaGlobalStateData?.globalStateById ?? {}
  const {
    totalValue: khalaTotalValue,
    averageAprMultiplier: khalaAverageAprMultiplier,
    idleWorkerShares: khalaIdleWorkerShares,
    budgetPerBlock: khalaBudgetPerBlock,
    averageBlockTime: khalaAverageBlockTime,
  } = khalaGlobalStateData?.globalStateById ?? {}
  const phalaTotalValueDecimal = useMemo(() => {
    if (phalaTotalValue == null) return null
    return new Decimal(phalaTotalValue)
  }, [phalaTotalValue])
  const khalaTotalValueDecimal = useMemo(() => {
    if (khalaTotalValue == null) return null
    return new Decimal(khalaTotalValue)
  }, [khalaTotalValue])
  const phalaBudgetPerShare = useMemo(() => {
    if (
      phalaBudgetPerBlock == null ||
      phalaIdleWorkerShares == null ||
      phalaAverageBlockTime == null
    )
      return null
    return new Decimal(phalaBudgetPerBlock)
      .div(phalaIdleWorkerShares)
      .div(phalaAverageBlockTime)
      .times(1e7 * 24 * 60 * 60)
  }, [phalaAverageBlockTime, phalaBudgetPerBlock, phalaIdleWorkerShares])
  const khalaBudgetPerShare = useMemo(() => {
    if (
      khalaBudgetPerBlock == null ||
      khalaIdleWorkerShares == null ||
      khalaAverageBlockTime == null
    )
      return null
    return new Decimal(khalaBudgetPerBlock)
      .div(khalaIdleWorkerShares)
      .div(khalaAverageBlockTime)
      .times(1e7 * 24 * 60 * 60)
  }, [khalaAverageBlockTime, khalaBudgetPerBlock, khalaIdleWorkerShares])
  const totalBudgetPerShare = useMemo(() => {
    if (
      phalaBudgetPerBlock == null ||
      phalaIdleWorkerShares == null ||
      phalaAverageBlockTime == null ||
      khalaBudgetPerBlock == null ||
      khalaIdleWorkerShares == null ||
      khalaAverageBlockTime == null
    )
      return null

    return new Decimal(phalaBudgetPerBlock)
      .div(phalaAverageBlockTime)
      .plus(new Decimal(khalaBudgetPerBlock).div(khalaAverageBlockTime))
      .times(1e7 * 24 * 60 * 60)
      .div(new Decimal(phalaIdleWorkerShares).plus(khalaIdleWorkerShares))
  }, [
    khalaAverageBlockTime,
    khalaBudgetPerBlock,
    khalaIdleWorkerShares,
    phalaAverageBlockTime,
    phalaBudgetPerBlock,
    phalaIdleWorkerShares,
  ])
  const totalValueDecimal = useMemo(() => {
    if (phalaTotalValueDecimal == null || khalaTotalValueDecimal == null)
      return null
    return phalaTotalValueDecimal.add(khalaTotalValueDecimal)
  }, [phalaTotalValueDecimal, khalaTotalValueDecimal])
  const phalaStakeRatio = useMemo(() => {
    if (phalaTotalValueDecimal == null || circulationValue == null) return null
    return toPercentage(
      phalaTotalValueDecimal.times(1e12).div(circulationValue),
    )
  }, [circulationValue, phalaTotalValueDecimal])
  const khalaStakeRatio = useMemo(() => {
    if (khalaTotalValueDecimal == null || circulationValue == null) return null
    return toPercentage(
      khalaTotalValueDecimal.times(1e12).div(circulationValue),
    )
  }, [circulationValue, khalaTotalValueDecimal])
  const totalStakeRatio = useMemo(() => {
    if (circulationValue == null || totalValueDecimal == null) return null
    return toPercentage(totalValueDecimal.times(1e12).div(circulationValue))
  }, [circulationValue, totalValueDecimal])
  const phalaDailyRewards = useMemo(() => {
    const prevRewards =
      phalaGlobalRewardsSnapshotData?.globalRewardsSnapshotsConnection.edges[0]
        ?.node.value
    const currentRewards =
      phalaGlobalStateData?.globalStateById?.cumulativeRewards
    if (prevRewards == null || currentRewards == null) return null
    return new Decimal(currentRewards).minus(prevRewards)
  }, [phalaGlobalRewardsSnapshotData, phalaGlobalStateData])
  const khalaDailyRewards = useMemo(() => {
    const prevRewards =
      khalaGlobalRewardsSnapshotData?.globalRewardsSnapshotsConnection.edges[0]
        ?.node.value
    const currentRewards =
      khalaGlobalStateData?.globalStateById?.cumulativeRewards
    if (prevRewards == null || currentRewards == null) return null
    return new Decimal(currentRewards).minus(prevRewards)
  }, [khalaGlobalRewardsSnapshotData, khalaGlobalStateData])
  const totalDailyRewards = useMemo(() => {
    if (phalaDailyRewards == null || khalaDailyRewards == null) {
      return null
    }
    return phalaDailyRewards.plus(khalaDailyRewards)
  }, [phalaDailyRewards, khalaDailyRewards])
  const phalaAvgApr = useMemo(() => {
    if (phalaAverageAprMultiplier == null) return null
    return getPhalaApr(phalaAverageAprMultiplier)
  }, [getPhalaApr, phalaAverageAprMultiplier])
  const khalaAvgApr = useMemo(() => {
    if (khalaAverageAprMultiplier == null) return null
    return getKhalaApr(khalaAverageAprMultiplier)
  }, [getKhalaApr, khalaAverageAprMultiplier])
  const totalAvgApr = useMemo(() => {
    if (
      phalaTotalValueDecimal == null ||
      khalaTotalValueDecimal == null ||
      phalaAvgApr == null ||
      khalaAvgApr == null ||
      totalValueDecimal == null
    ) {
      return null
    }
    const apr = phalaAvgApr
      .times(phalaTotalValueDecimal)
      .plus(khalaAvgApr.times(khalaTotalValueDecimal))
      .div(totalValueDecimal)
    return apr
  }, [
    khalaAvgApr,
    khalaTotalValueDecimal,
    phalaAvgApr,
    phalaTotalValueDecimal,
    totalValueDecimal,
  ])
  const phalaIdleWorkerCount =
    phalaIdleWorkerCountData?.sessionsConnection.totalCount
  const khalaIdleWorkerCount =
    khalaIdleWorkerCountData?.sessionsConnection.totalCount
  const idleWorkerCount = useMemo(() => {
    return typeof phalaIdleWorkerCount === 'number' &&
      typeof khalaIdleWorkerCount === 'number'
      ? phalaIdleWorkerCount + khalaIdleWorkerCount
      : undefined
  }, [khalaIdleWorkerCount, phalaIdleWorkerCount])

  type Value = string | undefined | null
  const items = useMemo<
    Array<{
      label: string
      value: Value
      phalaValue: Value
      khalaValue: Value
      wikiEntry: WikiEntry
    }>
  >(() => {
    const format = (
      value: Decimal | number | null | undefined,
    ): string | undefined | null => {
      if (value == null) return value
      return compactFormat(value)
    }
    return [
      {
        label: 'Total Value',
        value: format(totalValueDecimal),
        wikiEntry: 'totalValue',
        phalaValue: format(phalaTotalValueDecimal),
        khalaValue: format(khalaTotalValueDecimal),
      },
      {
        label: 'Stake Ratio',
        value: totalStakeRatio,
        wikiEntry: 'stakeRatio',
        phalaValue: `${phalaStakeRatio ?? ''}/${totalStakeRatio ?? ''}`,
        khalaValue: `${khalaStakeRatio ?? ''}/${totalStakeRatio ?? ''}`,
      },
      {
        label: 'Daily Rewards',
        value: format(totalDailyRewards),
        wikiEntry: 'dailyRewards',
        phalaValue: format(phalaDailyRewards),
        khalaValue: format(khalaDailyRewards),
      },
      {
        label: 'Online Workers',
        value: format(idleWorkerCount),
        wikiEntry: 'onlineWorkers',
        phalaValue: format(phalaIdleWorkerCount),
        khalaValue: format(khalaIdleWorkerCount),
      },
      {
        label: 'Avg APR',
        value: toPercentage(totalAvgApr),
        wikiEntry: 'avgApr',
        phalaValue: toPercentage(phalaAvgApr),
        khalaValue: toPercentage(khalaAvgApr),
      },
      {
        label: 'Daily budget/share',
        value: totalBudgetPerShare?.toDP(2).toString(),
        wikiEntry: 'dailyBudgetPerShare',
        phalaValue: phalaBudgetPerShare?.toDP(2).toString(),
        khalaValue: khalaBudgetPerShare?.toDP(2).toString(),
      },
    ]
  }, [
    totalValueDecimal,
    phalaTotalValueDecimal,
    khalaTotalValueDecimal,
    totalStakeRatio,
    phalaStakeRatio,
    khalaStakeRatio,
    totalDailyRewards,
    phalaDailyRewards,
    khalaDailyRewards,
    idleWorkerCount,
    phalaIdleWorkerCount,
    khalaIdleWorkerCount,
    totalAvgApr,
    phalaAvgApr,
    khalaAvgApr,
    totalBudgetPerShare,
    phalaBudgetPerShare,
    khalaBudgetPerShare,
  ])

  const [currentIndex, setCurrentIndex] = useState(0)
  useInterval(
    () => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    },
    match ? 5000 : null,
  )

  return (
    <Stack direction="row" spacing={{xs: 0, lg: 3}} flex="none">
      {items.map(({label, value, wikiEntry, phalaValue, khalaValue}, index) => {
        return (
          <Property
            key={label}
            size="small"
            label={label}
            wikiEntry={wikiEntry}
            sx={{
              display: match && currentIndex !== index ? 'none' : undefined,
            }}
          >
            <Tooltip
              title={
                <>
                  <Property label="Phala" size="small">
                    {phalaValue ?? <Skeleton width={40} />}
                  </Property>
                  <Property label="Khala" size="small">
                    {khalaValue ?? <Skeleton width={40} />}
                  </Property>
                </>
              }
            >
              {value == null ? (
                <Skeleton width={40} />
              ) : (
                <span
                  css={{
                    textDecoration: 'underline dotted',
                    textDecorationColor: theme.palette.text.secondary,
                  }}
                >
                  {value}
                </span>
              )}
            </Tooltip>
          </Property>
        )
      })}
    </Stack>
  )
}

export default NetworkStats
