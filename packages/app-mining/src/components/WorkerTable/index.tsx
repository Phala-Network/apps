import {useWorkers, Worker} from '@phala/react-hooks'
import {useTranslation} from '@phala/react-i18n'
import {toFixed} from '@phala/utils'
import {useMemo, useState} from 'react'
import {Column} from 'react-table'
import {toast} from 'react-toastify'
import useFormat from '../../hooks/useFormat'
import useMiningEnabled from '../../hooks/useMiningEnabled'
import useModalVisible, {ModalKey} from '../../hooks/useModalVisible'
import useSelfStakePools from '../../hooks/useSelfStakePools'
import ItemMenu from '../ItemMenu'
import MiningTable from '../MiningTable'
import RemoveModal from './RemoveModal'
import StartModal from './StartModal'
import StopModal from './StopModal'

type TableItem = Worker & {pid: number}

export type WorkerModalProps = {worker: TableItem; onClose: () => void}

const modalEntries: [ModalKey, (props: WorkerModalProps) => JSX.Element][] = [
  ['start', StartModal],
  ['stop', StopModal],
  ['remove', RemoveModal],
]

const WorkerTable = (): JSX.Element => {
  const {t} = useTranslation()
  const miningEnabled = useMiningEnabled()
  const {open, close, modalVisible} = useModalVisible()
  const {data} = useSelfStakePools()
  const workersPidMap = useMemo<Record<string, number>>(() => {
    if (data?.length) {
      return Object.fromEntries(
        data
          .map(({workers, pid}) => workers.map((pubkey) => [pubkey, pid]))
          .flat()
      )
    }
    return {}
  }, [data])

  const {
    data: workersData,
    refetch,
    isLoading,
  } = useWorkers(Object.keys(workersPidMap))

  const tableData = useMemo<TableItem[]>(() => {
    if (!workersData) return []
    return workersData.map((worker) =>
      Object.assign(worker, {pid: workersPidMap[worker.pubkey] as number})
    )
  }, [workersData, workersPidMap])

  const format = useFormat()

  const [selectedPubkey, setSelectedPubkey] = useState<string | null>(null)
  const selectedWorker = useMemo<TableItem | null>(
    () =>
      (tableData &&
        selectedPubkey !== null &&
        tableData.find(({pubkey}) => pubkey === selectedPubkey)) ||
      null,
    [tableData, selectedPubkey]
  )

  const columns = useMemo<Column<TableItem>[]>(
    () => [
      {
        name: 'WorkerPublicKey',
        Header: 'WorkerPublicKey',
        accessor: 'pubkey',
        disableSortBy: true,
      },
      {
        name: 'pid',
        Header: 'pid',
        accessor: 'pid',
      },
      {
        name: 'Ve',
        Header: 'Ve',
        accessor: (worker) =>
          worker.miner?.state === 'Ready' || !worker.miner?.ve
            ? '-'
            : toFixed(worker.miner.ve),
      },
      {
        name: 'V',
        Header: 'V',
        accessor: (worker) =>
          worker.miner?.state === 'Ready' || !worker.miner?.v
            ? '-'
            : toFixed(worker.miner.v),
      },
      {
        name: 'P Instant',
        Header: 'P Instant',
        accessor: (worker) =>
          worker.miner?.state === 'Ready' ||
          typeof worker.miner?.benchmark.pInstant !== 'number'
            ? '-'
            : worker.miner.benchmark.pInstant,
      },
      {
        name: 'P Initial',
        Header: 'P Initial',
        accessor: (worker) =>
          worker.miner?.state === 'Ready' ||
          typeof worker.miner?.benchmark.pInit !== 'number'
            ? '-'
            : worker.miner.benchmark.pInit,
      },
      {
        name: 'state',
        Header: 'state',
        accessor: (worker) => {
          const state = worker.miner?.state
          if (state === 'MiningIdle') return 'Mining'
          if (state === 'MiningUnresponsive') return 'Unresponsive'
          if (state === 'MiningCoolingDown') return 'CoolingDown'
          return state
        },
      },
      {
        name: 'Mined',
        Header: 'Mined',
        accessor: (worker) => format(worker.miner?.stats.totalReward),
      },
      {
        name: 'Stake',
        Header: 'Stake',
        accessor: (worker) => format(worker.stake),
      },
      {
        id: 'actions',
        name: t('delegate.actions'),
        accessor: (worker) => {
          const state = worker.miner?.state
          return (
            <ItemMenu
              items={[
                {key: 'start', item: 'Start', disabled: state !== 'Ready'},
                {
                  key: 'stop',
                  item: 'Stop',
                  disabled:
                    state !== 'MiningIdle' && state !== 'MiningUnresponsive',
                },
                {
                  key: 'remove',
                  item: 'Remove',
                  disabled: state !== 'Ready' && state !== 'MiningCoolingDown',
                },
              ]}
              onClick={(key) => {
                if (key === 'start' && miningEnabled === false) {
                  toast.warning('Mining feature not enabled, please wait.')
                  return
                }
                open(key)
                setSelectedPubkey(worker.pubkey)
              }}
            ></ItemMenu>
          )
        },
        disableSortBy: true,
      },
    ],
    [format, open, miningEnabled]
  )
  return (
    <>
      <MiningTable
        isLoading={isLoading}
        title="Worker"
        columns={columns}
        data={tableData}
      ></MiningTable>

      {selectedWorker &&
        modalEntries.map(
          ([modalKey, Modal]) =>
            modalVisible[modalKey] && (
              <Modal
                key={modalKey}
                worker={selectedWorker}
                onClose={() => {
                  refetch()
                  close(modalKey)
                  setSelectedPubkey(null)
                }}
              />
            )
        )}
    </>
  )
}

export default WorkerTable
