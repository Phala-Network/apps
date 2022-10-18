import {useCurrentAccount} from '@phala/store'
import {
  formatCurrency,
  // isSSR,
  // isTruthy,
  toFixed,
  trimAddress,
} from '@phala/utils'
import {useStyletron} from 'baseui'
// import {Block} from 'baseui/block'
// import {StatefulMenu} from 'baseui/menu'
// import {Modal, ModalProps} from 'baseui/modal'
// import {StatefulPopover} from 'baseui/popover'
import {TableBuilder, TableBuilderColumn} from 'baseui/table-semantic'
import {toaster} from 'baseui/toast'
import {StatefulTooltip} from 'baseui/tooltip'
// import {ParagraphXSmall} from 'baseui/typography'
// import {formatDuration, intervalToDuration, isAfter, isFuture} from 'date-fns'
import Decimal from 'decimal.js'
import {FC, useEffect, useState} from 'react'
import {
  useWorkersConnectionQuery,
  WorkerEdge,
  WorkerOrderByInput,
} from '../../hooks/subsquid'
import useBlockHeightListener from '../../hooks/useBlockHeightListener'
import {subsquidClient} from '../../utils/GraphQLClient'
import Pagination from '../Pagination'
// import PopoverButton from '../PopoverButton'
import TableSkeleton from '../TableSkeleton'
import TooltipHeader from '../TooltipHeader'
// import ChangeStakeModalBody from './ChangeStakeModalBody'
// import ReclaimModalBody from './ReclaimModalBody'
// import RemoveModalBody from './RemoveModalBody'
// FIXME: should be loadable, but meet some problems when configuring gatsby-plugin-loadable-components-ssr
// import StartModalBody from './StartModalBody'
// import StopModalBody from './StopModalBody'
import {tooltipContent} from './tooltipContent'

// type ModalKey = 'start' | 'changeStake' | 'stop' | 'remove' | 'reclaim'
// type MenuItem = {label: string; key: ModalKey; disabled?: boolean}

// const modalKeyMap: Readonly<
//   Record<
//     ModalKey,
//     (
//       props: {
//         miner: WorkerEdge
//       } & Pick<ModalProps, 'onClose'>
//     ) => JSX.Element
//   >
// > = {
//   start: StartModalBody,
//   stop: StopModalBody,
//   remove: RemoveModalBody,
//   reclaim: ReclaimModalBody,
//   changeStake: ChangeStakeModalBody,
// }

