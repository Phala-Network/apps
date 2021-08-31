import {usePolkadotAccountAtom} from '@phala/app-store'
import {isDev, toFixed} from '@phala/utils'
import {useMemo, useState} from 'react'
import {Column} from 'react-table'
import useFormat from '../../hooks/useFormat'
import useModalVisible, {ModalKey} from '../../hooks/useModalVisible'
import useStakePools from '../../hooks/useStakePools'
import useWorkers, {Worker} from '../../hooks/useWorkers'
import ConsoleTable from '../ConsoleTable'
import RemoveModal from './RemoveModal'
import StartModal from './StartModal'
import StopModal from './StopModal'
import WorkerActions from './WorkerActions'

export type WorkerModalProps = {worker: Worker; onClose: () => void}

const modalEntries: [ModalKey, (props: WorkerModalProps) => JSX.Element][] = [
  ['start', StartModal],
  ['stop', StopModal],
  ['remove', RemoveModal],
]

const WorkerTable = (): JSX.Element => {
  const {close, modalVisible} = useModalVisible()
  const [polkadotAccount] = usePolkadotAccountAtom()
  const {data} = useStakePools()
  const workerList = useMemo<{pubkey: string; pid: number}[]>(() => {
    if (data?.length) {
      return data
        .filter(({owner}) => isDev() || owner === polkadotAccount?.address)
        .map(({workers, pid}) => workers.map((pubkey) => ({pid, pubkey})))
        .flat()
    }
    return []
  }, [data, polkadotAccount?.address])

  const {data: workersData, refetch, isLoading} = useWorkers(workerList)
  const format = useFormat()

  const [selectedPubkey, setSelectedPubkey] = useState<string | null>(null)
  const selectedWorker = useMemo<Worker | null>(
    () =>
      (workersData &&
        selectedPubkey !== null &&
        workersData.find(({pubkey}) => pubkey === selectedPubkey)) ||
      null,
    [workersData, selectedPubkey]
  )

  const columns = useMemo<Column<Worker>[]>(
    () => [
      {Header: 'WorkerPublicKey', accessor: 'pubkey', disableSortBy: true},
      {Header: 'pid', accessor: 'pid'},
      {
        Header: 'Ve',
        accessor: (worker) =>
          worker.miner.state === 'Ready' ? '-' : toFixed(worker.miner.ve),
      },
      {
        Header: 'V',
        accessor: (worker) =>
          worker.miner.state === 'Ready' ? '-' : toFixed(worker.miner.v),
      },
      {
        Header: 'P',
        accessor: (worker) =>
          worker.miner.state === 'Ready'
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
        accessor: (worker) => format(worker.miner.stats.totalReward),
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
        data={workersData || []}
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
