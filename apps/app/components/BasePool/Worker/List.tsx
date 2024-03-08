import WorkerIcon from '@/assets/worker.svg'
import Empty from '@/components/Empty'
import ListSkeleton from '@/components/ListSkeleton'
import PromiseButton from '@/components/PromiseButton'
import SectionHeader from '@/components/SectionHeader'
import useDebounced from '@/hooks/useDebounced'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import {
  type BasePoolCommonFragment,
  type WorkerOrderByInput,
  type WorkerState,
  type WorkersConnectionQuery,
  useReclaimableWorkersConnectionQuery,
  useWorkersConnectionQuery,
} from '@/lib/subsquidQuery'
import {subsquidClientAtom} from '@/store/common'
import Search from '@mui/icons-material/Search'
import {
  Button,
  Dialog,
  MenuItem,
  Pagination,
  Stack,
  TextField,
} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import type {SubmittableExtrinsic} from '@polkadot/api/types'
import type {ISubmittableResult} from '@polkadot/types/types'
import {keepPreviousData} from '@tanstack/react-query'
import {addDays} from 'date-fns'
import {useAtom} from 'jotai'
import {type FC, useCallback, useState} from 'react'
import AddWorker from './AddWorker'
import WorkerCard from './Card'
import ChangeStake from './ChangeStake'

const orderByEntries: Array<[string, WorkerOrderByInput]> = [
  ['Stake high to low', 'session_stake_DESC'],
  ['Stake low to high', 'session_stake_ASC'],
  ['V high to low', 'session_v_DESC'],
  ['V low to high', 'session_v_ASC'],
  ['Ve high to low', 'session_ve_DESC'],
  ['Ve low to high', 'session_ve_ASC'],
  ['P Instant high to low', 'session_pInstant_DESC'],
  ['P Instant low to high', 'session_pInstant_ASC'],
  ['P Initial high to low', 'session_pInit_DESC'],
  ['P Initial low to high', 'session_pInit_ASC'],
]

const stateEntries: Array<[string, WorkerState | 'All']> = [
  ['All states', 'All'],
  ['Ready', 'Ready'],
  ['Computing', 'WorkerIdle'],
  ['Unresponsive', 'WorkerUnresponsive'],
  ['CoolingDown', 'WorkerCoolingDown'],
]

export type Worker =
  WorkersConnectionQuery['workersConnection']['edges'][number]['node']

type WorkerAction = 'start' | 'stop' | 'remove' | 'changeStake' | 'reclaim'
export type WorkerDialogAction =
  | 'start'
  | 'changeStake'
  | 'reclaimAll'
  | 'addWorker'
export type OnAction = (worker: Worker, action: WorkerAction) => Promise<void>

const pageSize = 5

