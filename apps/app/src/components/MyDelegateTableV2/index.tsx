import {useCurrentAccount} from '@phala/store'
import {formatCurrency, trimAddress} from '@phala/utils'
import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'
// import {Checkbox} from 'baseui/checkbox'
// import {StatefulInput} from 'baseui/input'
// import {StatefulMenu} from 'baseui/menu'
// import {StatefulPopover} from 'baseui/popover'
import {
  StyledTableBodyRow,
  TableBuilder,
  TableBuilderColumn,
} from 'baseui/table-semantic'
import {StatefulTooltip} from 'baseui/tooltip'
import Decimal from 'decimal.js'
// import {useAtom} from 'jotai'
// import {atomWithStorage} from 'jotai/utils'
// import {debounce} from 'lodash-es'
import {FC, ReactNode, useEffect, useState} from 'react'
import {AlertTriangle} from 'react-feather'
import {StyletronProps} from 'styletron-react'

import {
  StakePoolStakeEdge,
  StakePoolStakeOrderByInput,
  useStakePoolStakesConnectionQuery,
} from '../../hooks/subsquid'
import useBlockHeightListener from '../../hooks/useBlockHeightListener'
import {subsquidClient} from '../../utils/GraphQLClient'
// import Owner from '../Owner'
import Pagination from '../Pagination'
// import PopoverButton from '../PopoverButton'
// import StakePoolModal, {StakePoolModalKey} from '../StakePoolModal'
import TableSkeleton from '../TableSkeleton'
import TooltipHeader from '../TooltipHeader'
import {tooltipContent} from './tooltipContent'

// type MenuItem = {label: string; key: StakePoolModalKey; disabled?: boolean}

// const delegableValueAtom = atomWithStorage<string>(
//   'jotai:delegate_delegable_filter_value',
//   '100'
// )

