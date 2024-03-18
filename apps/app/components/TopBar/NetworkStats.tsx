import type {WikiEntry} from '@/assets/wikiData'
import {khalaSubsquidClient, phalaSubsquidClient} from '@/config'
import useToday from '@/hooks/useToday'
import {
  useGlobalStateQuery,
  useGlobalStateSnapshotsConnectionQuery,
} from '@/lib/subsquidQuery'
import {chainAtom} from '@/store/common'
import {
  Box,
  Skeleton,
  Stack,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import {
  compactFormat,
  toPercentage,
  useInterval,
  weightedAverage,
} from '@phala/lib'
import {useQuery} from '@tanstack/react-query'
import {addDays} from 'date-fns'
import Decimal from 'decimal.js'
import type {GraphQLClient} from 'graphql-request'
import {useAtom} from 'jotai'
import {type FC, useMemo, useState} from 'react'
import Property from '../Property'

const useDailyRewards = (client: GraphQLClient) => {
  const today = useToday()
  const pastTwoDays = useMemo(() => {
    const date = new Date(today)
    return [date.toISOString(), addDays(date, -1).toISOString()]
  }, [today])
  const {data} = useGlobalStateSnapshotsConnectionQuery(
    client,
    {
      orderBy: 'updatedTime_ASC',
      where: {updatedTime_in: pastTwoDays},
    },
    {
      select: (data) => data.globalStateSnapshotsConnection.edges,
    },
  )
  return useMemo(() => {
    if (data?.length !== 2) return null
    return new Decimal(data[1].node.cumulativeRewards).sub(
      data[0].node.cumulativeRewards,
    )
  }, [data])
}

const useGlobalStateData = (client: GraphQLClient) =>
  useGlobalStateQuery(client, undefined, {
    select: (data) => data.globalStateById,
  })

const NetworkStats: FC = () => {
  const theme = useTheme()
  const match = useMediaQuery(theme.breakpoints.down('lg'))

  const [chain] = useAtom(chainAtom)
  const {data: circulationValue} = useQuery({
    queryKey: ['circulations', chain],
    queryFn: async () => {
      const res = await fetch('/api/circulation')
      if (res.ok) {
        try {
          return new Decimal(await res.text())
        } catch (error) {
          return null
        }
      } else {
        return null
      }
    },
  })
  const {data: phalaGlobalStateData} = useGlobalStateData(phalaSubsquidClient)
  const {data: khalaGlobalStateData} = useGlobalStateData(khalaSubsquidClient)
  const {
    totalValue: phalaTotalValue,
    idleWorkerShares: phalaIdleWorkerShares,
    idleWorkerCount: phalaIdleWorkerCount,
    averageApr: phalaAverageApr,
    budgetPerShare: phalaBudgetPerShare,
  } = phalaGlobalStateData ?? {}
  const {
    totalValue: khalaTotalValue,
    idleWorkerShares: khalaIdleWorkerShares,
    idleWorkerCount: khalaIdleWorkerCount,
    averageApr: khalaAverageApr,
    budgetPerShare: khalaBudgetPerShare,
  } = khalaGlobalStateData ?? {}
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
  const phalaDailyRewards = useDailyRewards(phalaSubsquidClient)
  const khalaDailyRewards = useDailyRewards(khalaSubsquidClient)
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
                <Box
                  component="a"
                  href="https://analytics.phala.network/"
                  target="_blank"
                  sx={{
                    color: 'inherit',
                    textDecoration: 'underline dotted',
                    textDecorationColor: theme.palette.text.secondary,
                  }}
                  rel="noreferrer"
                >
                  {value}
                </Box>
              )}
            </Tooltip>
          </Property>
        )
      })}
    </Stack>
  )
}

export default NetworkStats
