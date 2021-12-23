import {TableBuilder, TableBuilderColumn} from 'baseui/table-semantic'
import {StatefulPopover} from 'baseui/popover'
import {StatefulMenu} from 'baseui/menu'
import {useCallback, useState} from 'react'
import {Search} from 'react-feather'
import {Checkbox} from 'baseui/checkbox'
import {
  SortOrder,
  StakePools,
  useStakePoolsQuery,
  StakePoolsOrderByWithRelationInput,
} from '../../hooks/graphql'
import {client} from '../../utils/GraphQLClient'
import {AddressCell, PercentCell, TokenCell} from './Cells'
import styled from 'styled-components'
import {StatefulInput} from 'baseui/input'
import {debounce} from 'lodash-es'
import SpinnerWrapper from '../SpinnerWrapper'
import {isSSR, isTruthy} from '@phala/utils'
import PopoverButton from '../PopoverButton'
import {usePolkadotAccountAtom} from '@phala/app-store'
import Pagination from '../Pagination'
import {Modal} from 'baseui/modal'

// FIXME: should be loadable, but meet some problems when configuring gatsby-plugin-loadable-components-ssr
import DelegateModalBody from './DelegateModalBody'
import ClaimModalBody from './ClaimModalBody'
import WithdrawModalBody from './WithdrawModalBody'

const SearchInput = styled.div`
  width: 420px;
`

const TableHeader = styled.div`
  display: flex;
  align-items: center;

  /* gap polyfill */
  & > *:not(:first-child) {
    margin-left: 20px;
    flex: none;
  }
`

type ModalKey =
  | 'addWorker'
  | 'setCap'
  | 'claim'
  | 'delegate'
  | 'withdraw'
  | 'setCommission'
  | 'reclaimAll'
type MenuItem = {label: string; key: ModalKey}
const PAGE_SIZE = 20

