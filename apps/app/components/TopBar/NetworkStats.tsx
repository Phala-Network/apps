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
import {Skeleton, Stack} from '@mui/material'
import {toPercentage} from '@phala/util'
import {useQuery} from '@tanstack/react-query'
import {addDays} from 'date-fns'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {useMemo, type FC} from 'react'
import Property from '../Property'

interface CirculationData {
  data?: {circulations?: {nodes?: [{amount: string}?]}}
}

const NetworkStats: FC = () => {
  const getApr = useGetApr()
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
  const {data: phalaGlobalStateData} = useGlobalStateQuery(
    phalaSubsquidClient,
    {}
  )
  const {data: khalaGlobalStateData} = useGlobalStateQuery(
    khalaSubsquidClient,
    {}
  )
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
  const stakeRatio = useMemo(() => {
    if (
      circulationValue === undefined ||
      phalaTotalValue === undefined ||
      khalaTotalValue === undefined
    )
      return
    return toPercentage(
      new Decimal(phalaTotalValue)
        .plus(khalaTotalValue)
        .times(1e12)
        .div(circulationValue)
    )
  }, [circulationValue, phalaTotalValue, khalaTotalValue])
  const dailyRewards = useMemo(() => {
    const value =
      phalaGlobalRewardsSnapshotData?.globalRewardsSnapshotsConnection.edges[0]
        ?.node.value
    if (value == null || phalaGlobalStateData?.globalStateById == null) return

    return compactFormat(
      new Decimal(phalaGlobalStateData.globalStateById.cumulativeRewards).minus(
        value
      )
    )
  }, [phalaGlobalRewardsSnapshotData, phalaGlobalStateData])
  const avgApr = useMemo(() => {
    if (phalaAverageAprMultiplier === undefined) return
    const apr = getApr(phalaAverageAprMultiplier)
    if (apr == null) return
    return toPercentage(apr)
  }, [getApr, phalaAverageAprMultiplier])
  const idleWorkerCount = useMemo(() => {
    const count = phalaIdleWorkerCountData?.sessionsConnection.totalCount
    return typeof count === 'number' ? compactFormat(count) : undefined
  }, [phalaIdleWorkerCountData])
  const items = useMemo<Array<[string, string | undefined, WikiEntry]>>(() => {
    return [
      [
        'Total Value',
        phalaTotalValue == null
          ? undefined
          : compactFormat(new Decimal(phalaTotalValue)),
        'totalValue',
      ],
      ['Stake Ratio', stakeRatio, 'stakeRatio'],
      ['Daily Rewards', dailyRewards, 'dailyRewards'],
      ['Avg APR', avgApr, 'avgApr'],
      ['Online Workers', idleWorkerCount, 'onlineWorkers'],
    ]
  }, [stakeRatio, phalaTotalValue, dailyRewards, avgApr, idleWorkerCount])

  return (
    <Stack
      display={{xs: 'none', sm: 'flex'}}
      direction={{xs: 'column', lg: 'row'}}
      spacing={3}
      flex="none"
    >
      {items.map(([label, value, wikiEntry]) => {
        return (
          <Property
            size="small"
            label={label}
            wikiEntry={wikiEntry}
            key={label}
          >
            {value ?? <Skeleton width={80} />}
          </Property>
        )
        // const title = (
        //   <Typography
        //     variant="subtitle2"
        //     component="div"
        //     color="text.secondary"
        //   >
        //     {label}
        //   </Typography>
        // )
        // return (
        //   <Box key={label} flexShrink={0}>
        //     {wikiEntry == null ? (
        //       title
        //     ) : (
        //       <WikiButton entry={wikiEntry}>{title}</WikiButton>
        //     )}

        //     <Typography variant="num3" component="div" color="primary">
        //       {value ?? <Skeleton width={80} />}
        //     </Typography>
        //   </Box>
        // )
      })}
    </Stack>
  )
}

export default NetworkStats