const WorkerTableV2: FC<{
  kind: 'stakePool' | 'mining'
  pid?: number
  // isOwner?: boolean
}> = ({
  kind,
  pid,
  // isOwner
}) => {
  const [css] = useStyletron()
  const pageSize = 10
  const [polkadotAccount] = useCurrentAccount()
  const address = polkadotAccount?.address
  const [sortColumn, setSortColumn] = useState<string>(
    kind === 'stakePool' ? 'MinerV' : 'StakePoolPid'
  )
  const [sortAsc, setSortAsc] = useState(kind === 'mining')
  const [currentPage, setCurrentPage] = useState(1)

  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  // const [openModalKey, setOpenModalKey] = useState<ModalKey | null>(null)
  // const [operatingMiner, setOperatingMiner] = useState<null>(null)
  const {data, isLoading, refetch} = useWorkersConnectionQuery(
    subsquidClient,
    {
      first: pageSize,
      ...(currentPage !== 1 && {
        after: String(pageSize * (currentPage - 1)),
      }),
      orderBy:
        WorkerOrderByInput[
          `${sortColumn}${
            sortAsc ? 'Asc' : 'Desc'
          }` as keyof typeof WorkerOrderByInput
        ],
      where: {
        ...(kind === 'mining' && {stakePool: {owner: {id_eq: address}}}),
        ...(kind === 'stakePool' && {stakePool: {id_eq: String(pid)}}),
      },
    },
    {
      keepPreviousData: true,
      enabled:
        (kind === 'mining' && Boolean(address)) ||
        (kind === 'stakePool' && pid !== undefined),
    }
  )

  useBlockHeightListener(refetch)

  const totalCount = data?.workersConnection.totalCount || 0

  const onSort = (columnId: string): void => {
    if (sortColumn === columnId) {
      setSortAsc(!sortAsc)
    } else {
      setSortColumn(columnId)
      setSortAsc(true)
    }
    setCurrentPage(1)
  }

  // const closeModal = useCallback(() => {
  //   setIsModalOpen(false)
  // }, [])

  // const ModalBody = openModalKey && modalKeyMap[openModalKey]

  useEffect(() => {
    if (kind === 'mining') {
      setCurrentPage(1)
    }
  }, [polkadotAccount?.address, kind])

  return (
    <div>
      <div>
        <TableBuilder
          isLoading={isLoading}
          loadingMessage={<TableSkeleton />}
          data={data?.workersConnection.edges || []}
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
          <TableBuilderColumn id="Id" header="Public Key">
            {({node}: WorkerEdge) => (
              <StatefulTooltip content={node.id}>
                <span
                  className={css({cursor: 'pointer'})}
                  onClick={() => {
                    navigator.clipboard.writeText(node.id).then(() => {
                      toaster.info('Copied', {})
                    })
                  }}
                >
                  {trimAddress(node.id)}
                </span>
              </StatefulTooltip>
            )}
          </TableBuilderColumn>
          {kind === 'mining' && (
            <TableBuilderColumn
              id="StakePoolPid"
              header={
                <TooltipHeader content={tooltipContent.pid}>Pid</TooltipHeader>
              }
              sortable
            >
              {({node}: WorkerEdge) => node.stakePool?.id}
            </TableBuilderColumn>
          )}
          <TableBuilderColumn id="MinerV" header="V" sortable>
            {({node}: WorkerEdge) =>
              node.miner && toFixed(new Decimal(node.miner.v), 4)
            }
          </TableBuilderColumn>
          {kind === 'mining' && (
            <TableBuilderColumn id="MinerVe" header="Ve" sortable>
              {({node}: WorkerEdge) =>
                node.miner && toFixed(new Decimal(node.miner.ve), 4)
              }
            </TableBuilderColumn>
          )}
          {kind === 'mining' && (
            <TableBuilderColumn id="MinerPInstant" header="P Instant" sortable>
              {({node}: WorkerEdge) => node.miner?.pInstant}
            </TableBuilderColumn>
          )}
          {kind === 'mining' && (
            <TableBuilderColumn id="MinerPInit" header="P Initial" sortable>
              {({node}: WorkerEdge) => node.miner?.pInit}
            </TableBuilderColumn>
          )}
          {/* <TableBuilderColumn
            id="state"
            header={
              <TooltipHeader content={tooltipContent.state}>
                State
              </TooltipHeader>
            }
            sortable
          >
            {({state, estimatesReclaimableAt}: WorkerEdge) => {
              if (state === 'MiningIdle') return 'Mining'
              if (state === 'MiningUnresponsive') return 'Unresponsive'
              if (state === 'MiningCoolingDown') {
                if (!estimatesReclaimableAt) return 'CoolingDown'
                const start = new Date()
                const end = new Date(estimatesReclaimableAt)
                const duration = formatDuration(
                  intervalToDuration({
                    start,
                    end: isAfter(end, start) ? end : start,
                  }),
                  {format: ['days', 'hours', 'minutes'], zero: true}
                )
                return (
                  <>
                    <Block marginTop="-10px">CoolingDown</Block>
                    <ParagraphXSmall
                      as="div"
                      marginBottom="-10px"
                      color="contentSecondary"
                    >
                      {duration}
                    </ParagraphXSmall>
                  </>
                )
              }
              return state
            }}
          </TableBuilderColumn> */}

          {kind === 'mining' && (
            <TableBuilderColumn
              id="MinerTotalReward"
              header={
                <TooltipHeader content={tooltipContent.mined}>
                  Mined
                </TooltipHeader>
              }
              sortable
            >
              {({node}: WorkerEdge) =>
                node.miner && `${formatCurrency(node.miner.totalReward)} PHA`
              }
            </TableBuilderColumn>
          )}

          <TableBuilderColumn id="MinerStake" header="Stake" sortable>
            {({node}: WorkerEdge) =>
              node.miner && `${formatCurrency(node.miner.stake)} PHA`
            }
          </TableBuilderColumn>

          {/* {(kind === 'mining' || (kind === 'stakePool' && isOwner)) && (
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
              {(miner: WorkerEdge) => {
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
                    disabled:
                      state !== 'Ready' && state !== 'MiningCoolingDown',
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
          )} */}
        </TableBuilder>
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={totalCount}
        pageSize={pageSize}
      />

      {/* {!isSSR && operatingMiner && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          overrides={{Dialog: {style: {borderRadius: '4px'}}}}
        >
          TODO: add suspense wrapper here with loadable modal components
          {ModalBody && (
            <ModalBody miner={operatingMiner} onClose={closeModal} />
          )}
        </Modal>
      )} */}
    </div>
  )
}

export default WorkerTableV2
