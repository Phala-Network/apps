import {type WikiEntry} from '@/assets/wikiData'
import {khalaSubsquidClient, phalaSubsquidClient} from '@/config'
import useSWRValue from '@/hooks/useSWRValue'
import {
  useGlobalStateQuery,
  useGlobalStateSnapshotsConnectionQuery,
} from '@/lib/subsquidQuery'
import {chainAtom} from '@/store/common'
import {Skeleton, Stack, Tooltip, useMediaQuery, useTheme} from '@mui/material'
import {
  compactFormat,
  toPercentage,
  useInterval,
  weightedAverage,
} from '@phala/utils'
import {useQuery} from '@tanstack/react-query'
import {addDays} from 'date-fns'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {useMemo, useState, type FC} from 'react'
import Property from '../Property'

const NetworkStats: FC = () => {
  const theme = useTheme()
  const match = useMediaQuery(theme.breakpoints.down('lg'))
  const yesterday = useSWRValue([], () => {
    const date = new Date()
    date.setUTCMinutes(0, 0, 0)
    return addDays(date, -1).toISOString()
  })
  const [chain] = useAtom(chainAtom)
  const {data: phalaGlobalStateSnapshotData} =
    useGlobalStateSnapshotsConnectionQuery(phalaSubsquidClient, {
      orderBy: 'updatedTime_ASC',
      where: {updatedTime_gte: yesterday},
      first: 1,
    })
  const {data: khalaGlobalStateSnapshotData} =
    useGlobalStateSnapshotsConnectionQuery(khalaSubsquidClient, {
      orderBy: 'updatedTime_ASC',
      where: {updatedTime_gte: yesterday},
      first: 1,
    })
  const {data: circulationValue} = useQuery(
    ['circulations', chain],
    async () => {
      const res = await fetch(
        'https://pha-circulation-server.vercel.app/api/circulation',
      )
      return await res.text()
    },
  )
  const {data: phalaGlobalStateData} = useGlobalStateQuery(phalaSubsquidClient)
  const {data: khalaGlobalStateData} = useGlobalStateQuery(khalaSubsquidClient)
  const {
    totalValue: phalaTotalValue,
    idleWorkerShares: phalaIdleWorkerShares,
    idleWorkerCount: phalaIdleWorkerCount,
    averageApr: phalaAverageApr,
    budgetPerShare: phalaBudgetPerShare,
  } = phalaGlobalStateData?.globalStateById ?? {}
  const {
    totalValue: khalaTotalValue,
    idleWorkerShares: khalaIdleWorkerShares,
    idleWorkerCount: khalaIdleWorkerCount,
    averageApr: khalaAverageApr,
    budgetPerShare: khalaBudgetPerShare,
  } = khalaGlobalStateData?.globalStateById ?? {}
  const phalaTotalValueDecimal = useMemo(() => {
    if (phalaTotalValue == null) return null
    return new Decimal(phalaTotalValue)
  }, [phalaTotalValue])
  const khalaTotalValueDecimal = useMemo(() => {
    if (khalaTotalValue == null) return null
    return new Decimal(khalaTotalValue)
  }, [khalaTotalValue])

  const totalBudgetPerShare = useMemo(() => {
    if (
      phalaBudgetPerShare == null ||
      phalaIdleWorkerShares == null ||
      khalaBudgetPerShare == null ||
      khalaIdleWorkerShares == null
    )
      return null

    return weightedAverage([
      [new Decimal(phalaBudgetPerShare), new Decimal(phalaIdleWorkerShares)],
      [new Decimal(khalaBudgetPerShare), new Decimal(khalaIdleWorkerShares)],
    ])
  }, [
    khalaBudgetPerShare,
    khalaIdleWorkerShares,
    phalaBudgetPerShare,
    phalaIdleWorkerShares,
  ])
  const totalValueDecimal = useMemo(() => {
    if (phalaTotalValueDecimal == null || khalaTotalValueDecimal == null)
      return null
    return phalaTotalValueDecimal.add(khalaTotalValueDecimal)
  }, [phalaTotalValueDecimal, khalaTotalValueDecimal])
  const phalaStakeRatio = useMemo(() => {
    if (phalaTotalValueDecimal == null || circulationValue == null) return null
    return toPercentage(phalaTotalValueDecimal.div(circulationValue))
  }, [circulationValue, phalaTotalValueDecimal])
  const khalaStakeRatio = useMemo(() => {
    if (khalaTotalValueDecimal == null || circulationValue == null) return null
    return toPercentage(khalaTotalValueDecimal.div(circulationValue))
  }, [circulationValue, khalaTotalValueDecimal])
  const totalStakeRatio = useMemo(() => {
    if (circulationValue == null || totalValueDecimal == null) return null
    return toPercentage(totalValueDecimal.div(circulationValue))
  }, [circulationValue, totalValueDecimal])
  const phalaDailyRewards = useMemo(() => {
    const prevRewards =
      phalaGlobalStateSnapshotData?.globalStateSnapshotsConnection.edges[0]
        ?.node.cumulativeRewards
    const currentRewards =
      phalaGlobalStateData?.globalStateById?.cumulativeRewards
    if (prevRewards == null || currentRewards == null) return null
    return new Decimal(currentRewards).minus(prevRewards)
  }, [phalaGlobalStateSnapshotData, phalaGlobalStateData])
  const khalaDailyRewards = useMemo(() => {
    const prevRewards =
      khalaGlobalStateSnapshotData?.globalStateSnapshotsConnection.edges[0]
        ?.node.cumulativeRewards
    const currentRewards =
      khalaGlobalStateData?.globalStateById?.cumulativeRewards
    if (prevRewards == null || currentRewards == null) return null
    return new Decimal(currentRewards).minus(prevRewards)
  }, [khalaGlobalStateSnapshotData, khalaGlobalStateData])
  const totalDailyRewards = useMemo(() => {
    if (phalaDailyRewards == null || khalaDailyRewards == null) {
      return null
    }
    return phalaDailyRewards.plus(khalaDailyRewards)
  }, [phalaDailyRewards, khalaDailyRewards])
  const totalAvgApr = useMemo(() => {
    if (
      phalaTotalValueDecimal == null ||
      khalaTotalValueDecimal == null ||
      phalaAverageApr == null ||
      khalaAverageApr == null
    ) {
      return null
    }
    const apr = weightedAverage([
      [new Decimal(phalaAverageApr), phalaTotalValueDecimal],
      [new Decimal(khalaAverageApr), khalaTotalValueDecimal],
    ])
    return apr
  }, [
    khalaAverageApr,
    khalaTotalValueDecimal,
    phalaAverageApr,
    phalaTotalValueDecimal,
  ])
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
        phalaValue: toPercentage(phalaAverageApr),
        khalaValue: toPercentage(khalaAverageApr),
      },
      {
        label: 'Daily budget/share',
        value: totalBudgetPerShare?.toDP(2).toString(),
        wikiEntry: 'dailyBudgetPerShare',
        phalaValue:
          typeof phalaBudgetPerShare === 'string'
            ? new Decimal(phalaBudgetPerShare).toDP(2).toString()
            : undefined,
        khalaValue:
          typeof khalaBudgetPerShare === 'string'
            ? new Decimal(khalaBudgetPerShare).toDP(2).toString()
            : undefined,
      },
    ]
  }, [
    idleWorkerCount,
    khalaAverageApr,
    khalaBudgetPerShare,
    khalaDailyRewards,
    khalaIdleWorkerCount,
    khalaStakeRatio,
    khalaTotalValueDecimal,
    phalaAverageApr,
    phalaBudgetPerShare,
    phalaDailyRewards,
    phalaIdleWorkerCount,
    phalaStakeRatio,
    phalaTotalValueDecimal,
    totalAvgApr,
    totalBudgetPerShare,
    totalDailyRewards,
    totalStakeRatio,
    totalValueDecimal,
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
