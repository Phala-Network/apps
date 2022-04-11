import {useMemo, useState} from 'react'
import type {Column} from 'react-table'
import Decimal from 'decimal.js'
import styled from 'styled-components'
import {useCurrentAccount} from '@phala/app-store'
import {Button, Table} from '@phala/react-components'
import {useIsMobile} from '@phala/react-hooks'
import {toFixed} from '@phala/utils'
import type {StakePoolModalProps} from '../StakePoolTable'
import useFormat from '../../hooks/useFormat'
import useGetARP from '../../hooks/useGetAPR'
import useStakePools, {StakePool} from '../../hooks/useStakePools'
import useUserStakeInfo from '../../hooks/useUserStakeInfo'
import useModalVisible, {ModalKey} from '../../hooks/useModalVisible'
import ItemMenu from '../ItemMenu'
import ClaimModal from '../ClaimModal'
import DelegateModal from '../DelegateModal'
import WithdrawModal from '../WithdrawModal'
import useIdentities from '../../hooks/useIdentities'
import {trimAddress} from '@phala/utils'
import ClaimAllModal from '../ClaimAllModal'

const Wrapper = styled.div`
  tbody {
    a {
      color: inherit;
      text-decoration: underline;
    }

    td:not(:last-child) {
      font-family: PT Mono, monospace;
    }
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const TableTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`

export type TableItem = StakePool & {
  claimableRewards: Decimal | null
}

const modalEntries: [ModalKey, (props: StakePoolModalProps) => JSX.Element][] =
  [
    ['claim', ClaimModal],
    ['delegate', DelegateModal],
    ['withdraw', WithdrawModal],
  ]

const MyDelegateTable = (): JSX.Element => {
  const isMobile = useIsMobile()
  const identities = useIdentities()
  const {getAPR} = useGetARP()
  const [pid, setPid] = useState<number | null>(null)
  const format = useFormat()
  const [polkadotAccount] = useCurrentAccount()
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

  const myDelegate = useMemo<TableItem[]>(() => {
    if (!stakePools || !userStakeInfo) return []
    return stakePools
      .filter((pool) => {
        const poolUserStakeInfo = userStakeInfo[pool.pid]
        return poolUserStakeInfo
      })
      .map((stakePool) => {
        const userStake = userStakeInfo?.[stakePool.pid]
        let claimableRewards = null

        if (userStake) {
          const {ownerReward, rewardAcc, owner} = stakePool
          const {shares, availableRewards, rewardDebt} = userStake
          const isOwner = owner === polkadotAccount?.address
          const pendingRewards = shares.mul(rewardAcc).sub(rewardDebt)
          claimableRewards = (isOwner ? ownerReward : new Decimal(0))
            .add(pendingRewards)
            .add(availableRewards)
        }
        return {
          ...stakePool,
          claimableRewards,
        }
      })
  }, [stakePools, userStakeInfo, polkadotAccount?.address])

  const columns = useMemo<Column<TableItem>[]>(() => {
    const columns: (Column<TableItem> | boolean)[] = [
      {Header: 'pid', accessor: 'pid'},
      {
        Header: 'Owner',
        accessor: ({owner}) => {
          const display = identities?.[owner]?.display || trimAddress(owner)
          const verified = identities?.[owner]?.verified || false
          return (
            <span>
              <a
                href={`https://khala.subscan.io/account/${owner}`}
                target="_blank"
                rel="noreferrer"
              >
                {display}
              </a>
              {verified && ' ✅'}
            </span>
          )
        },
      },
      !isMobile && {
        Header: 'Commission',
        accessor: (stakePool) =>
          `${toFixed(stakePool.payoutCommission.div(10 ** 4), 2)}%`,
      },
      // !isMobile && {
      //   Header: 'Reward Proportion',
      //   accessor: (stakePool) => {
      //     const proportion = getProportion(stakePool)
      //     if (proportion) {
      //       return `${toFixed(proportion.mul(100), 2)}%`
      //     }
      //     return '-'
      //   },
      // },
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
        Header: 'Remaining',
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
            userStake.shares.mul(
              stakePool.totalStake.div(stakePool.totalShares)
            )
          )
        },
      },
      !isMobile && {
        Header: 'Your Withdrawing',
        accessor: (stakePool) =>
          format(
            (
              stakePool.withdrawQueue.find(
                (x) => x.user === polkadotAccount?.address
              )?.shares || new Decimal(0)
            ).mul(stakePool.totalShares.div(stakePool.totalStake))
          ),
      },
      {
        Header: 'Claimable Rewards',
        accessor: (stakePool) => format(stakePool.claimableRewards),
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
              onClick={(key) => {
                setPid(stakePool.pid)
                open(key as ModalKey)
              }}
            ></ItemMenu>
          )
        },
      },
    ]

    return columns.filter(Boolean) as Column<TableItem>[]
  }, [
    format,
    userStakeInfo,
    polkadotAccount?.address,
    open,
    getAPR,
    // getProportion,
    isMobile,
    identities,
  ])

  return (
    <Wrapper>
      <Header>
        <TableTitle>My Delegate</TableTitle>
        <Button size="small" type="primary" onClick={() => open('claimAll')}>
          Claim All
        </Button>
      </Header>
      <Table
        initialState={{pageSize: 20}}
        data={myDelegate}
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

      {modalVisible.claimAll && (
        <ClaimAllModal
          stakePools={myDelegate}
          onClose={() => {
            close('claimAll')
            refetchStakePools()
            refetchUserStakeInfo()
          }}
        ></ClaimAllModal>
      )}
    </Wrapper>
  )
}

export default MyDelegateTable
