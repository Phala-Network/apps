import {useMemo, useState} from 'react'
import {Column} from 'react-table'
import Decimal from 'decimal.js'
import styled from 'styled-components'
import {usePolkadotAccountAtom} from '@phala/app-store'
import {Table} from '@phala/react-components'
import {
  StakePool,
  useStakePools,
  useUserStakeInfo,
  useIsMobile,
} from '@phala/react-hooks'
import {toFixed} from '@phala/utils'
import useFormat from '../hooks/useFormat'
import useGetARP from '../hooks/useGetAPR'
import useModalVisible, {ModalKey} from '../hooks/useModalVisible'
import ItemMenu from './ItemMenu'
import ClaimModal from './ClaimModal'
import DelegateModal from './DelegateModal'
import WithdrawModal from './WithdrawModal'

const Wrapper = styled.div`
  tbody {
    td:not(:last-child) {
      font-family: PT Mono, monospace;
    }
  }
`

const modalEntries: [ModalKey, (props: StakePoolModalProps) => JSX.Element][] =
  [
    ['claim', ClaimModal],
    ['delegate', DelegateModal],
    ['withdraw', WithdrawModal],
  ]

const MyDelegateTable = (): JSX.Element => {
  const isMobile = useIsMobile()
  const {getAPR, getProportion} = useGetARP()
  const [pid, setPid] = useState<number | null>(null)
  const format = useFormat()
  const [polkadotAccount] = usePolkadotAccountAtom()
  const {modalVisible, open, close} = useModalVisible()
  const {
    data: stakePools,
    isFetching: isFetchingStakePools,
    refetch: refetchStakePools,
  } = useStakePools()
  const {
    data: userStakeInfo,
    isFetching: isFetchingUserStakeInfo,
    refetch: refetchUserStakeInfo,
  } = useUserStakeInfo(polkadotAccount?.address)
  const activeStakePool = useMemo<StakePool | null>(
    () =>
      (stakePools &&
        typeof pid === 'number' &&
        stakePools.find((v) => v.pid === pid)) ||
      null,
    [stakePools, pid]
  )

  const myDelegate = useMemo<StakePool[]>(() => {
    if (!stakePools || !userStakeInfo) return []
    return stakePools.filter((pool) => userStakeInfo[pool.pid])
  }, [stakePools, userStakeInfo])

  const columns = useMemo<Column<StakePool>[]>(() => {
    const columns: (Column<StakePool> | boolean)[] = [
      {Header: 'pid', accessor: 'pid'},
      !isMobile && {
        Header: 'Worker',
        accessor: (stakePool) => stakePool.workers.length,
      },
      !isMobile && {
        Header: 'Commission',
        accessor: (stakePool) =>
          `${toFixed(stakePool.payoutCommission.div(10 ** 4), 2)}%`,
      },
      !isMobile && {
        Header: 'Proportion',
        accessor: (stakePool) => {
          const proportion = getProportion(stakePool)
          if (proportion) {
            return `${toFixed(proportion.mul(100), 2)}%`
          }
          return '-'
        },
      },
      !isMobile && {
        Header: 'APR',
        accessor: (stakePool) => {
          const APR = getAPR(stakePool)
          return APR ? `${toFixed(APR.mul(100), 2)}%` : '-'
        },
      },
      !isMobile && {
        Header: 'Free Delegation',
        accessor: (stakePool) => format(stakePool.freeStake),
      },
      !isMobile && {
        Header: 'Releasing Stake',
        accessor: (stakePool) => format(stakePool.releasingStake),
      },
      !isMobile && {
        Header: 'Cap Gap',
        accessor: (stakePool) =>
          stakePool.cap === null
            ? '∞'
            : format(stakePool.cap.sub(stakePool.totalStake)),
      },
      {
        Header: 'Your Delegation',
        accessor: (stakePool) => {
          const userStake = userStakeInfo?.[stakePool.pid]
          if (!userStake) return '-'
          return format(
            userStake.shares
              .mul(stakePool.totalShares)
              .div(stakePool.totalStake)
          )
        },
      },
      !isMobile && {
        Header: 'Your Withdrawing',
        accessor: (stakePool) =>
          format(
            stakePool.withdrawQueue
              .reduce((acc, cur) => {
                if (cur.user === polkadotAccount?.address) {
                  return acc.add(cur.shares)
                }
                return acc
              }, new Decimal(0))
              .mul(stakePool.totalShares)
              .div(stakePool.totalStake)
          ),
      },
      {
        Header: 'Claimable Rewards',
        accessor: (stakePool) => {
          const userStake = userStakeInfo?.[stakePool.pid]
          if (!userStake) return '-'
          const {ownerReward, rewardAcc, owner} = stakePool
          const {shares, availableRewards, rewardDebt} = userStake
          const isOwner = owner === polkadotAccount?.address
          const pendingRewards = shares.mul(rewardAcc).sub(rewardDebt)
          return format(
            (isOwner ? ownerReward : new Decimal(0))
              .add(pendingRewards)
              .add(availableRewards)
          )
        },
      },
      {
        id: 'actions',
        disableSortBy: true,
        accessor: (stakePool) => {
          return (
            <ItemMenu
              items={[
                {key: 'claim', item: 'Claim'},
                {key: 'delegate', item: 'Delegate'},
                {key: 'withdraw', item: 'Withdraw'},
              ]}
              onSelect={(key) => {
                setPid(stakePool.pid)
                open(key as ModalKey)
              }}
            ></ItemMenu>
          )
        },
      },
    ]

    return columns.filter(Boolean) as Column<StakePool>[]
  }, [
    format,
    userStakeInfo,
    polkadotAccount?.address,
    open,
    getAPR,
    getProportion,
    isMobile,
  ])

  return (
    <Wrapper>
      <Table
        initialState={{pageSize: 20}}
        data={myDelegate || []}
        autoResetPage={false}
        autoResetSortBy={false}
        isLoading={isFetchingStakePools || isFetchingUserStakeInfo}
        columns={columns}
      ></Table>

      {activeStakePool &&
        modalEntries.map(
          ([modalKey, Modal]) =>
            modalVisible[modalKey] && (
              <Modal
                key={modalKey}
                stakePool={activeStakePool}
                onClose={() => {
                  close(modalKey)
                  refetchStakePools()
                  refetchUserStakeInfo()
                }}
              />
            )
        )}
    </Wrapper>
  )
}

export default MyDelegateTable
