import {useCallback, useMemo, useState} from 'react'
import {Column} from 'react-table'
import styled from 'styled-components'
import {Input, Table, Checkbox} from '@phala/react-components'
import {StakePool, useStakePools} from '@phala/react-hooks'
import {toFixed} from '@phala/utils'
import {Row} from 'react-table'
import ContributeModal from './ContributeModal'
import ActionButton from './ActionButton'
import useFormat from '../hooks/useFormat'
import useModalVisible from '../hooks/useModalVisible'
import useGetARP from '../hooks/useGetAPR'

const Wrapper = styled.div``
const Filter = styled.div`
  display: flex;
  margin-bottom: 20px;

  & > *:first-child {
    width: 300px;
    flex-shrink: 1;
  }

  & > *:last-child {
    margin-left: 20px;
    flex: none;
  }
`

const MainTable = (): JSX.Element => {
  const {getAPR, getProportion} = useGetARP()
  const [filterPid, setFilterPid] = useState<string>('')
  const [showPoolWithWorkers, setShowPoolWithWorkers] = useState<boolean>(false)
  const [pid, setPid] = useState<number | null>(null)
  const format = useFormat()
  const {data, isFetching, refetch} = useStakePools()
  const {modalVisible, open, close} = useModalVisible()
  const activeStakePool = useMemo<StakePool | null>(
    () =>
      (data && typeof pid === 'number' && data.find((v) => v.pid === pid)) ||
      null,
    [data, pid]
  )

  const columns = useMemo<Column<StakePool>[]>(
    () => [
      {
        Header: 'pid',
        accessor: 'pid',
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
        Header: 'Proportion',
        accessor: (stakePool) => {
          const proportion = getProportion(stakePool)
          if (proportion) {
            return `${toFixed(proportion.mul(100), 2)}%`
          }
          return '-'
        },
      },
      {
        Header: 'APR',
        accessor: (stakePool) => {
          const APR = getAPR(stakePool)
          return APR ? `${toFixed(APR.mul(100), 2)}%` : '-'
        },
      },
      {
        Header: 'Total Stake',
        accessor: (stakePool) => format(stakePool.totalStake),
      },
      {
        Header: 'Free Stake',
        accessor: (stakePool) => format(stakePool.freeStake),
      },
      {
        Header: 'Releasing Stake',
        accessor: (stakePool) => format(stakePool.releasingStake),
      },
      {
        Header: 'Cap Gap',
        accessor: (stakePool) =>
          stakePool.cap === null
            ? '∞'
            : format(stakePool.cap.sub(stakePool.totalStake)),
      },
      {
        Header: 'Actions',
        disableSortBy: true,
        accessor: (stakePool) => (
          <>
            <ActionButton
              size="small"
              onClick={() => {
                setPid(stakePool.pid)
                open('contribute')
              }}
            >
              Contribute
            </ActionButton>
          </>
        ),
      },
    ],
    [format, open, getAPR]
  )

  return (
    <Wrapper>
      <Filter>
        <Input onChange={setFilterPid} placeholder="Search Pid"></Input>
        <Checkbox
          checked={showPoolWithWorkers}
          onChange={setShowPoolWithWorkers}
        >
          Pool with workers
        </Checkbox>
      </Filter>

      <Table
        autoResetFilters={false}
        autoResetGlobalFilter={false}
        initialState={{pageSize: 20}}
        data={data || []}
        autoResetPage={false}
        isLoading={isFetching}
        columns={columns}
        filters={[{id: 'pid', value: filterPid}]}
        globalFilterValue={showPoolWithWorkers}
        globalFilter={useCallback(
          (
            rows: Row<StakePool>[],
            columnIds: string[],
            globalFilterValue: boolean
          ) => {
            return globalFilterValue
              ? rows.filter((row) => row.original.workers.length > 0)
              : rows
          },
          []
        )}
      ></Table>

      {modalVisible.contribute && activeStakePool && (
        <ContributeModal
          stakePool={activeStakePool}
          onClose={() => {
            close('contribute')
            refetch()
          }}
        ></ContributeModal>
      )}
    </Wrapper>
  )
}

export default MainTable
