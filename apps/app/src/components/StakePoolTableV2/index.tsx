import {useCurrentAccount} from '@phala/store'
import {formatCurrency, isTruthy, trimAddress} from '@phala/utils'
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
import {StyletronProps} from 'styletron-react'

import {
  StakePool,
  StakePoolEdge,
  StakePoolOrderByInput,
  useStakePoolsConnectionQuery,
} from '../../hooks/subsquid'
import useBlockHeightListener from '../../hooks/useBlockHeightListener'
import {subsquidClient} from '../../utils/GraphQLClient'
// import Owner from '../Owner'
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

const delegableValueAtom = atomWithStorage<string>(
  'jotai:delegate_delegable_filter_value',
  '100'
)

const StakePoolTableV2: FC<{
  kind: 'delegate' | 'mining'
}> = ({kind}) => {
  // const [currentTime] = useState(() => {
  //   const now = new Date()
  //   now.setSeconds(0)
  //   now.setMilliseconds(0)
  //   return now
  // })
  const [css] = useStyletron()
  const pageSize = kind === 'mining' ? 10 : 20
  const [polkadotAccount] = useCurrentAccount()
  const address = polkadotAccount?.address
  const [searchString, setSearchString] = useState('')
  const [sortColumn, setSortColumn] = useState<string>('Pid')
  const [sortAsc, setSortAsc] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  // const [verifiedFilter, setVerifiedFilter] = useState(false)
  const [delegableFilter, setDelegableFilter] = useState(kind === 'delegate')
  // const [whitelistFilter, setWhitelistFilter] = useState(kind === 'delegate')
  const [delegableValue, setDelegableValue] = useAtom(delegableValueAtom)

  const [stakePoolModalKey, setStakePoolModalKey] =
    useState<StakePoolModalKey | null>(null)
  const [operatingPool, setOperatingPool] = useState<StakePool | null>(null)

  const {data, isLoading, refetch} = useStakePoolsConnectionQuery(
    subsquidClient,
    {
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
        ...(kind === 'mining' && {owner: {id_eq: address}}),
        ...(kind === 'delegate' && {
          AND: [
            searchString && {
              OR: [
                {owner: {id_contains: searchString}},
                {id_contains: searchString},
              ],
            },
            delegableFilter && {
              OR: [{delegable_gt: delegableValue}, {delegable_isNull: true}],
            },
          ].filter(isTruthy),
        }),
      },
    },
    {
      keepPreviousData: true,
      enabled: kind === 'delegate' || Boolean(kind === 'mining' && address),
    }
  )

  useBlockHeightListener(refetch)

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

  const closeModal = useCallback(() => {
    setStakePoolModalKey(null)
  }, [])

  useEffect(() => {
    if (kind === 'mining') {
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
          {/* <Checkbox
            checked={verifiedFilter}
            onChange={(e) => setVerifiedFilter(e.target.checked)}
          >
            {'Verified'}
          </Checkbox> */}
          {/* <Checkbox
            checked={whitelistFilter}
            onChange={(e) => setWhitelistFilter(e.target.checked)}
          >
            <TooltipHeader content={tooltipContent.hideClosed}>
              Hide Closed
            </TooltipHeader>
          </Checkbox> */}
          <Block display="flex" alignItems="center">
            <Checkbox
              checked={delegableFilter}
              onChange={(e) => setDelegableFilter(e.target.checked)}
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
              onChange={(e) => {
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
        data={data?.stakePoolsConnection.edges || []}
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
                $row: StakePoolEdge
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
            id="owner"
            header={
              <TooltipHeader content={tooltipContent.owner}>
                Owner
              </TooltipHeader>
            }
          >
            {({node}: StakePoolEdge) => trimAddress(node.owner.id)}
          </TableBuilderColumn>
        )}
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
        <TableBuilderColumn
          id="TotalStake"
          header={
            <TooltipHeader content={tooltipContent.delegated}>
              Delegated
            </TooltipHeader>
          }
          sortable
        >
          {({node}: StakePoolEdge) => `${formatCurrency(node.totalStake)} PHA`}
        </TableBuilderColumn>
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
                    className={css({flex: 'none'})}
                    color="#dea833"
                  />
                )}
              </Block>
            )}
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
          {({node}: StakePoolEdge) => {
            const isOwner =
              Boolean(polkadotAccount?.address) &&
              polkadotAccount?.address === node.owner.id
            const allItems: (false | MenuItem)[] = [
              kind === 'mining' && {label: 'Add Worker', key: 'addWorker'},
              kind === 'mining' && {label: 'Set Cap', key: 'setCap'},
              kind === 'mining' && {
                label: 'Set Commission',
                key: 'setCommission',
              },
              kind === 'mining' && {
                label: 'Claim',
                key: 'claim',
              },
              {
                label: 'Delegate',
                key: 'delegate',
                // disabled:
                //   !polkadotAccount?.address ||
                //   (!isOwner &&
                //     Boolean(stakePool.stakePoolAllowedStakers.length) &&
                //     !stakePool.stakePoolAllowedStakers.find(
                //       ({userAddress}) => userAddress === polkadotAccount.address
                //     )),
              },
              kind === 'mining' && {
                label: 'Withdraw',
                key: 'withdraw',
                // disabled: !stakePool.stakePoolStakers?.length,
              },
              kind === 'mining' && {
                label: 'Reclaim All',
                key: 'reclaimAll',
                // disabled: !stakePool.miners?.length,
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
                      setOperatingPool(node) // Pass object directly is Bad design
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
