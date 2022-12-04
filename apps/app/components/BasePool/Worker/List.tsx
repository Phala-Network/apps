import WorkerIcon from '@/assets/worker.svg'
import Empty from '@/components/Empty'
import ListSkeleton from '@/components/ListSkeleton'
import SectionHeader from '@/components/SectionHeader'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import {subsquidClient} from '@/lib/graphql'
import {
  BasePoolCommonFragment,
  useWorkersConnectionQuery,
  WorkerOrderByInput,
  WorkersConnectionQuery,
} from '@/lib/subsquidQuery'
import {Button, Dialog, Pagination, Stack} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {useAtom} from 'jotai'
import dynamic from 'next/dynamic'
import {FC, useCallback, useState} from 'react'
import WorkerCard from './Card'

const ChangeStake = dynamic(() => import('./ChangeStake'), {ssr: false})
const AddWorker = dynamic(() => import('./AddWorker'), {ssr: false})

export type Worker =
  WorkersConnectionQuery['workersConnection']['edges'][number]['node']

type WorkerAction = 'start' | 'stop' | 'remove' | 'changeStake' | 'reclaim'
export type WorkerDialogAction =
  | 'start'
  | 'changeStake'
  | 'reclaimAll'
  | 'addWorker'
export type OnAction = (worker: Worker, action: WorkerAction) => Promise<void>

const pageSize = 10

const WorkerList: FC<{basePool: BasePoolCommonFragment}> = ({basePool}) => {
  const [page, setPage] = useState(1)
  const api = usePolkadotApi()
  const [account] = useAtom(polkadotAccountAtom)
  const signAndSend = useSignAndSend()
  const {data, isLoading} = useWorkersConnectionQuery(subsquidClient, {
    after: page === 1 ? undefined : String((page - 1) * pageSize),
    orderBy: WorkerOrderByInput.IdAsc,
    first: pageSize,
    where: {stakePool: {id_eq: basePool.id}},
  })
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

  return (
    <>
      <SectionHeader title="Workers" icon={<WorkerIcon />}>
        <Stack spacing={2} direction="row" ml="auto">
          <Button disabled>Reclaim All</Button>
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
      <Stack>
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