const WorkerList: FC<{basePool: BasePoolCommonFragment}> = ({basePool}) => {
  const [reclaimableDate] = useState(() =>
    addDays(new Date(), -7).toISOString(),
  )
  const [page, setPage] = useState(1)
  const [searchString, setSearchString] = useState('')
  const debouncedSearchString = useDebounced(searchString, 500)
  const [orderBy, setOrderBy] = useState<WorkerOrderByInput>('session_v_DESC')
  const [stateFilter, setStateFilter] = useState<WorkerState | 'All'>('All')
  const api = usePolkadotApi()
  const [account] = useAtom(polkadotAccountAtom)
  const signAndSend = useSignAndSend()
  const [subsquidClient] = useAtom(subsquidClientAtom)
  const {data, isLoading} = useWorkersConnectionQuery(
    subsquidClient,
    {
      after: page === 1 ? undefined : String((page - 1) * pageSize),
      orderBy,
      first: pageSize,
      where: {
        AND: [
          {stakePool: {id_eq: basePool.id}},
          ...(debouncedSearchString !== ''
            ? [{id_containsInsensitive: debouncedSearchString}]
            : []),
          ...(stateFilter !== 'All'
            ? [{session: {state_eq: stateFilter}}]
            : []),
        ],
      },
    },
    {placeholderData: keepPreviousData},
  )
  const {data: reclaimableData} = useReclaimableWorkersConnectionQuery(
    subsquidClient,
    {
      orderBy: 'session_coolingDownStartTime_ASC',
      where: {
        stakePool: {id_eq: basePool.id},
        session: {
          state_eq: 'WorkerCoolingDown',
          coolingDownStartTime_lte: reclaimableDate,
        },
      },
    },
  )
  const isOwner = account?.address === basePool.owner.id
  const isEmpty = data?.workersConnection.totalCount === 0
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogAction, setDialogAction] = useState<WorkerDialogAction>()
  const [operatingWorker, setOperatingWorker] = useState<Worker>()
  const onAction: OnAction = useCallback(
    async (worker, action) => {
      if (action === 'start' || action === 'changeStake') {
        setDialogOpen(true)
        setOperatingWorker(worker)
        setDialogAction(action)
        return
      }
      if (api == null || worker.stakePool == null) return
      const pid = worker.stakePool.id
      let extrinsic:
        | SubmittableExtrinsic<'promise', ISubmittableResult>
        | undefined
      if (action === 'reclaim') {
        extrinsic = api.tx.phalaStakePoolv2.reclaimPoolWorker(pid, worker.id)
      } else if (action === 'stop') {
        extrinsic = api.tx.phalaStakePoolv2.stopComputing(pid, worker.id)
      } else if (action === 'remove') {
        extrinsic = api.tx.phalaStakePoolv2.removeWorker(pid, worker.id)
      }

      if (extrinsic != null) {
        await signAndSend(extrinsic)
      }
    },
    [api, signAndSend],
  )

  const onClose = useCallback(() => {
    setDialogOpen(false)
  }, [])

  const reclaimAll = async (): Promise<void> => {
    if (api == null || reclaimableData == null) return
    const calls = reclaimableData.workersConnection.edges.map(({node}) =>
      api.tx.phalaStakePoolv2.reclaimPoolWorker(basePool.id, node.id),
    )
    await signAndSend(
      calls.length === 1 ? calls[0] : api.tx.utility.batch(calls),
    )
  }

  return (
    <>
      <SectionHeader title="Workers" icon={<WorkerIcon />}>
        <Stack spacing={2} direction="row" ml="auto" flexWrap="wrap">
          <TextField
            value={searchString}
            placeholder="Search"
            size="small"
            InputProps={{
              endAdornment: <Search />,
            }}
            onChange={(e) => {
              setSearchString(e.target.value)
              setPage(1)
            }}
          />
          <TextField
            size="small"
            select
            sx={{width: 180}}
            value={orderBy}
            onChange={(e) => {
              setOrderBy(e.target.value as WorkerOrderByInput)
              setPage(1)
            }}
          >
            {orderByEntries.map(([label, value]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            size="small"
            select
            sx={{width: 160}}
            value={stateFilter}
            onChange={(e) => {
              setStateFilter(e.target.value as WorkerState | 'All')
              setPage(1)
            }}
          >
            {stateEntries.map(([label, value]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          <PromiseButton
            sx={{flexShrink: 0}}
            onClick={reclaimAll}
            disabled={
              reclaimableData == null ||
              reclaimableData.workersConnection.edges.length === 0
            }
          >
            Reclaim All
          </PromiseButton>
          {isOwner && (
            <Button
              sx={{flexShrink: 0}}
              variant="contained"
              onClick={() => {
                setDialogOpen(true)
                setDialogAction('addWorker')
              }}
            >
              Add
            </Button>
          )}
        </Stack>
      </SectionHeader>
      <Stack spacing={2}>
        {isLoading ? (
          <ListSkeleton height={94} />
        ) : isEmpty ? (
          <Empty sx={{minHeight: 400}} />
        ) : (
          data?.workersConnection.edges.map(({node, cursor}) => (
            <WorkerCard
              key={cursor}
              worker={node}
              isOwner={isOwner}
              onAction={onAction}
            />
          ))
        )}
      </Stack>

      {data != null && !isEmpty && (
        <Stack alignItems="center" mt={3}>
          <Pagination
            color="primary"
            page={page}
            count={Math.ceil(data.workersConnection.totalCount / pageSize)}
            onChange={(_, newPage) => {
              setPage(newPage)
            }}
            showFirstButton
            showLastButton
          />
        </Stack>
      )}

      <Dialog open={dialogOpen} onClose={onClose}>
        {(dialogAction === 'start' || dialogAction === 'changeStake') && (
          <ChangeStake
            onClose={onClose}
            worker={operatingWorker}
            isChangeStake={dialogAction === 'changeStake'}
          />
        )}
        {dialogAction === 'addWorker' && (
          <AddWorker onClose={onClose} pid={basePool.id} />
        )}
      </Dialog>
    </>
  )
}

export default WorkerList
