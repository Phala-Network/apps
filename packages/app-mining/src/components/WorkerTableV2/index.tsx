import {TableBuilder, TableBuilderColumn} from 'baseui/table-semantic'
import {StatefulPopover} from 'baseui/popover'
import {StatefulMenu} from 'baseui/menu'
import {useCallback, useState} from 'react'
// import {Info} from 'react-feather'
import {
  SortOrder,
  StakePools,
  useStakePoolsQuery,
  StakePoolsOrderByWithRelationInput,
} from '../../hooks/graphql'
import {client} from '../../utils/GraphQLClient'
import SpinnerWrapper from '../SpinnerWrapper'
import {isSSR, isTruthy} from '@phala/utils'
import PopoverButton from '../PopoverButton'
import {usePolkadotAccountAtom} from '@phala/app-store'
import Pagination from '../Pagination'
import {Modal} from 'baseui/modal'
// import {StatefulTooltip, StatefulTooltipProps} from 'baseui/tooltip'
// import Decimal from 'decimal.js'
// import {Block} from 'baseui/block'

// FIXME: should be loadable, but meet some problems when configuring gatsby-plugin-loadable-components-ssr

type ModalKey =
  | 'addWorker'
  | 'setCap'
  | 'claim'
  | 'delegate'
  | 'withdraw'
  | 'setCommission'
  | 'reclaimAll'
type MenuItem = {label: string; key: ModalKey}

// const TooltipHeader = ({
//   children,
//   ...props
// }: StatefulTooltipProps): JSX.Element => (
//   <Block display="flex" alignItems="center">
//     {children}
//     <StatefulTooltip
//       placement="bottomLeft"
//       overrides={{Body: {style: {maxWidth: '400px'}}}}
//       {...props}
//     >
//       <Info size={16} style={{marginLeft: 5}} />
//     </StatefulTooltip>
//   </Block>
// )

const StakePoolTableV2 = ({
  kind,
}: {
  kind: 'delegate' | 'myDelegate' | 'mining'
}): JSX.Element => {
  const pageSize = kind === 'mining' ? 10 : 20
  const [polkadotAccount] = usePolkadotAccountAtom()
  const address = polkadotAccount?.address
  const [sortColumn, setSortColumn] = useState<
    keyof StakePoolsOrderByWithRelationInput
  >(kind === 'mining' ? 'pid' : 'instantApr')
  const [sortAsc, setSortAsc] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [openModalKey, setOpenModalKey] = useState<ModalKey | null>(null)
  const [operatingPool, setOperatingPool] = useState<StakePools | null>(null)

  const {data, isFetching} = useStakePoolsQuery(
    client,
    {
      take: pageSize,
      withStakePoolStakers: kind === 'myDelegate',
      withStakePoolWithdrawals: kind === 'myDelegate',
      skip: pageSize * (currentPage - 1),
      orderBy: {[sortColumn]: sortAsc ? SortOrder.Asc : SortOrder.Desc},
    },
    {
      keepPreviousData: true,
      enabled: Boolean(address),
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

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <div>
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
        </SpinnerWrapper>
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={totalCount}
        pageSize={pageSize}
      />

      {!isSSR() && operatingPool && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {/* TODO: add suspense wrapper here with loadable modal components */}
          {openModalKey}
        </Modal>
      )}
    </div>
  )
}

export default StakePoolTableV2
