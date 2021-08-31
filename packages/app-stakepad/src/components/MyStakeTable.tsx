import {useMemo} from 'react'
import {Column} from 'react-table'
import styled from 'styled-components'
import {Table} from '@phala/react-components'
import {usePolkadotAccountAtom} from '@phala/app-store'
import {StakePool, useStakePools, useUserStakeInfo} from '@phala/react-hooks'
import useFormat from '../hooks/useFormat'

const Wrapper = styled.div``

const MyStakeTable = (): JSX.Element => {
  const [polkadotAccount] = usePolkadotAccountAtom()
  const format = useFormat()
  const {data: stakePools, isFetching: isFetchingStakePools} = useStakePools()
  const {data: userStakeInfo, isFetching: isFetchingUserStakeInfo} =
    useUserStakeInfo(polkadotAccount?.address)

  const myStake = useMemo<StakePool[]>(() => {
    if (!stakePools || !userStakeInfo) return []
    const pids = userStakeInfo.map((info) => info.pid)
    return stakePools.filter((pool) => pids.includes(pool.pid))
  }, [stakePools, userStakeInfo])

  const columns = useMemo<Column<StakePool>[]>(
    () => [
      {Header: 'pid', accessor: 'pid'},
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
        data={myStake || []}
        isLoading={isFetchingStakePools || isFetchingUserStakeInfo}
        columns={columns}
      ></Table>
    </Wrapper>
  )
}

export default MyStakeTable
