import {TableBuilder, TableBuilderColumn} from 'baseui/table-semantic'
import {StatefulPopover} from 'baseui/popover'
import {StatefulMenu} from 'baseui/menu'
import {useCallback, useState} from 'react'
import {Info} from 'react-feather'
import {
  SortOrder,
  useMinersQuery,
  Miners,
  MinersOrderByWithRelationInput,
} from '../../hooks/graphql'
import {client} from '../../utils/GraphQLClient'
import {
  formatCurrency,
  isSSR,
  isTruthy,
  toFixed,
  trimAddress,
} from '@phala/utils'
import PopoverButton from '../PopoverButton'
import {useCurrentAccount} from '@phala/app-store'
import Pagination from '../Pagination'
import {Modal, ModalProps} from 'baseui/modal'
import TableSkeleton from '../TableSkeleton'
import {StatefulTooltip, StatefulTooltipProps} from 'baseui/tooltip'
import {Block} from 'baseui/block'
import {tooltipContent} from './tooltipContent'
import Decimal from 'decimal.js'
import {isFuture} from 'date-fns'

// FIXME: should be loadable, but meet some problems when configuring gatsby-plugin-loadable-components-ssr
import StartModalBody from './StartModalBody'
import StopModalBody from './StopModalBody'
import RemoveModalBody from './RemoveModalBody'
import ReclaimModalBody from './ReclaimModalBody'
import ChangeStakeModalBody from './ChangeStakeModalBody'

type ModalKey = 'start' | 'changeStake' | 'stop' | 'remove' | 'reclaim'
type MenuItem = {label: string; key: ModalKey; disabled?: boolean}

const modalKeyMap: Readonly<
  Record<
    ModalKey,
    (
      props: {
        miner: Miners
      } & Pick<ModalProps, 'onClose'>
    ) => JSX.Element
  >
> = {
  start: StartModalBody,
  stop: StopModalBody,
  remove: RemoveModalBody,
  reclaim: ReclaimModalBody,
  changeStake: ChangeStakeModalBody,
}

const TooltipHeader = ({
  children,
  ...props
}: StatefulTooltipProps): JSX.Element => (
  <Block display="flex" alignItems="center">
    {children}
    <StatefulTooltip
      placement="bottomLeft"
      overrides={{Body: {style: {maxWidth: '400px', whiteSpace: 'pre-wrap'}}}}
      {...props}
    >
      <Info size={16} style={{marginLeft: 5}} />
    </StatefulTooltip>
  </Block>
)

const WorkerTableV2 = (): JSX.Element => {
  const pageSize = 10
  const [polkadotAccount] = useCurrentAccount()
  const address = polkadotAccount?.address
  const [sortColumn, setSortColumn] =
    useState<keyof MinersOrderByWithRelationInput>('pid')
  const [sortAsc, setSortAsc] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [openModalKey, setOpenModalKey] = useState<ModalKey | null>(null)
  const [operatingMiner, setOperatingMiner] = useState<Miners | null>(null)

  const {data, isLoading} = useMinersQuery(
    client,
    {
      take: pageSize,
      skip: pageSize * (currentPage - 1),
      orderBy: {[sortColumn]: sortAsc ? SortOrder.Asc : SortOrder.Desc},
      where: {
        active: {equals: true},
        current: {equals: true},
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

  const totalCount = data?.aggregateMiners._count?._all ?? 0

  const onSort = (columnId: string): void => {
    if (sortColumn === columnId) {
      setSortAsc(!sortAsc)
    } else {
      setSortColumn(columnId as keyof MinersOrderByWithRelationInput)
      setSortAsc(true)
    }
    setCurrentPage(1)
  }

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const ModalBody = openModalKey && modalKeyMap[openModalKey]

  return (
    <div>
      <div>
        <TableBuilder
          isLoading={isLoading}
          loadingMessage={<TableSkeleton />}
          data={data?.findManyMiners || []}
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
          <TableBuilderColumn id="workerPublicKey" header="Public Key">
            {({workerPublicKey}: Miners) => (
              <StatefulTooltip content={workerPublicKey}>
                {trimAddress(workerPublicKey)}
              </StatefulTooltip>
            )}
          </TableBuilderColumn>
          <TableBuilderColumn
            id="pid"
            header={
              <TooltipHeader content={tooltipContent.pid}>Pid</TooltipHeader>
            }
            sortable
          >
            {({pid}: Miners) => pid}
          </TableBuilderColumn>
          <TableBuilderColumn id="v" header="V" sortable>
            {({v}: Miners) => toFixed(new Decimal(v), 4)}
          </TableBuilderColumn>
          <TableBuilderColumn id="ve" header="Ve" sortable>
            {({ve}: Miners) => toFixed(new Decimal(ve), 4)}
          </TableBuilderColumn>
          <TableBuilderColumn id="pInstant" header="P Instant" sortable>
            {({pInstant}: Miners) => pInstant}
          </TableBuilderColumn>
          <TableBuilderColumn id="pInit" header="P Initial" sortable>
            {({pInit}: Miners) => pInit}
          </TableBuilderColumn>
          <TableBuilderColumn
            id="state"
            header={
              <TooltipHeader content={tooltipContent.state}>
                State
              </TooltipHeader>
            }
            sortable
          >
            {({state}: Miners) => {
              if (state === 'MiningIdle') return 'Mining'
              if (state === 'MiningUnresponsive') return 'Unresponsive'
              if (state === 'MiningCoolingDown') return 'CoolingDown'
              return state
            }}
          </TableBuilderColumn>
          <TableBuilderColumn
            id="totalReward"
            header={
              <TooltipHeader content={tooltipContent.mined}>
                Mined
              </TooltipHeader>
            }
            sortable
          >
            {({totalReward}: Miners) => `${formatCurrency(totalReward)} PHA`}
          </TableBuilderColumn>
          <TableBuilderColumn id="stake" header="Stake" sortable>
            {({stakes}: Miners) => `${formatCurrency(stakes)} PHA`}
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
            {(miner: Miners) => {
              const {state, estimatesReclaimableAt} = miner
              const allItems: (false | MenuItem)[] = [
                {
                  label: 'Start',
                  key: 'start',
                  disabled: state !== 'Ready',
                },
                {
                  label: 'Change Stake',
                  key: 'changeStake',
                  disabled:
                    state !== 'MiningIdle' && state !== 'MiningUnresponsive',
                },
                {
                  label: 'Stop',
                  key: 'stop',
                  disabled:
                    state !== 'MiningIdle' && state !== 'MiningUnresponsive',
                },
                {
                  label: 'Remove',
                  key: 'remove',
                  disabled: state !== 'Ready' && state !== 'MiningCoolingDown',
                },
                {
                  label: 'Reclaim',
                  key: 'reclaim',
                  disabled:
                    !estimatesReclaimableAt ||
                    isFuture(new Date(estimatesReclaimableAt)),
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
                        setIsModalOpen(true)
                        setOpenModalKey(item.key)
                        setOperatingMiner(miner) // Pass object directly is Bad design
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

      {!isSSR() && operatingMiner && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          overrides={{Dialog: {style: {borderRadius: 0}}}}
        >
          {/* TODO: add suspense wrapper here with loadable modal components */}
          {ModalBody && (
            <ModalBody miner={operatingMiner} onClose={closeModal} />
          )}
        </Modal>
      )}
    </div>
  )
}

export default WorkerTableV2
