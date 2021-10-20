import {Button} from '@phala/react-components'
import styled from 'styled-components'
import {toFixed} from '@phala/utils'
import {useMemo, useState} from 'react'
import {Column} from 'react-table'
import type {UseQueryResult} from 'react-query'
import type {StakePool} from '../../hooks/useStakePools'
import type {Worker} from '../../hooks/useWorkers'
import useFormat from '../../hooks/useFormat'
import useModalVisible, {ModalKey} from '../../hooks/useModalVisible'
import MiningTable from '../MiningTable'
import AddWorkerModal from './AddWorkerModal'
import ClaimModal from '../ClaimModal'
import DelegateModal from '../DelegateModal'
import CreateModal from '../CreateModal'
import SetCapModal from './SetCapModal'
import SetPayoutPrefModal from './SetPayoutPrefModal'
import StakeInfoModal from './StakeInfoModal'
import WithdrawModal from '../WithdrawModal'
import ItemMenu from '../ItemMenu'
import ReclaimAllModal from '../ReclaimAllModal'
import {canWorkerBeReclaimed} from '../../utils/canWorkerBeReclaimed'
import Decimal from 'decimal.js'

const Actions = styled.div`
  align-items: center;
  display: flex;
`
const DetailButton = styled.span`
  text-decoration: underline;
  cursor: pointer;
  font-weight: bold;
`

type TableItem = StakePool & {
  reclaimableWorkers?: string[]
  claimableRewards?: Decimal | null
}

export type StakePoolModalProps = {
  onClose: () => void
  stakePool: TableItem
  reclaimableWorkers?: Worker[]
}

const modalEntries: [ModalKey, (props: StakePoolModalProps) => JSX.Element][] =
  [
    ['claim', ClaimModal],
    ['delegate', DelegateModal],
    ['addWorker', AddWorkerModal],
    ['setCap', SetCapModal],
    ['setPayoutPref', SetPayoutPrefModal],
    ['stakeInfo', StakeInfoModal],
    ['withdraw', WithdrawModal],
    ['reclaimAll', ReclaimAllModal],
  ]

const StakePoolTable = ({
  workers,
  selfStakePools,
}: {
  workers: UseQueryResult<Worker[] | null>
  selfStakePools: UseQueryResult<StakePool[] | null>
}): JSX.Element => {
  const {modalVisible, open, close, visibleCount} = useModalVisible()
  const [selectedPid, setSelectedPid] = useState<number | null>(null)
  const {data, refetch, isLoading} = selfStakePools
  const {data: workersData} = workers
  const format = useFormat()
  const workerMap = useMemo<Record<string, Worker>>(() => {
    const map: Record<string, Worker> = {}
    workersData?.forEach((worker) => (map[worker.pubkey] = worker))
    return map
  }, [workersData])

  const tableData = useMemo<TableItem[]>(() => {
    if (!data) return []
    return data.map((stakePool) => ({
      ...stakePool,
      reclaimableWorkers: stakePool.workers.filter((pubkey) => {
        const worker = workerMap[pubkey]
        if (!worker) return false
        return canWorkerBeReclaimed(worker)
      }),
    }))
  }, [data, workerMap])

  const selectedStakePool = useMemo<TableItem | null>(
    () =>
      (tableData &&
        typeof selectedPid === 'number' &&
        tableData.find((v) => v.pid === selectedPid)) ||
      null,
    [tableData, selectedPid]
  )

  const selectedReclaimableWorkers = useMemo<Worker[]>(() => {
    if (!selectedStakePool) return []
    return (selectedStakePool.reclaimableWorkers
      ?.map((pubkey) => workerMap[pubkey])
      .filter(Boolean) || []) as Worker[]
  }, [selectedStakePool, workerMap])

  const columns = useMemo<Column<TableItem>[]>(
    () => [
      {
        Header: 'pid',
        accessor: (stakePool) => (
          <span style={{fontWeight: 'bold'}}>{stakePool.pid}</span>
        ),
      },
      {
        Header: 'Worker',
        accessor: (stakePool) => stakePool.workers.length,
      },
      {
        Header: 'Commission',
        accessor: (stakePool) =>
          `${toFixed(stakePool.payoutCommission.div(10 ** 4), 2)}%`,
      },
      {
        Header: 'Remaining',
        accessor: (stakePool) =>
          stakePool.cap === null
            ? '∞'
            : format(stakePool.cap.sub(stakePool.totalStake)),
      },
      {
        Header: 'Owner Reward',
        accessor: (stakePool) => format(stakePool.ownerReward),
      },
      {
        Header: 'Delegated',
        accessor: (stakePool) => format(stakePool.totalStake),
      },
      {
        Header: 'Free Delegation',
        accessor: (stakePool) => format(stakePool.freeStake),
      },
      {
        Header: 'Releasing Stake',
        accessor: (stakePool) => format(stakePool.releasingStake),
      },
      {
        id: 'actions',
        accessor: (stakePool) => {
          const items: {key: ModalKey; item: string; disabled?: boolean}[] = [
            {key: 'addWorker', item: 'Add Worker'},
            {key: 'setCap', item: 'Set Cap'},
            {key: 'claim', item: 'Claim'},
            {key: 'setPayoutPref', item: 'Set Commission'},
            {
              key: 'reclaimAll',
              item: 'Reclaim All',
              disabled: !stakePool.reclaimableWorkers?.length,
            },
          ]

          return (
            <Actions>
              <DetailButton
                onClick={() => {
                  setSelectedPid(stakePool.pid)
                  open('stakeInfo')
                }}
              >
                Info
              </DetailButton>
              <ItemMenu
                items={items}
                onClick={(key) => {
                  setSelectedPid(stakePool.pid)
                  open(key)
                }}
              ></ItemMenu>
            </Actions>
          )
        },
        disableSortBy: true,
      },
    ],
    [format, open]
  )
  return (
    <>
      <MiningTable
        title="Stakepool"
        header={
          <Button
            type="primary"
            size="small"
            style={{marginLeft: 10}}
            onClick={() => open('create')}
          >
            Create pool
          </Button>
        }
        columns={columns}
        data={tableData}
        isLoading={isLoading}
      ></MiningTable>

      {/* CreateModal is special */}
      {modalVisible.create && (
        <CreateModal
          onClose={() => {
            close('create')
            refetch()
          }}
        ></CreateModal>
      )}

      {selectedStakePool &&
        modalEntries.map(
          ([modalKey, Modal]) =>
            modalVisible[modalKey] && (
              <Modal
                {...(modalKey === 'reclaimAll' && {
                  reclaimableWorkers: selectedReclaimableWorkers,
                })}
                key={modalKey}
                stakePool={selectedStakePool}
                onClose={() => {
                  close(modalKey)
                  refetch()
                  // NOTE: if current modal is the last modal, reset selected pid
                  if (visibleCount <= 1) {
                    setSelectedPid(null)
                  }
                }}
              />
            )
        )}
    </>
  )
}

export default StakePoolTable