const StakePoolTableV2 = ({
  kind,
}: {
  kind: 'delegate' | 'myDelegate' | 'mining'
}): JSX.Element => {
  const [polkadotAccount] = usePolkadotAccountAtom()
  const address = polkadotAccount?.address
  const myDelegateAvailable: boolean = kind === 'myDelegate' && Boolean(address)
  const [searchString, setSearchString] = useState('')
  const [sortColumn, setSortColumn] =
    useState<keyof StakePoolsOrderByWithRelationInput>('apr')
  const [sortAsc, setSortAsc] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const [workersFilter, setWorkersFilter] = useState(kind === 'delegate')
  const [aprFilter, setAprFilter] = useState(false)
  const [commissionFilter, setCommissionFilter] = useState(kind === 'delegate')
  const [remainingFilter, setRemainingFilter] = useState(true)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [openModalKey, setOpenModalKey] = useState<ModalKey | null>(null)
  const [operatingPool, setOperatingPool] = useState<StakePools | null>(null)

  const {data, isFetching} = useStakePoolsQuery(
    client,
    {
      take: PAGE_SIZE,
      withStakePoolStakers: kind === 'myDelegate',
      skip: PAGE_SIZE * (currentPage - 1),
      orderBy: {[sortColumn]: sortAsc ? SortOrder.Asc : SortOrder.Desc},
      where: {
        ...(searchString && {
          OR: [
            /^\d+$/.test(searchString) && {pid: {equals: searchString}},
            {ownerAddress: {contains: searchString}},
          ].filter(isTruthy),
        }),
        AND: [
          workersFilter && {workersCount: {gt: 0}},
          aprFilter && {apr: {gt: '0'}},
          commissionFilter && {commission: {lt: '1'}},
          myDelegateAvailable && {
            stakePoolStakers: {
              some: {
                AND: [{address: {equals: address}}, {shares: {gt: '0'}}],
              },
            },
          },
          remainingFilter && {
            // remainingStake null means ∞
            OR: [{remainingStake: {gt: '0'}}, {remainingStake: {equals: null}}],
          },
        ].filter(isTruthy),
      },
      ...(myDelegateAvailable && {
        stakePoolStakersWhere: {
          address: {
            equals: address,
          },
        },
      }),
    },
    {
      keepPreviousData: true,
      enabled: kind !== 'myDelegate' || myDelegateAvailable,
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
    setIsModalOpen(false)
  }, [])

  return (
    <div>
      {kind === 'delegate' && (
        <TableHeader>
          <SearchInput>
            <StatefulInput
              clearable
              placeholder="Search Pid or Owner Address"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                debouncedSetSearchString(e.target.value)
              }
              endEnhancer={<Search size={18} />}
            />
          </SearchInput>
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

      <div>
        <SpinnerWrapper isLoading={isFetching}>
          <TableBuilder
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
            }}
          >
            <TableBuilderColumn id="pid" header="Pid" sortable>
              {(stakePool: StakePools) => stakePool.pid}
            </TableBuilderColumn>
            <TableBuilderColumn header="Owner">
              {(stakePool: StakePools) => (
                <AddressCell value={stakePool.ownerAddress} />
              )}
            </TableBuilderColumn>
            <TableBuilderColumn id="apr" header="APR" sortable>
              {(stakePool: StakePools) => <PercentCell value={stakePool.apr} />}
            </TableBuilderColumn>
            <TableBuilderColumn id="remainingStake" header="Remaining" sortable>
              {({remainingStake}: StakePools) =>
                remainingStake ? <TokenCell value={remainingStake} /> : '∞'
              }
            </TableBuilderColumn>
            <TableBuilderColumn id="commission" header="Commission" sortable>
              {(stakePool: StakePools) => (
                <PercentCell value={stakePool.commission} />
              )}
            </TableBuilderColumn>
            {kind !== 'myDelegate' && (
              <TableBuilderColumn id="totalStake" header="Delegated" sortable>
                {(stakePool: StakePools) => (
                  <TokenCell value={stakePool.totalStake} />
                )}
              </TableBuilderColumn>
            )}
            <TableBuilderColumn
              id="freeStake"
              header="Free Delegation"
              sortable
            >
              {(stakePool: StakePools) => (
                <TokenCell value={stakePool.freeStake} />
              )}
            </TableBuilderColumn>
            {kind === 'mining' && (
              <TableBuilderColumn
                id="releasingStake"
                header="Releasing Stake"
                sortable
              >
                {(stakePool: StakePools) => (
                  <TokenCell value={stakePool.releasingStake} />
                )}
              </TableBuilderColumn>
            )}
            {kind === 'mining' && (
              <TableBuilderColumn id="workersCount" header="Worker" sortable>
                {(stakePool: StakePools) => stakePool.workersCount}
              </TableBuilderColumn>
            )}
            {kind === 'myDelegate' && (
              <TableBuilderColumn id="yourDelegation" header="Your Delegation">
                {(stakePool: StakePools) => {
                  const value = stakePool.stakePoolStakers?.[0]?.stake
                  return value ? <TokenCell value={value} /> : '-'
                }}
              </TableBuilderColumn>
            )}
            {kind === 'myDelegate' && (
              <TableBuilderColumn
                id="yourWithdrawing"
                header="Your Withdrawing"
              >
                {/* TODO: add withdrawing when withdrawQueue is ready */}
                {() => '-'}
              </TableBuilderColumn>
            )}
            {kind === 'myDelegate' && (
              <TableBuilderColumn
                id="claimableRewards"
                header="Claimable Rewards"
              >
                {(stakePool: StakePools) => {
                  const value =
                    stakePool.stakePoolStakers?.[0]?.claimableRewards
                  return value ? <TokenCell value={value} /> : '-'
                }}
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
              {(stakePool: StakePools) => {
                const allItems: (false | MenuItem)[] = [
                  kind === 'myDelegate' && {label: 'Claim', key: 'claim'},
                  {label: 'Delegate', key: 'delegate'},
                  kind === 'myDelegate' && {label: 'Withdraw', key: 'withdraw'},
                ]

                return (
                  <StatefulPopover
                    placement="bottom"
                    accessibilityType="menu"
                    content={({close}) => (
                      <StatefulMenu
                        items={allItems.filter(isTruthy)}
                        onItemSelect={({item}: {item: MenuItem}) => {
                          setIsModalOpen(true)
                          setOpenModalKey(item.key)
                          setOperatingPool(stakePool)
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
        </SpinnerWrapper>
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={totalCount}
        pageSize={PAGE_SIZE}
      />

      {!isSSR() && operatingPool && (
        <Modal
          isOpen={isModalOpen}
          overrides={{
            Dialog: {
              style: {
                // Fix overrides mixing shorthand and longhand properties warnings
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              },
            },
          }}
          onClose={closeModal}
        >
          {/* TODO: add suspense wrapper here with loadable modal components */}
          {openModalKey === 'delegate' && (
            <DelegateModalBody stakePool={operatingPool} onClose={closeModal} />
          )}
          {openModalKey === 'claim' && (
            <ClaimModalBody stakePool={operatingPool} onClose={closeModal} />
          )}
          {openModalKey === 'withdraw' && (
            <WithdrawModalBody stakePool={operatingPool} onClose={closeModal} />
          )}
        </Modal>
      )}
    </div>
  )
}

export default StakePoolTableV2
