import {useCurrentAccount} from '@phala/store'
import {formatCurrency, isSSR, isTruthy, toFixed} from '@phala/utils'
import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'
import {Button} from 'baseui/button'
import {Checkbox} from 'baseui/checkbox'
import {StatefulInput} from 'baseui/input'
import {StatefulMenu} from 'baseui/menu'
import {StatefulPopover} from 'baseui/popover'
import {Skeleton} from 'baseui/skeleton'
import {
  StyledTableBodyRow,
  TableBuilder,
  TableBuilderColumn,
} from 'baseui/table-semantic'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'
import {debounce} from 'lodash-es'
import {
  FC,
  ReactNode,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {AlertTriangle, Search} from 'react-feather'
import styled from 'styled-components'
import {StyletronProps} from 'styletron-react'
import {
  IdentityLevel,
  StakePoolEdge,
  StakePoolOrderByInput,
  StakePoolsConnectionQuery,
  useStakePoolsConnectionQuery,
} from '../../hooks/subsquid'
import useAprCoefficient from '../../hooks/useAprCoefficient'
import {subsquidClient} from '../../lib/graphqlClient'
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
  margin: -20px 0 12px -20px;

  /* gap polyfill */
  & > * {
    margin: 20px 0 0 20px;
    flex: none;
  }
`

type StakePoolsConnectionNode =
  StakePoolsConnectionQuery['stakePoolsConnection']['edges'][number]['node']
type MenuItem = {label: string; key: StakePoolModalKey; disabled?: boolean}
type MenuDivider = {divider: true; key: 'divider'}

const delegableValueAtom = atomWithStorage<string>(
  'jotai:delegate_delegable_filter_value',
  '100'
)

const delegatedValueAtom = atomWithStorage<string>(
  'jotai:delegate_delegated_filter_value',
  '10000'
)

const StakePoolTableV2: FC<{
  kind: 'delegate' | 'myDelegate' | 'mining'
}> = ({kind}) => {
  const [css] = useStyletron()
  const pageSize = kind === 'mining' ? 10 : 20
  const [polkadotAccount] = useCurrentAccount()
  const address = polkadotAccount?.address
  const [searchString, setSearchString] = useState('')
  const [sortColumn, setSortColumn] = useState<string>(
    kind === 'mining' ? 'Pid' : 'AprBase'
  )
  const [sortAsc, setSortAsc] = useState(kind === 'mining')
  const [currentPage, setCurrentPage] = useState(1)

  const [verifiedFilter, setVerifiedFilter] = useState(false)
  const [delegableFilter, setDelegableFilter] = useState(true)
  const [delegatedFilter, setDelegatedFilter] = useState(false)
  const [whitelistFilter, setWhitelistFilter] = useState(true)
  const [delegableValue, setDelegableValue] = useAtom(delegableValueAtom)
  const [delegatedValue, setDelegatedValue] = useAtom(delegatedValueAtom)
  const [stakePoolModalKey, setStakePoolModalKey] =
    useState<StakePoolModalKey | null>(null)
  const [operatingStakePoolId, setOperatingStakePoolId] = useState<
    string | null
  >(null)
  const aprCoefficient = useAprCoefficient()
  const {data, isInitialLoading} = useStakePoolsConnectionQuery(
    subsquidClient,
    {
      ...(address && {
        withStake: kind === 'myDelegate' || kind === 'mining',
        withWhitelist: true,
        accountId: address,
      }),
      first: pageSize,
      ...(currentPage !== 1 && {
        after: String(pageSize * (currentPage - 1)),
      }),
      orderBy:
        StakePoolOrderByInput[
          `${sortColumn}${
            sortAsc ? 'Asc' : 'Desc'
          }` as keyof typeof StakePoolOrderByInput
        ],
      where: {
        AND: [
          kind === 'mining' && {owner: {id_eq: address}},
          kind === 'delegate' && {
            AND: [
              searchString && {
                OR: [
                  {
                    owner: {
                      OR: [
                        {id_containsInsensitive: searchString},
                        {identityDisplay_containsInsensitive: searchString},
                      ],
                    },
                  },
                  {id_contains: searchString},
                ],
              },
              verifiedFilter && {
                owner: {
                  identityLevel_in: [
                    IdentityLevel.KnownGood,
                    IdentityLevel.Reasonable,
                  ],
                },
              },
              delegableFilter && {
                OR: [{delegable_gt: delegableValue}, {delegable_isNull: true}],
              },
              whitelistFilter && {
                OR: [
                  {whitelists_some: {id_eq: address}},
                  {whitelistEnabled_eq: false},
                ],
              },
              delegatedFilter && {totalStake_gt: delegatedValue},
            ].filter(isTruthy),
          },
          kind === 'myDelegate' && {
            stakes_some: {
              AND: [
                {account: {id_eq: address}},
                {OR: [{amount_gt: '0'}, {reward_gt: '0'}]},
              ],
            },
          },
        ].filter(isTruthy),
      },
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      enabled:
        !stakePoolModalKey &&
        (kind === 'delegate' ||
          Boolean(kind === 'mining' && address) ||
          Boolean(kind === 'myDelegate' && address)),
    }
  )

  const operatingStakePool = useMemo<
    StakePoolsConnectionNode | undefined
  >(() => {
    if (!operatingStakePoolId) return
    return data?.stakePoolsConnection.edges.find(
      ({node}) => node.id === operatingStakePoolId
    )?.node
  }, [operatingStakePoolId, data?.stakePoolsConnection.edges])

  const totalCount = data?.stakePoolsConnection.totalCount || 0

  const onSort = (columnId: string): void => {
    if (sortColumn === columnId) {
      setSortAsc(!sortAsc)
    } else {
      setSortColumn(columnId)
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetDelegatedValue = useCallback(
    debounce(setDelegatedValue, 500),
    []
  )

  const closeModal = useCallback(() => {
    setStakePoolModalKey(null)
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [
    polkadotAccount?.address,
    searchString,
    delegableFilter,
    whitelistFilter,
    delegableValue,
  ])

  return (
    <div>
      {kind === 'delegate' && (
        <TableHeader>
          <StatefulInput
            size="compact"
            clearable
            placeholder="Search Pid or Owner"
            onChange={(e) => debouncedSetSearchString(e.target.value)}
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
            checked={verifiedFilter}
            onChange={(e) => setVerifiedFilter(e.target.checked)}
          >
            {'Verified'}
          </Checkbox>
          <Checkbox
            checked={whitelistFilter}
            onChange={(e) => setWhitelistFilter(e.target.checked)}
          >
            <TooltipHeader content={tooltipContent.hideClosed}>
              Hide Closed
            </TooltipHeader>
          </Checkbox>
          <Block display="flex" alignItems="center">
            <Checkbox
              checked={delegableFilter}
              onChange={(e) => setDelegableFilter(e.target.checked)}
            >
              {'Delegable > '}
            </Checkbox>

            {!isSSR && (
              <StatefulInput
                overrides={{
                  Root: {
                    style: {width: '128px', marginLeft: '8px'},
                  },
                }}
                initialState={{value: delegableValue}}
                type="number"
                size="compact"
                onChange={(e) => {
                  const value = e.target.value
                  if (value) {
                    debouncedSetDelegableValue(value)
                  }
                }}
              />
            )}
          </Block>
          <Block display="flex" alignItems="center">
            <Checkbox
              checked={delegatedFilter}
              onChange={(e) => setDelegatedFilter(e.target.checked)}
            >
              {'Delegated > '}
            </Checkbox>

            {!isSSR && (
              <StatefulInput
                overrides={{
                  Root: {
                    style: {width: '128px', marginLeft: '8px'},
                  },
                }}
                initialState={{value: delegatedValue}}
                type="number"
                size="compact"
                onChange={(e) => {
                  const value = e.target.value
                  if (value) {
                    debouncedSetDelegatedValue(value)
                  }
                }}
              />
            )}
          </Block>
          {(verifiedFilter ||
            whitelistFilter ||
            delegableFilter ||
            delegatedFilter) && (
            <Block>
              <Button
                kind="secondary"
                size="mini"
                onClick={() => {
                  setVerifiedFilter(false)
                  setWhitelistFilter(false)
                  setDelegableFilter(false)
                  setDelegatedFilter(false)
                }}
              >
                Reset Filters
              </Button>
            </Block>
          )}
        </TableHeader>
      )}

      <TableBuilder
        isLoading={isInitialLoading}
        loadingMessage={<TableSkeleton />}
        data={data?.stakePoolsConnection.edges || []}
        sortColumn={sortColumn}
        sortOrder={sortAsc ? 'ASC' : 'DESC'}
        onSort={onSort}
        emptyMessage="No Results"
        overrides={{
          TableBodyCell: {
            style: {
              whiteSpace: 'nowrap',
              paddingRight: '12px',
              paddingLeft: '12px',
            },
          },
          TableHeadCell: {style: {paddingLeft: '12px', paddingRight: '12px'}},
          TableHeadCellSortable: {
            style: {
              paddingLeft: '12px',
              paddingRight: '32px',
              svg: {right: 'initial'},
            },
          },
          TableLoadingMessage: {style: {padding: '10px 0'}},
          TableBodyRow: {
            style: {cursor: 'pointer'},
            component: (
              props: {
                children: ReactNode
                $row: StakePoolEdge
              } & StyletronProps
            ) => {
              return (
                <StyledTableBodyRow
                  $style={props.$style}
                  onClick={(e: SyntheticEvent) => {
                    // Prevent navigating when clicking other elements
                    const tagName = (e.target as HTMLElement).tagName
                    if (tagName !== 'TR' && tagName !== 'TD') return
                    // Prevent navigating when selecting text
                    const selection = window.getSelection()
                    if (selection && selection.toString().length) return
                    window.open(`/stake-pool/${props.$row.node.pid}`)
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
          id="Pid"
          header={
            <TooltipHeader content={tooltipContent.pid}>Pid</TooltipHeader>
          }
          sortable
        >
          {({node: {pid}}: StakePoolEdge) => pid}
        </TableBuilderColumn>
        {kind === 'mining' && (
          <TableBuilderColumn id="WorkerCount" header="Worker" sortable>
            {({node: {workerCount}}: StakePoolEdge) => workerCount}
          </TableBuilderColumn>
        )}
        {kind !== 'mining' && (
          <TableBuilderColumn
            id="OwnerId"
            header={
              <TooltipHeader content={tooltipContent.owner}>
                Owner
              </TooltipHeader>
            }
            sortable
          >
            {({node}: StakePoolEdge) => <Owner account={node.owner} />}
          </TableBuilderColumn>
        )}
        {kind !== 'mining' && (
          <TableBuilderColumn
            id="AprBase"
            header={
              <TooltipHeader content={tooltipContent.apr}>APR</TooltipHeader>
            }
            sortable
          >
            {({node}: StakePoolEdge) =>
              aprCoefficient ? (
                `${toFixed(aprCoefficient.times(node.aprBase).times(100), 2)}%`
              ) : (
                <Skeleton animation />
              )
            }
          </TableBuilderColumn>
        )}
        <TableBuilderColumn
          id="Delegable"
          header={
            <TooltipHeader content={tooltipContent.delegable}>
              Delegable
            </TooltipHeader>
          }
          sortable
        >
          {({node}: StakePoolEdge) =>
            node.delegable ? `${formatCurrency(node.delegable)} PHA` : '∞'
          }
        </TableBuilderColumn>
        {kind !== 'myDelegate' && (
          <TableBuilderColumn
            id="Commission"
            header={
              <TooltipHeader content={tooltipContent.commission}>
                Commission
              </TooltipHeader>
            }
            sortable
          >
            {({node: {commission}}: StakePoolEdge) => {
              return commission
                ? `${new Decimal(commission).times(100)}%`
                : '0%'
            }}
          </TableBuilderColumn>
        )}
        {kind !== 'myDelegate' && (
          <TableBuilderColumn
            id="TotalStake"
            header={
              <TooltipHeader content={tooltipContent.delegated}>
                Delegated
              </TooltipHeader>
            }
            sortable
          >
            {({node}: StakePoolEdge) =>
              `${formatCurrency(node.totalStake)} PHA`
            }
          </TableBuilderColumn>
        )}
        <TableBuilderColumn
          id="FreeStake"
          header={
            <TooltipHeader content={tooltipContent.freeDelegation}>
              Free Delegation
            </TooltipHeader>
          }
          sortable
        >
          {({node}: StakePoolEdge) => `${formatCurrency(node.freeStake)} PHA`}
        </TableBuilderColumn>
        {kind === 'mining' && (
          <TableBuilderColumn
            id="ReleasingStake"
            header={
              <TooltipHeader content={tooltipContent.releasingStake}>
                Releasing Stake
              </TooltipHeader>
            }
            sortable
          >
            {({node}: StakePoolEdge) =>
              `${formatCurrency(node.releasingStake)} PHA`
            }
          </TableBuilderColumn>
        )}
        {kind === 'myDelegate' && (
          <TableBuilderColumn
            id="Amount"
            header={
              <TooltipHeader content={tooltipContent.yourDelegation}>
                My Delegation
              </TooltipHeader>
            }
          >
            {({node}: StakePoolEdge) =>
              `${formatCurrency(node.stakes[0].amount)} PHA`
            }
          </TableBuilderColumn>
        )}
        {kind === 'myDelegate' && (
          <TableBuilderColumn
            id="WithdrawalAmount"
            header={
              <TooltipHeader content={tooltipContent.yourWithdrawing}>
                My Withdrawing
              </TooltipHeader>
            }
          >
            {({node}: StakePoolEdge) => {
              return `${formatCurrency(node.stakes[0].withdrawalAmount)} PHA`
            }}
          </TableBuilderColumn>
        )}
        {kind === 'myDelegate' && (
          <TableBuilderColumn
            id="claimableReward"
            header={
              <TooltipHeader content={tooltipContent.claimableReward}>
                Reward
              </TooltipHeader>
            }
          >
            {({node}: StakePoolEdge) => {
              return `${formatCurrency(node.stakes[0].reward)} PHA`
            }}
          </TableBuilderColumn>
        )}

        {kind === 'mining' && (
          <TableBuilderColumn
            id="TotalWithdrawal"
            header="Total Withdrawal"
            sortable
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
            {({node}: StakePoolEdge) => (
              <Block display="flex" flexWrap={false} alignItems="center">
                <Block marginRight="scale400" flex="none">{`${formatCurrency(
                  node.totalWithdrawal
                )} PHA`}</Block>
                {node.totalWithdrawal !== '0' && (
                  <AlertTriangle
                    width={16}
                    className={css({flex: 'none'})}
                    color="#dea833"
                  />
                )}
              </Block>
            )}
          </TableBuilderColumn>
        )}
        <TableBuilderColumn
          id="Actions"
          overrides={{
            TableBodyCell: {
              style: {paddingTop: 0, paddingBottom: 0, verticalAlign: 'middle'},
            },
          }}
        >
          {({node}: StakePoolEdge) => {
            const isOwner = polkadotAccount?.address === node.owner.id
            const canDelegate = Boolean(
              polkadotAccount?.address &&
                (isOwner || !node.whitelistEnabled || node.whitelists?.length)
            )
            const stake = node.stakes?.[0]
            if (kind === 'delegate') {
              return (
                <Button
                  kind="secondary"
                  size="compact"
                  onClick={(e) => {
                    e.stopPropagation()
                    setStakePoolModalKey('delegate')
                    setOperatingStakePoolId(node.id)
                    close()
                  }}
                >
                  Delegate
                </Button>
              )
            }
            const miningMenuItems: MenuItem[] = [
              {label: 'Add Worker', key: 'addWorker'},
              {label: 'Set Cap', key: 'setCap'},
              {label: 'Set Commission', key: 'setCommission'},
              {label: 'Set Description', key: 'setDescription'},
            ]
            const commonMenuItems: MenuItem[] = [
              {
                label: canDelegate ? 'Delegate' : 'Delegate (Not in Whitelist)',
                key: 'delegate',
                disabled: !canDelegate,
              },
              {
                label: 'Claim Reward',
                key: 'claim',
                disabled: !stake || stake.reward === '0',
              },
              {
                label: 'Withdraw',
                key: 'withdraw',
                disabled: !stake || stake.amount === '0',
              },
              {label: 'Reclaim All Workers', key: 'reclaimAll'},
            ]
            let items: Array<MenuItem | MenuDivider> = commonMenuItems
            if (kind === 'mining') {
              items = [
                ...miningMenuItems,
                {divider: true, key: 'divider'},
                ...commonMenuItems,
              ]
            }

            return (
              <StatefulPopover
                placement="bottom"
                accessibilityType="menu"
                content={({close}) => (
                  <StatefulMenu
                    items={items}
                    onItemSelect={({item}: {item: MenuItem}) => {
                      setStakePoolModalKey(item.key)
                      setOperatingStakePoolId(node.id)
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
        stakePool={operatingStakePool}
        onClose={closeModal}
      />
    </div>
  )
}

export default StakePoolTableV2
