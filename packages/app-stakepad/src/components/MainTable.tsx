import {useMemo} from 'react'
import {Column} from 'react-table'
import styled from 'styled-components'
import {Table} from '@phala/react-components'
import {StakePool, useStakePools} from '@phala/react-hooks'
import useFormat from '../hooks/useFormat'

const Wrapper = styled.div``

const MainTable = (): JSX.Element => {
  const format = useFormat()
  const {data, isFetching} = useStakePools()

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
    ],
    [format]
  )

  return (
    <Wrapper>
      <Table
        initialState={{pageSize: 20}}
        data={data || []}
        isLoading={isFetching}
        columns={columns}
      ></Table>
    </Wrapper>
  )
}

export default MainTable
