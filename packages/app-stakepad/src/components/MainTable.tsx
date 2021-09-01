import {useMemo, useState} from 'react'
import {Column} from 'react-table'
import styled from 'styled-components'
import {Table} from '@phala/react-components'
import {StakePool, useStakePools} from '@phala/react-hooks'
import ContributeModal from './ContributeModal'
import ActionButton from './ActionButton'
import useFormat from '../hooks/useFormat'
import useModalVisible from '../hooks/useModalVisible'

const Wrapper = styled.div``

const MainTable = (): JSX.Element => {
  const [pid, setPid] = useState<number | null>(null)
  const format = useFormat()
  const {data, isFetching} = useStakePools()
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
    [format, open]
  )

  return (
    <Wrapper>
      <Table
        initialState={{pageSize: 20}}
        data={data || []}
        isLoading={isFetching}
        columns={columns}
      ></Table>

      {modalVisible.contribute && activeStakePool && (
        <ContributeModal
          stakePool={activeStakePool}
          onClose={() => close('contribute')}
        ></ContributeModal>
      )}
    </Wrapper>
  )
}

export default MainTable
