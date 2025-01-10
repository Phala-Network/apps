import type {WikiEntry} from '@/assets/wikiData'
import {subsquidClient} from '@/config'
import useToday from '@/hooks/useToday'
import {
  useGlobalStateQuery,
  useGlobalStateSnapshotsConnectionQuery,
} from '@/lib/subsquidQuery'
import {Box, Skeleton, Stack, useMediaQuery, useTheme} from '@mui/material'
import {compactFormat, toPercentage, useInterval} from '@phala/lib'
import {useQuery} from '@tanstack/react-query'
import {addDays} from 'date-fns'
import Decimal from 'decimal.js'
import type {GraphQLClient} from 'graphql-request'
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

  const {data: circulationValue} = useQuery({
    queryKey: ['circulations'],
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
  const {data: phalaGlobalStateData} = useGlobalStateData(subsquidClient)
  const {
    totalValue: phalaTotalValue,
    idleWorkerShares: phalaIdleWorkerShares,
    idleWorkerCount: phalaIdleWorkerCount,
    averageApr: phalaAverageApr,
    budgetPerShare: phalaBudgetPerShare,
  } = phalaGlobalStateData ?? {}

  const phalaTotalValueDecimal = useMemo(() => {
    if (phalaTotalValue == null) return null
    return new Decimal(phalaTotalValue)
  }, [phalaTotalValue])

  const phalaStakeRatio = useMemo(() => {
    if (phalaTotalValueDecimal == null || circulationValue == null) return null
    return toPercentage(phalaTotalValueDecimal.div(circulationValue))
  }, [circulationValue, phalaTotalValueDecimal])

  const phalaDailyRewards = useDailyRewards(subsquidClient)

  type Value = string | undefined | null
  const items = useMemo<
    Array<{
      label: string
      value: Value
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
        value: format(phalaTotalValueDecimal),
        wikiEntry: 'totalValue',
      },
      {
        label: 'Stake Ratio',
        value: phalaStakeRatio,
        wikiEntry: 'stakeRatio',
      },
      {
        label: 'Daily Rewards',
        value: format(phalaDailyRewards),
        wikiEntry: 'dailyRewards',
      },
      {
        label: 'Online Workers',
        value: format(phalaIdleWorkerCount),
        wikiEntry: 'onlineWorkers',
      },
      {
        label: 'Avg APR',
        value: toPercentage(phalaAverageApr),
        wikiEntry: 'avgApr',
      },
      {
        label: 'Daily budget/share',
        value: phalaBudgetPerShare
          ? new Decimal(phalaBudgetPerShare).toDP(2).toString()
          : null,
        wikiEntry: 'dailyBudgetPerShare',
      },
    ]
  }, [
    phalaAverageApr,
    phalaBudgetPerShare,
    phalaDailyRewards,
    phalaIdleWorkerCount,
    phalaStakeRatio,
    phalaTotalValueDecimal,
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
      {items.map(({label, value, wikiEntry}, index) => {
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
            {value == null ? (
              <Skeleton width={40} />
            ) : (
              <Box
                component="a"
                href="https://dune.com/phala_network/phala-analytics"
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
          </Property>
        )
      })}
    </Stack>
  )
}

export default NetworkStats
