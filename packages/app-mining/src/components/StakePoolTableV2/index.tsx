import {
  StyledTableBodyRow,
  TableBuilder,
  TableBuilderColumn,
} from 'baseui/table-semantic'
import {StatefulPopover} from 'baseui/popover'
import {StatefulMenu} from 'baseui/menu'
import {ReactChildren, useCallback, useState, VFC} from 'react'
import {AlertTriangle, Search} from 'react-feather'
import {Checkbox} from 'baseui/checkbox'
import {
  SortOrder,
  StakePoolsQuery,
  QueryMode,
  useStakePoolsQuery,
  StakePoolsOrderByWithRelationInput,
} from '../../hooks/graphql'
import {client} from '../../utils/GraphQLClient'
import styled from 'styled-components'
import {StatefulInput} from 'baseui/input'
import {debounce} from 'lodash-es'
import {formatCurrency, isTruthy, toFixed} from '@phala/utils'
import PopoverButton from '../PopoverButton'
import {useCurrentAccount} from '@phala/app-store'
import Pagination from '../Pagination'
import {StatefulTooltip} from 'baseui/tooltip'
import {tooltipContent} from './tooltipContent'
import Decimal from 'decimal.js'
import TableSkeleton from '../TableSkeleton'
import Owner from '../Owner'
import StakePoolModal, {StakePoolModalKey} from '../StakePoolModal'
import TooltipHeader from '../../TooltipHeader'
import {$StyleProp} from 'styletron-react'

const TableHeader = styled.div`
  display: flex;
  align-items: center;

  /* gap polyfill */
  & > *:not(:first-child) {
    margin-left: 20px;
    flex: none;
  }
`

type MenuItem = {label: string; key: StakePoolModalKey; disabled?: boolean}
type StakePool = StakePoolsQuery['findManyStakePools'][number]

