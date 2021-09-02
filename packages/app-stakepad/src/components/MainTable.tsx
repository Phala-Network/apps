import {useMemo, useState} from 'react'
import {Column} from 'react-table'
import styled from 'styled-components'
import {Table} from '@phala/react-components'
import {StakePool, useStakePools} from '@phala/react-hooks'
import {toFixed} from '@phala/utils'
import ContributeModal from './ContributeModal'
import ActionButton from './ActionButton'
import useFormat from '../hooks/useFormat'
import useModalVisible from '../hooks/useModalVisible'
import useGetARP from '../hooks/useGetAPR'

const Wrapper = styled.div``

const MainTable = (): JSX.Element => {
  const getAPR = useGetARP()
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
      {Header: 'pid', accessor: 'pid'},
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
        Header: 'Cap',
        accessor: (stakePool) =>
          stakePool.cap === null ? '∞' : format(stakePool.cap),
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
      <Table
        initialState={{pageSize: 20}}
        data={data || []}
        autoResetPage={false}
        isLoading={isFetching}
        columns={columns}
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
