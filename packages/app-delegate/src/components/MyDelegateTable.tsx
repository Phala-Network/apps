import {usePolkadotAccountAtom} from '@phala/app-store'
import {Table} from '@phala/react-components'
import {
  StakePool,
  useIsMobile,
  useStakePools,
  useUserStakeInfo,
} from '@phala/react-hooks'
import {useTranslation} from '@phala/react-i18n'
import {abridgeString, toFixed} from '@phala/utils'
import Decimal from 'decimal.js'
import {useMemo, useState} from 'react'
import {Column} from 'react-table'
import styled from 'styled-components'
import useFormat from '../hooks/useFormat'
import useGetARP from '../hooks/useGetAPR'
import useIdentities from '../hooks/useIdentities'
import useModalVisible, {ModalKey} from '../hooks/useModalVisible'
import ClaimModal from './ClaimModal'
import DelegateModal from './DelegateModal'
import ItemMenu from './ItemMenu'
import WithdrawModal from './WithdrawModal'

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

const modalEntries: [ModalKey, (props: StakePoolModalProps) => JSX.Element][] =
  [
    ['claim', ClaimModal],
    ['delegate', DelegateModal],
    ['withdraw', WithdrawModal],
  ]

const MyDelegateTable = (): JSX.Element => {
  const {t} = useTranslation()
  const isMobile = useIsMobile()
  const identities = useIdentities()
  const {getAPR} = useGetARP()
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
    return stakePools.filter((pool) => {
      const poolUserStakeInfo = userStakeInfo[pool.pid]
      return poolUserStakeInfo
    })
  }, [stakePools, userStakeInfo])

  const columns = useMemo<Column<StakePool>[]>(() => {
    const columns: (Column<StakePool> | boolean)[] = [
      {
        name: 'pid',
        Header: 'pid',
        accessor: 'pid',
      },
      {
        name: 'Owner',
        Header: 'Owner',
        accessor: ({owner}) => {
          const display = identities?.[owner]?.display || abridgeString(owner)
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
        name: t('delegate.commission'),
        Header: 'Commission',
        accessor: (stakePool) =>
          `${toFixed(stakePool.payoutCommission.div(10 ** 4), 2)}%`,
      },
      // !isMobile && {
      //   name: 'Reward Proportion',
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
        name: 'APR',
        Header: 'APR',
        accessor: (stakePool) => {
          const APR = getAPR(stakePool)
          return APR ? `${toFixed(APR.mul(100), 2)}%` : '-'
        },
      },
      !isMobile && {
        name: t('delegate.free_delegation'),
        Header: 'Free Delegation',
        accessor: (stakePool) => format(stakePool.freeStake),
      },
      !isMobile && {
        name: t('delegate.releasing_stake'),
        Header: 'Releasing Stake',
        accessor: (stakePool) => format(stakePool.releasingStake),
      },
      !isMobile && {
        name: t('delegate.remaining'),
        Header: t('delegate.remaining'),
        accessor: (stakePool) =>
          stakePool.cap === null
            ? '∞'
            : format(stakePool.cap.sub(stakePool.totalStake)),
      },
      {
        name: t('delegate.your_delegated'),
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
        name: t('delegate.your_withdrawing'),
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
              .mul(stakePool.totalShares.div(stakePool.totalStake))
          ),
      },
      {
        name: t('delegate.claimable_rewards'),
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
        name: t('delegate.actions'),
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

    return columns.filter(Boolean) as Column<StakePool>[]
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
