import WorkerIcon from '@/assets/worker.svg'
import ListSkeleton from '@/components/ListSkeleton'
import Property from '@/components/Property'
import SectionHeader from '@/components/SectionHeader'
import {subsquidClient} from '@/lib/graphql'
import {
  BasePoolCommonFragment,
  useWorkersConnectionQuery,
  WorkerOrderByInput,
  WorkersConnectionQuery,
  WorkerState,
} from '@/lib/subsquidQuery'
import {
  Box,
  Button,
  Chip,
  Pagination,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {toCurrency, toFixed} from '@phala/util'
import {useAtom} from 'jotai'
import {FC, ReactNode, useMemo, useState} from 'react'

type Worker =
  WorkersConnectionQuery['workersConnection']['edges'][number]['node']

const workerStateColors: Record<WorkerState, string> = {
  Ready: '#5988FF',
  WorkerIdle: '#7EFF85',
  WorkerUnresponsive: '#FC5464',
  WorkerCoolingDown: '#FFDF64',
}

const workerStateLabels: Record<WorkerState, string> = {
  Ready: 'Ready',
  WorkerIdle: 'Computing',
  WorkerUnresponsive: 'Unresponsive',
  WorkerCoolingDown: 'CoolingDown',
}

const WorkerCard: FC<{worker: Worker; isOwner: boolean}> = ({
  worker,
  isOwner,
}) => {
  const theme = useTheme()
  const session = worker.session
  const entries = useMemo<[string, ReactNode][]>(() => {
    if (!session) return []
    return [
      ['Stake', `${toCurrency(session.stake)} PHA`],
      ['Reward', `${toCurrency(session.totalReward)} PHA`],
      ['V', toFixed(session.v, 2)],
      ['Ve', toFixed(session.ve, 2)],
      ['P Instant', session.pInstant],
      ['P Initial', session.pInit],
    ]
  }, [session])
  const groups = 3
  const count = Math.ceil(entries.length / groups)
  return (
    <Paper>
      <Stack direction="row" alignItems="center" p={2} spacing={2}>
        <Box color={theme.palette.text.secondary} width={48} flexShrink="0">
          <WorkerIcon css={{display: 'block'}} />
        </Box>
        <Box>
          <Typography
            color={theme.palette.primary.main}
            sx={{wordBreak: 'break-all'}}
          >
            {worker.id}
          </Typography>
          <Stack
            maxWidth={580}
            direction={{xs: 'column', sm: 'row'}}
            mt={1}
            spacing={{xs: 0.5, sm: 3}}
          >
            {Array.from({length: groups}).map((_, i) => (
              <Stack flex="1 0" spacing={0.5} key={i}>
                {entries
                  .slice(i * count, (i + 1) * count)
                  .map(([label, value]: [string, ReactNode]) => (
                    <Property label={label} size="small" key={label}>
                      {value}
                    </Property>
                  ))}
              </Stack>
            ))}
          </Stack>
        </Box>
        <Stack
          alignItems="flex-end"
          justifyContent="space-between"
          alignSelf="stretch"
          flex="1 0"
        >
          {session && (
            <Chip
              size="small"
              label={workerStateLabels[session.state]}
              sx={{color: workerStateColors[session.state]}}
            />
          )}
          {isOwner && session && (
            <Stack direction="row">
              {session.state === 'Ready' && (
                <>
                  <Button variant="text" size="small">
                    Start
                  </Button>
                  <Button variant="text" size="small">
                    Remove
                  </Button>
                </>
              )}
              {(session.state === 'WorkerIdle' ||
                session.state === 'WorkerUnresponsive') && (
                <>
                  <Button variant="text" size="small">
                    Stop
                  </Button>
                  <Button variant="text" size="small">
                    Change Stake
                  </Button>
                </>
              )}
              {session.state === 'WorkerCoolingDown' && (
                <Button variant="text" size="small">
                  Reclaim
                </Button>
              )}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Paper>
  )
}

const pageSize = 10

const WorkerList: FC<{basePool: BasePoolCommonFragment}> = ({basePool}) => {
  const [page, setPage] = useState(1)
  const [account] = useAtom(polkadotAccountAtom)
  const {data, isLoading} = useWorkersConnectionQuery(subsquidClient, {
    after: page === 1 ? undefined : String((page - 1) * pageSize),
    orderBy: WorkerOrderByInput.IdAsc,
    first: pageSize,
    where: {stakePool: {id_eq: basePool.id}},
  })
  const isOwner = account?.address === basePool.owner.id
  return (
    <>
      <SectionHeader title="Workers" icon={<WorkerIcon />}>
        <Stack spacing={2} direction="row" ml="auto">
          <Button>Reclaim All</Button>
          {isOwner && <Button variant="contained">Add</Button>}
        </Stack>
      </SectionHeader>
      <Stack>
        {isLoading ? (
          <ListSkeleton height={94} />
        ) : (
          data?.workersConnection.edges.map(({node, cursor}) => (
            <WorkerCard key={cursor} worker={node} isOwner={isOwner} />
          ))
        )}
      </Stack>

      {data?.workersConnection.totalCount && (
        <Stack alignItems="center" mt={3}>
          <Pagination
            page={page}
            count={Math.ceil(data.workersConnection.totalCount / pageSize)}
            onChange={(_, newPage) => setPage(newPage)}
            showFirstButton
            showLastButton
          />
        </Stack>
      )}
    </>
  )
}

export default WorkerList
