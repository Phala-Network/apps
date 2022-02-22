import {useEffect, useMemo, useRef, VFC} from 'react'
import {Card} from 'baseui/card'
import {Block} from 'baseui/block'
import {HeadingLarge, HeadingSmall} from 'baseui/typography'
import {useQuery} from 'react-query'
import {camelizeKeys} from 'humps'
import {Skeleton} from 'baseui/skeleton'
import {StyledLink} from 'baseui/link'
import {formatCurrency, trimAddress} from '@phala/utils'
import {
  StatefulDataTable,
  NumericalColumn,
  StringColumn,
  CustomColumn,
} from 'baseui/data-table'
import {useMotionValue, animate} from 'framer-motion'
import Helmet from 'react-helmet'

type Worker = {
  id: number
  publicKey: string
  pid: number
  ownerAddress: string
  stakes: string
  minedReward: string
  state: string
  stateUpdatedBlockNumber: null
  stateUpdatedTimestamp: null
  idleBlocksCount: number
  idleRatio: string
  discordId: string | null
  name: string
  city: string
  region: string
  country: string
  registeredAt: string
  overallScore: number
  gleamScore: number
  contributionScore: number
  createdAt: string
  updatedAt: string
}
type WorkersQuery = {workers: Worker[]}
type Stats = {
  totalWorkersCount: number
  idleRatio: string
  totalMinedReward: string
}

async function customizedFetch<T extends Record<string, unknown>>(
  url: string
): Promise<T> {
  const response = await fetch(url)
  const json = (await response.json()) as Record<string, unknown>
  return camelizeKeys(json) as T
}

const columns = [
  NumericalColumn({
    title: 'Rank',
    mapDataToValue: (data: Worker & {rank: number}) => data.rank,
  }),
  CustomColumn({
    title: 'Owner',
    mapDataToValue: ({ownerAddress}: Worker) => ownerAddress,
    sortable: false,
    renderCell: (props: {value: string}) => (
      <Block
        $style={{
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        <StyledLink
          href={`https://khala.subscan.io/account/${props.value}`}
          target="_blank"
          rel="noreferrer"
        >
          {trimAddress(props.value)}
        </StyledLink>
      </Block>
    ),
    textQueryFilter: function (textQuery: string, data: string) {
      return data.toLowerCase().includes(textQuery.toLowerCase())
    },
  }),
  StringColumn({
    title: 'Discord ID',
    mapDataToValue: (data: Worker) => data.discordId || '-',
    sortable: false,
  }),
  NumericalColumn({
    title: 'Pid',
    mapDataToValue: (data: Worker) => data.pid,
    sortable: false,
  }),
  NumericalColumn({
    title: 'Up-Time',
    mapDataToValue: (data: Worker) => data.idleBlocksCount,
  }),
  StringColumn({
    title: 'Up-Time Rate',
    mapDataToValue: (data: Worker) => `${data.idleRatio}%`,
  }),
  NumericalColumn({
    title: 'Contribution Score',
    mapDataToValue: (data: Worker) => data.contributionScore,
  }),
  StringColumn({
    title: 'State',
    mapDataToValue: ({state}: Worker) => {
      if (state === 'MiningIdle') return 'Mining'
      if (state === 'MiningUnresponsive') return 'Unresponsive'
      if (state === 'MiningCoolingDown') return 'CoolingDown'
      return state
    },
    sortable: false,
  }),
  NumericalColumn({
    title: 'Score',
    mapDataToValue: (data: Worker) => data.overallScore,
  }),
]

const StatCard: VFC<{
  value?: number
  label: string
  formatter?: (value: number) => string
}> = ({value, label, formatter}) => {
  const isLoading = value === undefined
  const valueRef = useRef<HTMLDivElement>()
  const x = useMotionValue(0)
  const formatterRef = useRef(formatter)
  useEffect(() => {
    formatterRef.current = formatter
  }, [formatter])
  useEffect(() => {
    if (typeof value === 'number') {
      const controls = animate(x, value, {
        duration: 0.8,
        onUpdate: (latest) => {
          if (valueRef.current) {
            valueRef.current.innerText = formatterRef.current
              ? formatterRef.current(latest)
              : latest.toString()
          }
        },
      })
      return controls.stop
    }
  }, [value, x])
  return (
    <Card
      overrides={{
        Root: {
          style: ({$theme}) => ({
            width: `calc(25% - ${$theme.sizing.scale300})`,
            borderRadius: 0,
            marginTop: $theme.sizing.scale600,
            ...$theme.borders.border200,
            [$theme.mediaQuery.large]: {
              width: `calc(50% - ${$theme.sizing.scale300})`,
            },
          }),
        },
      }}
    >
      <Block>
        {isLoading ? (
          <Skeleton animation height="32px" />
        ) : (
          <HeadingSmall as="div" ref={valueRef}></HeadingSmall>
        )}
        <span>{label}</span>
      </Block>
    </Card>
  )
}

export const EndGame: VFC = () => {
  const {data: workers, isLoading: isWorkersLoading} = useQuery(
    'end-game-workers',
    () =>
      customizedFetch<WorkersQuery>(
        'https://mining-game-api.phala.network/api/workers'
      ).then((res) => res.workers)
  )
  const {data: stats} = useQuery('end-game-stats', () =>
    customizedFetch<Stats>('https://mining-game-api.phala.network/api/stats')
  )

  const rows = useMemo(
    () =>
      workers?.map((worker, index) => ({
        id: worker.id,
        data: {...worker, rank: index + 1},
      })),
    [workers]
  )

  const locations = useMemo<number | undefined>(() => {
    if (workers) {
      const set = new Set()
      workers.forEach((worker) => {
        set.add(worker.city)
      })
      return set.size
    }
    return
  }, [workers])

  return (
    <>
      <Helmet title="End Game" />
      <Block paddingLeft="scale400" paddingRight="scale400">
        <Block
          paddingTop="scale1000"
          paddingBottom="scale1000"
          marginTop="scale600"
        >
          <HeadingLarge as="div">END GAME</HeadingLarge>
        </Block>

        <Block display="flex" flexWrap justifyContent="space-between">
          <StatCard
            value={stats?.totalWorkersCount}
            label="Total Miners"
            formatter={(value) => value.toFixed(0)}
          />
          <StatCard
            value={stats && Number(stats.idleRatio)}
            label="Participation Rate"
            formatter={(value) => `${value.toFixed(2)}%`}
          />
          <StatCard
            value={stats && Number(stats.totalMinedReward)}
            label="Total Mined"
            formatter={(value) => `${formatCurrency(value, 2)} PHA`}
          />
          <StatCard
            value={locations}
            label="Server Locations"
            formatter={(value) => value.toFixed(0)}
          />
        </Block>
        <Card
          overrides={{
            Root: {
              style: ({$theme}) => ({
                borderRadius: '0',
                ...$theme.borders.border200,
                marginTop: $theme.sizing.scale600,
              }),
            },
          }}
          title="Leaderboard"
        >
          <Block height="600px">
            <StatefulDataTable
              columns={columns}
              rows={rows || []}
              loading={isWorkersLoading}
            />
          </Block>
        </Card>
      </Block>
    </>
  )
}
