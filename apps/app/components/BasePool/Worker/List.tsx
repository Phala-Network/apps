import WorkerIcon from '@/assets/worker.svg'
import Empty from '@/components/Empty'
import ListSkeleton from '@/components/ListSkeleton'
import PromiseButton from '@/components/PromiseButton'
import SectionHeader from '@/components/SectionHeader'
import useDebounced from '@/hooks/useDebounced'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import {subsquidClient} from '@/lib/graphql'
import {
  BasePoolCommonFragment,
  useReclaimableWorkersConnectionQuery,
  useWorkersConnectionQuery,
  WorkerOrderByInput,
  WorkersConnectionQuery,
} from '@/lib/subsquidQuery'
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
import {addDays} from 'date-fns'
import {useAtom} from 'jotai'
import dynamic from 'next/dynamic'
import {FC, useCallback, useState} from 'react'
import WorkerCard from './Card'

const ChangeStake = dynamic(() => import('./ChangeStake'))
const AddWorker = dynamic(() => import('./AddWorker'))

const orderByEntries: [string, WorkerOrderByInput][] = [
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
    addDays(new Date(), -7).toISOString()
  )
  const [page, setPage] = useState(1)
  const [searchString, setSearchString] = useState('')
  const debouncedSearchString = useDebounced(searchString, 500)
  const [orderBy, setOrderBy] = useState<WorkerOrderByInput>('session_v_DESC')
  const api = usePolkadotApi()
  const [account] = useAtom(polkadotAccountAtom)
  const signAndSend = useSignAndSend()
  const {data, isLoading} = useWorkersConnectionQuery(
    subsquidClient,
    {
      after: page === 1 ? undefined : String((page - 1) * pageSize),
      orderBy: orderBy,
      first: pageSize,
      where: {
        AND: [
          {stakePool: {id_eq: basePool.id}},
          ...(debouncedSearchString
            ? [{id_containsInsensitive: debouncedSearchString}]
            : []),
        ],
      },
    },
    {keepPreviousData: true}
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
    }
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
      if (!api || !worker.stakePool) return
      const pid = worker.stakePool.id
      let extrinsic
      if (action === 'reclaim') {
        extrinsic = api.tx.phalaStakePoolv2.reclaimPoolWorker(pid, worker.id)
      } else if (action === 'stop') {
        extrinsic = api.tx.phalaStakePoolv2.stopComputing(pid, worker.id)
      } else if (action === 'remove') {
        extrinsic = api.tx.phalaStakePoolv2.removeWorker(pid, worker.id)
      }

      if (extrinsic) {
        return signAndSend(extrinsic)
      }
    },
    [api, signAndSend]
  )

  const onClose = useCallback(() => {
    setDialogOpen(false)
  }, [])

  const reclaimAll = async () => {
    if (!api || !reclaimableData) return
    const calls = reclaimableData.workersConnection.edges.map(({node}) =>
      api.tx.phalaStakePoolv2.reclaimPoolWorker(basePool.id, node.id)
    )
    return signAndSend(
      calls.length === 1 ? calls[0] : api.tx.utility.batch(calls)
    )
  }

  return (
    <>
      <SectionHeader title="Workers" icon={<WorkerIcon />}>
        <Stack spacing={2} direction="row" ml="auto">
          <TextField
            value={searchString}
            placeholder="Search"
            size="small"
            InputProps={{
              endAdornment: <Search />,
            }}
            onChange={(e) => setSearchString(e.target.value)}
          />
          <TextField
            size="small"
            select
            sx={{width: 180}}
            value={orderBy}
            onChange={(e) => {
              setOrderBy(e.target.value as WorkerOrderByInput)
            }}
          >
            {orderByEntries.map(([label, value]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          <PromiseButton
            onClick={reclaimAll}
            disabled={
              !reclaimableData ||
              reclaimableData.workersConnection.edges.length === 0
            }
          >
            Reclaim All
          </PromiseButton>
          {isOwner && (
            <Button
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

      {data && !isEmpty && (
        <Stack alignItems="center" mt={3}>
          <Pagination
            color="primary"
            page={page}
            count={Math.ceil(data.workersConnection.totalCount / pageSize)}
            onChange={(_, newPage) => setPage(newPage)}
            showFirstButton
            showLastButton
          />
        </Stack>
      )}

      <Dialog open={dialogOpen} onClose={onClose}>
        {dialogAction === 'start' ||
          (dialogAction === 'changeStake' && (
            <ChangeStake
              onClose={onClose}
              worker={operatingWorker}
              isChangeStake={dialogAction === 'changeStake'}
            />
          ))}
        {dialogAction === 'addWorker' && (
          <AddWorker onClose={onClose} pid={basePool.id} />
        )}
      </Dialog>
    </>
  )
}

export default WorkerList
