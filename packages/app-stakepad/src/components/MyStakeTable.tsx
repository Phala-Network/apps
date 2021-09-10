import {useMemo, useState} from 'react'
import {Column} from 'react-table'
import Decimal from 'decimal.js'
import styled from 'styled-components'
import {usePolkadotAccountAtom} from '@phala/app-store'
import {Table} from '@phala/react-components'
import {StakePool, useStakePools, useUserStakeInfo} from '@phala/react-hooks'
import {toFixed} from '@phala/utils'
import useFormat from '../hooks/useFormat'
import useGetARP from '../hooks/useGetAPR'
import useModalVisible, {ModalKey} from '../hooks/useModalVisible'
import ActionButton from './ActionButton'
import ClaimModal from './ClaimModal'
import ContributeModal from './ContributeModal'
import WithdrawModal from './WithdrawModal'

const Wrapper = styled.div``

const modalEntries: [ModalKey, (props: StakePoolModalProps) => JSX.Element][] =
  [
    ['claim', ClaimModal],
    ['contribute', ContributeModal],
    ['withdraw', WithdrawModal],
  ]

const buttonEntries: [ModalKey, string][] = [
  ['claim', 'Claim'],
  ['contribute', 'Contribute'],
  ['withdraw', 'Withdraw'],
]

const MyStakeTable = (): JSX.Element => {
  const getAPR = useGetARP()
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

  const myStake = useMemo<StakePool[]>(() => {
    if (!stakePools || !userStakeInfo) return []
    return stakePools.filter((pool) => userStakeInfo[pool.pid])
  }, [stakePools, userStakeInfo])

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
        Header: 'Your Stake',
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
      {
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
        Header: 'Actions',
        disableSortBy: true,
        accessor: (stakePool) => {
          return buttonEntries.map(([modalKey, text]) => (
            <ActionButton
              size="small"
              key={modalKey}
              onClick={() => {
                setPid(stakePool.pid)
                open(modalKey)
              }}
            >
              {text}
            </ActionButton>
          ))
        },
      },
    ],
    [format, userStakeInfo, polkadotAccount?.address, open, getAPR]
  )

  return (
    <Wrapper>
      <Table
        initialState={{pageSize: 20}}
        data={myStake || []}
        autoResetPage={false}
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

export default MyStakeTable
