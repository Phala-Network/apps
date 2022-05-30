import {useCurrentAccount} from '@phala/store'
import {formatCurrency, isTruthy, toFixed} from '@phala/utils'
import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'
import {Checkbox} from 'baseui/checkbox'
import {StatefulInput} from 'baseui/input'
import {StatefulMenu} from 'baseui/menu'
import {StatefulPopover} from 'baseui/popover'
import {
  StyledTableBodyRow,
  TableBuilder,
  TableBuilderColumn,
} from 'baseui/table-semantic'
import {StatefulTooltip} from 'baseui/tooltip'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'
import {debounce} from 'lodash-es'
import {FC, ReactNode, useCallback, useEffect, useState} from 'react'
import {AlertTriangle, Search} from 'react-feather'
import styled from 'styled-components'
import {$StyleProp} from 'styletron-react'
import {
  QueryMode,
  SortOrder,
  StakePoolsOrderByWithRelationInput,
  StakePoolsQuery,
  useStakePoolsQuery,
} from '../../hooks/graphql'
import {client} from '../../utils/GraphQLClient'
import Owner from '../Owner'
import Pagination from '../Pagination'
import PopoverButton from '../PopoverButton'
import StakePoolModal, {StakePoolModalKey} from '../StakePoolModal'
import TableSkeleton from '../TableSkeleton'
import TooltipHeader from '../TooltipHeader'
import {tooltipContent} from './tooltipContent'

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: -20px 0 0 -20px;

  /* gap polyfill */
  & > * {
    margin: 20px 0 0 20px;
    flex: none;
  }
`

type MenuItem = {label: string; key: StakePoolModalKey; disabled?: boolean}
type StakePool = StakePoolsQuery['findManyStakePools'][number]

const delegableValueAtom = atomWithStorage<string>(
  'jotai:delegate_delegable_filter_value',
  '100'
)

const StakePoolTableV2: FC<{
  kind: 'delegate' | 'myDelegate' | 'mining'
}> = ({kind}) => {
  const [currentTime] = useState(() => {
    const now = new Date()
    now.setSeconds(0)
    now.setMilliseconds(0)
    return now
  })
  const [css] = useStyletron()
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
  const [verifiedFilter, setVerifiedFilter] = useState(false)
  const [delegableFilter, setDelegableFilter] = useState(kind === 'delegate')
  const [delegableValue, setDelegableValue] = useAtom(delegableValueAtom)

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
          delegableFilter && {
            OR: [
              {availableStake: {gt: delegableValue}},
              // availableStake null means ∞
              {availableStake: {equals: null}},
            ],
          },
          verifiedFilter && {
            accounts: {
              is: {
                identityVerified: {equals: true},
              },
            },
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
            lte: currentTime.toISOString(),
          },
        },
      }),
    },
    {
      refetchInterval: 60 * 10 * 1000,
      keepPreviousData: true,
      enabled:
        (kind === 'delegate' && Boolean(delegableValue)) ||
        ((kind === 'myDelegate' || kind === 'mining') &&
          Boolean(polkadotAccount?.address)),
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetSearchString = useCallback(
    debounce(setSearchString, 500),
    []
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetDelegableValue = useCallback(
    debounce(setDelegableValue, 500),
    []
  )

  const closeModal = useCallback(() => {
    setStakePoolModalKey(null)
  }, [])

  useEffect(() => {
    if (kind === 'mining' || kind === 'myDelegate') {
      setCurrentPage(1)
    }
  }, [polkadotAccount?.address, kind])

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
                  maxWidth: 'calc(100% - 20px)',
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
            checked={verifiedFilter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setVerifiedFilter(e.target.checked)
            }
          >
            {'Verified'}
          </Checkbox>
          <Block display="flex" alignItems="center">
            <Checkbox
              checked={delegableFilter}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDelegableFilter(e.target.checked)
              }
            >
              {'Delegable > '}
            </Checkbox>

            <StatefulInput
              overrides={{
                Root: {
                  style: {width: '128px', marginLeft: '8px'},
                },
              }}
              initialState={{value: delegableValue}}
              type="number"
              size="compact"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value
                if (value) {
                  debouncedSetDelegableValue(value)
                }
              }}
            />
          </Block>
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
              children: ReactNode
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
          id="availableStake"
          header={
            <TooltipHeader content={tooltipContent.delegable}>
              Delegable
            </TooltipHeader>
          }
          sortable
        >
          {({availableStake}: StakePool) =>
            availableStake ? `${formatCurrency(availableStake)} PHA` : '∞'
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
            {({commission, stakePoolStats}: StakePool) => {
              let showWarning = false
              if (stakePoolStats[0]) {
                const {commission, previousCommission, commissionUpdatedAt} =
                  stakePoolStats[0]
                if (
                  commission &&
                  previousCommission &&
                  new Decimal(commission).lt(previousCommission) &&
                  new Date(commissionUpdatedAt).getTime() >
                    currentTime.getTime() - 1000 * 60 * 60 * 24 * 3
                ) {
                  showWarning = true
                }
              }
              return (
                <Block display="flex" alignItems="center">
                  <span>{`${new Decimal(commission).times(100)}%`}</span>
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
                  <AlertTriangle color="#dea833" />
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