const MyDelegateTableV2: FC = () => {
  // const [currentTime] = useState(() => {
  //   const now = new Date()
  //   now.setSeconds(0)
  //   now.setMilliseconds(0)
  //   return now
  // })
  const [css] = useStyletron()
  const pageSize = 20
  const [polkadotAccount] = useCurrentAccount()
  const address = polkadotAccount?.address
  // const [searchString, setSearchString] = useState('')
  const [sortColumn, setSortColumn] = useState<string>('Amount')
  const [sortAsc, setSortAsc] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // const [verifiedFilter, setVerifiedFilter] = useState(false)
  // const [delegableFilter, setDelegableFilter] = useState(kind === 'delegate')
  // const [whitelistFilter, setWhitelistFilter] = useState(kind === 'delegate')
  // const [delegableValue, setDelegableValue] = useAtom(delegableValueAtom)

  // const [stakePoolModalKey, setStakePoolModalKey] =
  //   useState<StakePoolModalKey | null>(null)
  // const [operatingPool, setOperatingPool] = useState<StakePool | null>(null)

  const enabled = Boolean(address)
  const {data, isInitialLoading, refetch} = useStakePoolStakesConnectionQuery(
    subsquidClient,
    {
      first: pageSize,
      ...(currentPage !== 1 && {
        after: String(pageSize * (currentPage - 1)),
      }),
      orderBy:
        StakePoolStakeOrderByInput[
          `${sortColumn}${
            sortAsc ? 'Asc' : 'Desc'
          }` as keyof typeof StakePoolStakeOrderByInput
        ],
      where: {
        AND: [
          {account: {id_eq: address}},
          {OR: [{reward_gt: '0'}, {amount_gt: '0'}]},
        ],
      },
    },
    {
      keepPreviousData: true,
      enabled,
    }
  )

  useBlockHeightListener(() => {
    if (enabled) {
      refetch()
    }
  })

  const totalCount = data?.stakePoolStakesConnection.totalCount || 0

  const onSort = (columnId: string): void => {
    if (sortColumn === columnId) {
      setSortAsc(!sortAsc)
    } else {
      setSortColumn(columnId)
      setSortAsc(true)
    }
    setCurrentPage(1)
  }

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // const debouncedSetSearchString = useCallback(
  //   debounce(setSearchString, 500),
  //   []
  // )

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // const debouncedSetDelegableValue = useCallback(
  //   debounce(setDelegableValue, 500),
  //   []
  // )

  // const closeModal = useCallback(() => {
  //   setStakePoolModalKey(null)
  // }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [polkadotAccount?.address])

  return (
    <div>
      <TableBuilder
        isLoading={isInitialLoading}
        loadingMessage={<TableSkeleton />}
        data={data?.stakePoolStakesConnection.edges || []}
        sortColumn={sortColumn}
        sortOrder={sortAsc ? 'ASC' : 'DESC'}
        onSort={onSort}
        emptyMessage="No Results"
        overrides={{
          TableBodyCell: {
            style: {
              whiteSpace: 'nowrap',
            },
          },
          TableHeadCellSortable: {
            style: {
              svg: {
                right: 'initial',
              },
            },
          },
          TableLoadingMessage: {
            style: {
              padding: '10px 0',
            },
          },
          TableBodyRow: {
            style: {cursor: 'pointer'},
            component: (
              props: {
                children: ReactNode
                $row: StakePoolStakeEdge
              } & StyletronProps
            ) => {
              return (
                <StyledTableBodyRow
                  $style={props.$style}
                  onClick={(e: any) => {
                    // Prevent navigating when clicking other elements
                    const tagName = (e.target as HTMLElement).tagName
                    if (tagName !== 'TR' && tagName !== 'TD') return
                    // Prevent navigating when selecting text
                    const selection = window.getSelection()
                    if (selection && selection.toString().length) return
                    window.open(`/stake-pool/${props.$row.node.stakePool.pid}`)
                  }}
                >
                  {props.children}
                </StyledTableBodyRow>
              )
            },
          },
        }}
      >
        <TableBuilderColumn
          id="StakePoolPid"
          header={
            <TooltipHeader content={tooltipContent.pid}>Pid</TooltipHeader>
          }
          sortable
        >
          {({node: {stakePool}}: StakePoolStakeEdge) => stakePool.pid}
        </TableBuilderColumn>
        {/* <TableBuilderColumn id="StakePoolWorkerCount" header="Worker" sortable>
          {({node: {stakePool}}: StakePoolStakeEdge) => stakePool.workerCount}
        </TableBuilderColumn> */}
        <TableBuilderColumn
          id="owner"
          header={
            <TooltipHeader content={tooltipContent.owner}>Owner</TooltipHeader>
          }
        >
          {({node}: StakePoolStakeEdge) => trimAddress(node.stakePool.owner.id)}
        </TableBuilderColumn>
        {/* {kind !== 'mining' && (
          <TableBuilderColumn
            id="theoreticalApr"
            header={
              <TooltipHeader content={tooltipContent.apr}>APR</TooltipHeader>
            }
            sortable
          >
            {(stakePool: StakePool) =>
              `${toFixed(new Decimal(stakePool.theoreticalApr).times(100), 2)}%`
            }
          </TableBuilderColumn>
        )} */}
        <TableBuilderColumn
          id="StakePoolDelegable"
          header={
            <TooltipHeader content={tooltipContent.delegable}>
              Delegable
            </TooltipHeader>
          }
          sortable
        >
          {({node}: StakePoolStakeEdge) =>
            node.stakePool.delegable
              ? `${formatCurrency(node.stakePool.delegable)} PHA`
              : '∞'
          }
        </TableBuilderColumn>
        <TableBuilderColumn
          id="StakePoolCommission"
          header={
            <TooltipHeader content={tooltipContent.commission}>
              Commission
            </TooltipHeader>
          }
          sortable
        >
          {({
            node: {
              stakePool: {commission},
            },
          }: StakePoolStakeEdge) => {
            const showWarning = false
            // if (stakePoolStats[0]) {
            //   const {commission, previousCommission, commissionUpdatedAt} =
            //     stakePoolStats[0]
            //   if (
            //     commission &&
            //     previousCommission &&
            //     new Decimal(commission).lt(previousCommission) &&
            //     new Date(commissionUpdatedAt).getTime() >
            //       currentTime.getTime() - 1000 * 60 * 60 * 24 * 3
            //   ) {
            //     showWarning = true
            //   }
            // }
            return (
              <Block display="flex" alignItems="center">
                <span>
                  {commission ? `${new Decimal(commission).times(100)}%` : '0%'}
                </span>
                {showWarning && (
                  <StatefulTooltip
                    overrides={{Body: {style: {maxWidth: '400px'}}}}
                    content={tooltipContent.commissionWarning}
                  >
                    <AlertTriangle
                      color="#dea833"
                      size={16}
                      className={css({marginLeft: '4px'})}
                    />
                  </StatefulTooltip>
                )}
              </Block>
            )
          }}
        </TableBuilderColumn>
        {/* <TableBuilderColumn
          id="StakePoolTotalStake"
          header={
            <TooltipHeader content={tooltipContent.delegated}>
              Delegated
            </TooltipHeader>
          }
          sortable
        >
          {({node}: StakePoolStakeEdge) =>
            `${formatCurrency(node.stakePool.totalStake)} PHA`
          }
        </TableBuilderColumn> */}
        <TableBuilderColumn
          id="StakePoolFreeStake"
          header={
            <TooltipHeader content={tooltipContent.freeDelegation}>
              Free Delegation
            </TooltipHeader>
          }
          sortable
        >
          {({node}: StakePoolStakeEdge) =>
            `${formatCurrency(node.stakePool.freeStake)} PHA`
          }
        </TableBuilderColumn>
        <TableBuilderColumn
          id="StakePoolReleasingStake"
          header={
            <TooltipHeader content={tooltipContent.releasingStake}>
              Releasing Stake
            </TooltipHeader>
          }
          sortable
        >
          {({node}: StakePoolStakeEdge) =>
            `${formatCurrency(node.stakePool.releasingStake)} PHA`
          }
        </TableBuilderColumn>
        <TableBuilderColumn
          id="Amount"
          header={
            <TooltipHeader content={tooltipContent.yourDelegation}>
              Your Delegation
            </TooltipHeader>
          }
          sortable
        >
          {({node}: StakePoolStakeEdge) => `${formatCurrency(node.amount)} PHA`}
        </TableBuilderColumn>
        <TableBuilderColumn
          id="WithdrawalAmount"
          sortable
          header={
            <TooltipHeader content={tooltipContent.yourWithdrawing}>
              Your Withdrawing
            </TooltipHeader>
          }
        >
          {({node}: StakePoolStakeEdge) => {
            return `${formatCurrency(node.withdrawalAmount)} PHA`
          }}
        </TableBuilderColumn>
        {/* {kind === 'myDelegate' && (
          <TableBuilderColumn
            id="claimableReward"
            header={
              <TooltipHeader content={tooltipContent.claimableReward}>
                Claimable Rewards
              </TooltipHeader>
            }
          >
            {(stakePool: StakePool) => {
              const value = stakePool.stakePoolStakers?.[0]?.claimableReward
              return value ? `${formatCurrency(value)} PHA` : '-'
            }}
          </TableBuilderColumn>
        )} */}
        {/* {kind === 'mining' && (
          <TableBuilderColumn
            overrides={{
              TableBodyCell: {
                style: {
                  paddingTop: 0,
                  paddingBottom: 0,
                  verticalAlign: 'middle',
                },
              },
            }}
          >
            {(stakePool: StakePool) =>
              stakePool.withdrawalsCount > 0 && (
                <StatefulTooltip
                  overrides={{Body: {style: {maxWidth: '400px'}}}}
                  content="There is a withdrawal application in the StakePool, please supplement the delegation or stop workers to release the stake."
                >
                  <AlertTriangle color="#dea833" />
                </StatefulTooltip>
              )
            }
          </TableBuilderColumn>
        )} */}
        {/* <TableBuilderColumn
          overrides={{
            TableBodyCell: {
              style: {
                paddingTop: 0,
                paddingBottom: 0,
                verticalAlign: 'middle',
              },
            },
          }}
        >
          {(stakePool: StakePool) => {
            const isOwner =
              Boolean(polkadotAccount?.address) &&
              polkadotAccount?.address === stakePool.ownerAddress
            const allItems: (false | MenuItem)[] = [
              kind === 'mining' && {label: 'Add Worker', key: 'addWorker'},
              kind === 'mining' && {label: 'Set Cap', key: 'setCap'},
              kind === 'mining' && {
                label: 'Set Commission',
                key: 'setCommission',
              },
              (kind === 'myDelegate' || kind === 'mining') && {
                label: 'Claim',
                key: 'claim',
              },
              {
                label: 'Delegate',
                key: 'delegate',
                disabled:
                  !polkadotAccount?.address ||
                  (!isOwner &&
                    Boolean(stakePool.stakePoolAllowedStakers.length) &&
                    !stakePool.stakePoolAllowedStakers.find(
                      ({userAddress}) => userAddress === polkadotAccount.address
                    )),
              },
              (kind === 'myDelegate' || kind === 'mining') && {
                label: 'Withdraw',
                key: 'withdraw',
                disabled: !stakePool.stakePoolStakers?.length,
              },
              (kind === 'myDelegate' || kind === 'mining') && {
                label: 'Reclaim All',
                key: 'reclaimAll',
                disabled: !stakePool.miners?.length,
              },
              kind === 'mining' && {
                label: 'Set Description',
                key: 'setDescription',
                disabled: !isOwner,
              },
            ]

            return (
              <StatefulPopover
                placement="bottom"
                accessibilityType="menu"
                content={({close}) => (
                  <StatefulMenu
                    items={allItems.filter(isTruthy)}
                    onItemSelect={({item}: {item: MenuItem}) => {
                      setStakePoolModalKey(item.key)
                      setOperatingPool(stakePool) // Pass object directly is Bad design
                      close()
                    }}
                  />
                )}
              >
                <PopoverButton />
              </StatefulPopover>
            )
          }}
        </TableBuilderColumn> */}
      </TableBuilder>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={totalCount}
        pageSize={pageSize}
      />

      {/* <StakePoolModal
        modalKey={stakePoolModalKey}
        stakePool={operatingPool}
        onClose={closeModal}
      /> */}
    </div>
  )
}

export default MyDelegateTableV2
