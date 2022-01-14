import {TableBuilder, TableBuilderColumn} from 'baseui/table-semantic'
import {StatefulPopover} from 'baseui/popover'
import {StatefulMenu} from 'baseui/menu'
import {useCallback, useState} from 'react'
// import {Info} from 'react-feather'
import {
  SortOrder,
  useWorkersQuery,
  Workers,
  WorkersOrderByWithRelationInput,
  // StakePoolsOrderByWithRelationInput,
} from '../../hooks/graphql'
import {client} from '../../utils/GraphQLClient'
import {isSSR, isTruthy, trimAddress} from '@phala/utils'
import PopoverButton from '../PopoverButton'
import {usePolkadotAccountAtom} from '@phala/app-store'
import Pagination from '../Pagination'
import {Modal} from 'baseui/modal'
import TableSkeleton from '../TableSkeleton'
import {StatefulTooltip, StatefulTooltipProps} from 'baseui/tooltip'
import {Info} from 'react-feather'
import {Block} from 'baseui/block'
import {tooltipContent} from './tooltipContent'
// import {StatefulTooltip, StatefulTooltipProps} from 'baseui/tooltip'
// import Decimal from 'decimal.js'
// import {Block} from 'baseui/block'

// FIXME: should be loadable, but meet some problems when configuring gatsby-plugin-loadable-components-ssr

type ModalKey = 'start' | 'stop' | 'remove' | 'reclaim'
type MenuItem = {label: string; key: ModalKey; disabled?: boolean}

const TooltipHeader = ({
  children,
  ...props
}: StatefulTooltipProps): JSX.Element => (
  <Block display="flex" alignItems="center">
    {children}
    <StatefulTooltip
      placement="bottomLeft"
      overrides={{Body: {style: {maxWidth: '400px'}}}}
      {...props}
    >
      <Info size={16} style={{marginLeft: 5}} />
    </StatefulTooltip>
  </Block>
)

const StakePoolTableV2 = (): JSX.Element => {
  const pageSize = 10
  const [polkadotAccount] = usePolkadotAccountAtom()
  const address = polkadotAccount?.address
  const [sortColumn, setSortColumn] =
    useState<keyof WorkersOrderByWithRelationInput>('publicKey')
  const [sortAsc, setSortAsc] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [openModalKey, setOpenModalKey] = useState<ModalKey | null>(null)
  const [operatingWorker, setOperatingWorker] = useState<Workers | null>(null)

  const {data, isLoading} = useWorkersQuery(
    client,
    {
      take: pageSize,
      skip: pageSize * (currentPage - 1),
      orderBy: {[sortColumn]: sortAsc ? SortOrder.Asc : SortOrder.Desc},
      where: {
        ...(process.env.NODE_ENV !== 'development' && {
          stakePools: {
            is: {
              ownerAddress: {
                equals: address,
              },
            },
          },
        }),
      },
    },
    {
      keepPreviousData: true,
      enabled: Boolean(address),
    }
  )

  const totalCount = data?.aggregateWorkers._count?._all ?? 0

  const onSort = (columnId: string): void => {
    if (sortColumn === columnId) {
      setSortAsc(!sortAsc)
    } else {
      setSortColumn(columnId as keyof WorkersOrderByWithRelationInput)
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
        <TableBuilder
          isLoading={isLoading}
          loadingMessage={<TableSkeleton />}
          data={data?.findManyWorkers || []}
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
          }}
        >
          <TableBuilderColumn id="publicKey" header="Public Key">
            {({publicKey}: Workers) => (
              <StatefulTooltip content={publicKey}>
                {trimAddress(publicKey)}
              </StatefulTooltip>
            )}
          </TableBuilderColumn>
          <TableBuilderColumn
            id="pid"
            header={
              <TooltipHeader content={tooltipContent.pid}>Pid</TooltipHeader>
            }
          >
            {({currentPid}: Workers) => currentPid}
          </TableBuilderColumn>
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
            {(worker: Workers) => {
              const allItems: (false | MenuItem)[] = [
                {label: 'Start', key: 'start'},
                {label: 'Stop', key: 'stop'},
                {label: 'Remove', key: 'remove'},
                {label: 'Reclaim', key: 'reclaim'},
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
                        setOperatingWorker(worker) // Pass object directly is Bad design
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
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={totalCount}
        pageSize={pageSize}
      />

      {!isSSR() && operatingWorker && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {/* TODO: add suspense wrapper here with loadable modal components */}
          {openModalKey}
        </Modal>
      )}
    </div>
  )
}

export default StakePoolTableV2
