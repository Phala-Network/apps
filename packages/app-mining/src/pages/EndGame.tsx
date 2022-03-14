import {useEffect, useMemo, useRef, VFC} from 'react'
import {Card} from 'baseui/card'
import {Block} from 'baseui/block'
import {
  HeadingLarge,
  HeadingSmall,
  ParagraphSmall,
  ParagraphXSmall,
} from 'baseui/typography'
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
import {ButtonGroup} from 'baseui/button-group'
import {useMotionValue, animate} from 'framer-motion'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import {ComposableMap, Geographies, Geography, Marker} from 'react-simple-maps'
import {Button} from 'baseui/button'
import {ExternalLink} from 'react-feather'

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json'

const TableWrapper = styled(Block)`
  height: 960px;
  margin-top: -56px;

  div:first-child > div > div {
    justify-content: flex-end;
  }
`

const MapWrapper = styled(Block)`
  flex: 1;
  margin-top: 12px;
  margin-bottom: -12px;
  path:focus {
    outline: none;
  }
  rect {
    transform-origin: center;
    transform-box: fill-box;
  }
`

const StatWrapper = styled(Block)`
  margin-left: 12px;
  margin-top: 8px;
  width: 192px;

  > div + div {
    margin-top: 28px;
  }
`

const ButtonExternalLink = styled(ExternalLink)`
  margin-left: 8px;
`

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
  location: string
  registeredAt: string
  overallScore: number
  gleamScore: number
  contribution1Score: number
  contribution2Score: number
  createdAt: string
  updatedAt: string
  geo: {
    lat: number
    lng: number
  } | null
}
type WorkersQuery = {workers: Worker[]}
type Stats = {
  totalWorkersCount: number
  idleRatio: string
  totalMinedReward: string
}
type RowT = Worker & {discordLink: string | null; rank: number}

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
    mapDataToValue: (data: RowT) => data.rank,
  }),
  CustomColumn({
    title: 'Owner',
    mapDataToValue: ({ownerAddress, discordId}: RowT) =>
      `${ownerAddress}+${discordId}`,
    sortable: false,
    renderCell: (props: {value: string}) => {
      const [address, discordId] = props.value.split('+')
      return (
        <Block display="flex" alignItems="center">
          <StyledLink
            href={`https://khala.subscan.io/account/${address}`}
            target="_blank"
            rel="noreferrer"
            $style={{fontFamily: 'monospace'}}
          >
            {address && trimAddress(address)}
          </StyledLink>
          <ParagraphXSmall as="div" marginLeft="scale400">
            {discordId}
          </ParagraphXSmall>
        </Block>
      )
    },
    textQueryFilter: function (textQuery: string, data: string) {
      return data.toLowerCase().includes(textQuery.toLowerCase())
    },
  }),
  NumericalColumn({
    title: 'Pid',
    mapDataToValue: (data: RowT) => data.pid,
    sortable: false,
  }),
  StringColumn({
    title: 'State',
    mapDataToValue: ({state}: RowT) => {
      if (state === 'MiningIdle') return 'Mining'
      if (state === 'MiningUnresponsive') return 'Unresponsive'
      if (state === 'MiningCoolingDown') return 'CoolingDown'
      return state || '-'
    },
    sortable: false,
    searchable: false,
  }),
  StringColumn({
    title: 'Up-Time',
    mapDataToValue: (data: RowT) =>
      `${data.idleBlocksCount}(${data.idleRatio}%)`,
    searchable: false,
  }),
  NumericalColumn({
    title: 'Contribution',
    mapDataToValue: (data: RowT) =>
      data.contribution1Score + data.contribution2Score,
  }),

  NumericalColumn({
    title: 'Score',
    mapDataToValue: (data: RowT) => data.overallScore,
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
    <Block>
      {isLoading ? (
        <Skeleton animation height="32px" />
      ) : (
        <HeadingSmall as="div" ref={valueRef}></HeadingSmall>
      )}
      <ParagraphSmall as="div" color="contentTertiary">
        {label}
      </ParagraphSmall>
    </Block>
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

  const rows = useMemo<{id: number; data: RowT}[] | undefined>(
    () =>
      workers?.map((worker, index) => {
        const discordLink = worker.discordId
        const discordId = discordLink?.match(/#.+/)?.[0]?.slice(1) || null
        return {
          id: worker.id,
          data: {...worker, rank: index + 1, discordLink, discordId},
        }
      }),
    [workers]
  )

  const locations = useMemo<number | undefined>(() => {
    if (workers) {
      const set = new Set()
      workers.forEach((worker) => {
        if (worker.location) {
          set.add(worker.location)
        }
      })
      return set.size
    }
    return
  }, [workers])

  const markers = useMemo<
    {name: string; coordinates: [number, number]}[]
  >(() => {
    if (!workers) return []

    return workers.reduce<{name: string; coordinates: [number, number]}[]>(
      (acc, cur) => {
        if (!cur.geo || acc.find((x) => x.name === cur.location)) return acc

        acc.push({name: cur.location, coordinates: [cur.geo.lng, cur.geo.lat]})
        return acc
      },
      []
    )
  }, [workers])

  return (
    <>
      <Helmet title="END-GAME" />
      <Block paddingLeft="scale400" paddingRight="scale400">
        <Block
          paddingTop="scale1000"
          paddingBottom="scale1000"
          marginTop="scale400"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <HeadingLarge as="div">END-GAME</HeadingLarge>
          <ButtonGroup size="compact">
            <Button
              onClick={() =>
                window.open('https://gleam.io/5N19s/vendetta-1605-endgame')
              }
            >
              JOIN <ButtonExternalLink size={14} />
            </Button>
            <Button
              onClick={() =>
                window.open(
                  'https://medium.com/phala-network/vendetta-1605-end-game-official-setup-guide-2274d5fd4877'
                )
              }
            >
              LEARN <ButtonExternalLink size={14} />
            </Button>
          </ButtonGroup>
        </Block>

        <Card
          overrides={{
            Root: {
              style: ({$theme}) => ({
                borderRadius: '0',
                ...$theme.borders.border200,
              }),
            },
            Body: {
              style: {
                display: 'flex',
              },
            },
          }}
        >
          <StatWrapper>
            <StatCard
              value={stats?.totalWorkersCount}
              label="Total Miners"
              formatter={(value) => value.toFixed(0)}
            />
            <StatCard
              value={stats && Number(stats.idleRatio)}
              label="Participation Rate"
              formatter={(value) => `${(value * 100).toFixed(2)}%`}
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
          </StatWrapper>

          <MapWrapper>
            <ComposableMap height={450} width={960}>
              <Geographies geography={geoUrl}>
                {({geographies}) =>
                  geographies
                    .filter((geo) => geo.properties.REGION_UN !== 'Antarctica')
                    .map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#bbb"
                        stroke="#bbb"
                      />
                    ))
                }
              </Geographies>

              {markers.map(({name, coordinates}) => (
                <Marker key={name} coordinates={coordinates}>
                  <rect
                    width="8"
                    height="8"
                    fill="none"
                    stroke="#cdfa50"
                    strokeWidth="0.5"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      additive="sum"
                      values="1;2.5;2.5"
                      keyTimes="0;0.6;1"
                      keySplines="0.2 0 0.8 1"
                      begin="0s"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      repeatCount="indefinite"
                      dur="1s"
                      values="1;0"
                      keyTimes="0;1"
                      keySplines="0.2 0 0.8 1"
                      calcMode="spline"
                      begin="0s"
                    ></animate>
                  </rect>

                  <rect width="8" height="8" fill="#cdfa50" />
                </Marker>
              ))}
            </ComposableMap>
          </MapWrapper>
        </Card>

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
          <TableWrapper>
            <StatefulDataTable
              filterable={false}
              columns={columns}
              rows={rows || []}
              loading={isWorkersLoading}
            />
          </TableWrapper>
        </Card>
      </Block>
    </>
  )
}
