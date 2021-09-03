import {usePolkadotAccountAtom} from '@phala/app-store'
import {useWorkers, Worker} from '@phala/react-hooks'
import {toFixed} from '@phala/utils'
import {useMemo, useState} from 'react'
import {Column} from 'react-table'
import useFormat from '../../hooks/useFormat'
import useModalVisible, {ModalKey} from '../../hooks/useModalVisible'
import useSelfStakePools from '../../hooks/useSelfStakePools'
import ConsoleTable from '../ConsoleTable'
import RemoveModal from './RemoveModal'
import StartModal from './StartModal'
import StopModal from './StopModal'
import WorkerActions from './WorkerActions'

type TableItem = Worker & {pid: number}

export type WorkerModalProps = {worker: TableItem; onClose: () => void}

const modalEntries: [ModalKey, (props: WorkerModalProps) => JSX.Element][] = [
  ['start', StartModal],
  ['stop', StopModal],
  ['remove', RemoveModal],
]

const WorkerTable = (): JSX.Element => {
  const {close, modalVisible} = useModalVisible()
  const [polkadotAccount] = usePolkadotAccountAtom()
  const {data} = useSelfStakePools()
  const workerList = useMemo<{pubkey: string; pid: number}[]>(() => {
    if (data?.length) {
      return data
        .filter(({owner}) => owner === polkadotAccount?.address)
        .map(({workers, pid}) => workers.map((pubkey) => ({pid, pubkey})))
        .flat()
    }
    return []
  }, [data, polkadotAccount?.address])

  const {
    data: workersData,
    refetch,
    isLoading,
  } = useWorkers(workerList.map(({pubkey}) => pubkey))

  const tableData = useMemo<TableItem[]>(() => {
    if (!workersData) return []
    return workerList.map((worker, index) =>
      Object.assign(worker, workersData[index])
    )
  }, [workersData, workerList])

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
      {Header: 'WorkerPublicKey', accessor: 'pubkey', disableSortBy: true},
      {Header: 'pid', accessor: 'pid'},
      {
        Header: 'Ve',
        accessor: (worker) =>
          worker.miner?.state === 'Ready' || !worker.miner?.ve
            ? '-'
            : toFixed(worker.miner.ve),
      },
      {
        Header: 'V',
        accessor: (worker) =>
          worker.miner?.state === 'Ready' || !worker.miner?.v
            ? '-'
            : toFixed(worker.miner.v),
      },
      {
        Header: 'P',
        accessor: (worker) =>
          worker.miner?.state === 'Ready' || !worker.miner?.benchmark.pInstant
            ? '-'
            : worker.miner.benchmark.pInstant,
      },
      {
        Header: 'state',
        accessor: (worker) => {
          const {state} = worker.miner
          if (state === 'MiningIdle') return 'Mining'
          if (state === 'MiningUnresponsive') return 'Unresponsive'
          if (state === 'MiningCoolingDown') return 'CoolingDown'
          return state
        },
      },
      {
        Header: 'Minted',
        accessor: (worker) => format(worker.miner?.stats.totalReward),
      },
      {
        Header: 'Stake',
        accessor: (worker) => format(worker.stake),
      },
      {
        Header: 'Actions',
        accessor: (worker) => (
          <WorkerActions
            setPubkey={setSelectedPubkey}
            worker={worker}
          ></WorkerActions>
        ),
        disableSortBy: true,
      },
    ],
    [format]
  )
  return (
    <>
      <ConsoleTable
        isLoading={isLoading}
        title="Worker"
        columns={columns}
        data={tableData}
      ></ConsoleTable>

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