const StakePoolTableV2: VFC<{
  kind: 'delegate' | 'myDelegate' | 'mining'
}> = ({kind}) => {
  const [currentTime] = useState(() => {
    const now = new Date()
    now.setSeconds(0)
    now.setMilliseconds(0)
    return now.toISOString()
  })
  const pageSize = kind === 'mining' ? 10 : 20
  const [polkadotAccount] = useCurrentAccount()
  const address = polkadotAccount?.address
  const [searchString, setSearchString] = useState('')
  const [sortColumn, setSortColumn] = useState<
    keyof StakePoolsOrderByWithRelationInput
  >(kind === 'mining' ? 'pid' : 'theoreticalApr')
  const [sortAsc, setSortAsc] = useState(kind !== 'delegate')
  const [currentPage, setCurrentPage] = useState(1)

  const [workersFilter, setWorkersFilter] = useState(kind === 'delegate')
  const [aprFilter, setAprFilter] = useState(false)
  const [commissionFilter, setCommissionFilter] = useState(kind === 'delegate')
  const [remainingFilter, setRemainingFilter] = useState(kind === 'delegate')

  const [stakePoolModalKey, setStakePoolModalKey] =
    useState<StakePoolModalKey | null>(null)
  const [operatingPool, setOperatingPool] = useState<StakePool | null>(null)

  const {data, isLoading} = useStakePoolsQuery(
    client,
    {
      take: pageSize,
      withStakePoolStakers: kind === 'myDelegate' || kind === 'mining',
      withStakePoolWithdrawals: kind === 'myDelegate' || kind === 'mining',
      withMiners: kind === 'myDelegate' || kind === 'mining',
      skip: pageSize * (currentPage - 1),
      orderBy: {[sortColumn]: sortAsc ? SortOrder.Asc : SortOrder.Desc},
      where: {
        ...(searchString && {
          OR: [
            /^\d+$/.test(searchString) && {pid: {equals: Number(searchString)}},
            {
              ownerAddress: {
                contains: searchString,
                mode: QueryMode.Insensitive,
              },
            },
            {
              accounts: {
                is: {
                  identity: {
                    contains: searchString,
                    mode: QueryMode.Insensitive,
                  },
                },
              },
            },
          ].filter(isTruthy),
        }),
        AND: [
          // For development
          process.env.NODE_ENV !== 'development' &&
            kind === 'mining' && {ownerAddress: {equals: address}},
          workersFilter && {minersCount: {gt: 0}},
          aprFilter && {theoreticalApr: {gt: '0'}},
          commissionFilter && {commission: {lt: '1'}},
          kind === 'myDelegate' && {
            stakePoolStakers: {
              some: {
                address: {equals: address},
                OR: [{claimableReward: {gt: '0'}}, {shares: {gt: '0'}}],
              },
            },
          },
          remainingFilter && {
            // remainingStake null means ∞
            OR: [
              {remainingStake: {gt: '0.01'}},
              {remainingStake: {equals: null}},
            ],
          },
        ].filter(isTruthy),
      },
      ...((kind === 'myDelegate' || kind === 'mining') && {
        stakePoolStakersWhere: {
          address: {
            equals: address,
          },
        },
        stakePoolWithdrawalsWhere: {
          userAddress: {
            equals: address,
          },
        },
        minersWhere: {
          estimatesReclaimableAt: {
            lte: currentTime,
          },
        },
      }),
    },
    {
      keepPreviousData: true,
      enabled: kind === 'delegate' || Boolean(polkadotAccount?.address),
    }
  )

  const totalCount = data?.aggregateStakePools._count?._all ?? 0

  const onSort = (columnId: string): void => {
    if (sortColumn === columnId) {
      setSortAsc(!sortAsc)
    } else {
      setSortColumn(columnId as keyof StakePoolsOrderByWithRelationInput)
      setSortAsc(true)
    }
    setCurrentPage(1)
  }

  const debouncedSetSearchString = useCallback(
    debounce(setSearchString, 500),
    []
  )

  const closeModal = useCallback(() => {
    setStakePoolModalKey(null)
  }, [])

  return (
    <div>
      {kind === 'delegate' && (
        <TableHeader>
          <StatefulInput
            size="compact"
            clearable
            placeholder="Search Pid or Owner Address"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              debouncedSetSearchString(e.target.value)
            }
            endEnhancer={<Search size={18} />}
            overrides={{
              Root: {
                style: {
                  width: '420px',
                },
              },
            }}
          />
          <Checkbox
            checked={workersFilter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setWorkersFilter(e.target.checked)
            }
          >
            Pool with workers
          </Checkbox>
          <Checkbox
            checked={aprFilter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAprFilter(e.target.checked)
            }
          >
            {'APR > 0%'}
          </Checkbox>
          <Checkbox
            checked={commissionFilter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCommissionFilter(e.target.checked)
            }
          >
            {'Commission < 100%'}
          </Checkbox>
          <Checkbox
            checked={remainingFilter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRemainingFilter(e.target.checked)
            }
          >
            {'Remaining > 0'}
          </Checkbox>
        </TableHeader>
      )}

      <TableBuilder
        isLoading={isLoading}
        loadingMessage={<TableSkeleton />}
        data={data?.findManyStakePools || []}
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
            component: (props: {
              $style: $StyleProp<any>
              children: ReactChildren
              $row: StakePool
            }) => {
              return (
                <StyledTableBodyRow
                  $style={props.$style}
                  onClick={(e: MouseEvent) => {
                    // Prevent navigating when clicking other elements
                    const tagName = (e.target as HTMLElement).tagName
                    if (tagName !== 'TR' && tagName !== 'TD') return
                    // Prevent navigating when selecting text
                    const selection = window.getSelection()
                    if (selection && selection.toString().length) return
                    window.open(`/stake-pool/${props.$row.pid}`)
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
          id="pid"
          header={
            <TooltipHeader content={tooltipContent.pid}>Pid</TooltipHeader>
          }
          sortable
        >
          {(stakePool: StakePool) => stakePool.pid}
        </TableBuilderColumn>
        {kind === 'mining' && (
          <TableBuilderColumn id="minersCount" header="Worker" sortable>
            {(stakePool: StakePool) => stakePool.minersCount}
          </TableBuilderColumn>
        )}
        {kind !== 'mining' && (
          <TableBuilderColumn
            id="owner"
            header={
              <TooltipHeader content={tooltipContent.owner}>
                Owner
              </TooltipHeader>
            }
          >
            {(stakePool: StakePool) => <Owner stakePool={stakePool} />}
          </TableBuilderColumn>
        )}
        {kind !== 'mining' && (
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
        )}
        <TableBuilderColumn
          id="remainingStake"
          header={
            <TooltipHeader content={tooltipContent.remaining}>
              Remaining
            </TooltipHeader>
          }
          sortable
        >
          {({remainingStake}: StakePool) =>
            remainingStake ? `${formatCurrency(remainingStake)} PHA` : '∞'
          }
        </TableBuilderColumn>
        {kind !== 'myDelegate' && (
          <TableBuilderColumn
            id="commission"
            header={
              <TooltipHeader content={tooltipContent.commission}>
                Commission
              </TooltipHeader>
            }
            sortable
          >
            {(stakePool: StakePool) =>
              `${new Decimal(stakePool.commission).times(100)}%`
            }
          </TableBuilderColumn>
        )}
        {kind !== 'myDelegate' && (
          <TableBuilderColumn
            id="totalStake"
            header={
              <TooltipHeader content={tooltipContent.delegated}>
                Delegated
              </TooltipHeader>
            }
            sortable
          >
            {(stakePool: StakePool) =>
              `${formatCurrency(stakePool.totalStake)} PHA`
            }
          </TableBuilderColumn>
        )}
        <TableBuilderColumn
          id="freeStake"
          header={
            <TooltipHeader content={tooltipContent.freeDelegation}>
              Free Delegation
            </TooltipHeader>
          }
          sortable
        >
          {(stakePool: StakePool) =>
            `${formatCurrency(stakePool.freeStake)} PHA`
          }
        </TableBuilderColumn>
        {kind === 'mining' && (
          <TableBuilderColumn
            id="releasingStake"
            header={
              <TooltipHeader content={tooltipContent.releasingStake}>
                Releasing Stake
              </TooltipHeader>
            }
            sortable
          >
            {(stakePool: StakePool) =>
              `${formatCurrency(stakePool.releasingStake)} PHA`
            }
          </TableBuilderColumn>
        )}
        {kind === 'myDelegate' && (
          <TableBuilderColumn
            id="yourDelegation"
            header={
              <TooltipHeader content={tooltipContent.yourDelegation}>
                Your Delegation
              </TooltipHeader>
            }
          >
            {(stakePool: StakePool) => {
              const value = stakePool.stakePoolStakers?.[0]?.stake
              return value ? `${formatCurrency(value)} PHA` : '-'
            }}
          </TableBuilderColumn>
        )}
        {kind === 'myDelegate' && (
          <TableBuilderColumn
            id="yourWithdrawing"
            header={
              <TooltipHeader content={tooltipContent.yourWithdrawing}>
                Your Withdrawing
              </TooltipHeader>
            }
          >
            {(stakePool: StakePool) => {
              const totalWithdrawal =
                stakePool.stakePoolWithdrawals?.reduce((acc, cur) => {
                  if (cur.userAddress === address) {
                    return acc.add(cur.stake)
                  }
                  return acc
                }, new Decimal(0)) || new Decimal(0)

              return `${formatCurrency(totalWithdrawal)} PHA`
            }}
          </TableBuilderColumn>
        )}
        {kind === 'myDelegate' && (
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
        )}
        {kind === 'mining' && (
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
                  <AlertTriangle />
                </StatefulTooltip>
              )
            }
          </TableBuilderColumn>
        )}
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
          {(stakePool: StakePool) => {
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
              {label: 'Delegate', key: 'delegate'},
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
        </TableBuilderColumn>
      </TableBuilder>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={totalCount}
        pageSize={pageSize}
      />

      <StakePoolModal
        modalKey={stakePoolModalKey}
        stakePool={operatingPool}
        onClose={closeModal}
      />
    </div>
  )
}

export default StakePoolTableV2
