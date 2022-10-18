import {useCurrentAccount} from '@phala/store'
import {
  formatCurrency,
  isSSR,
  isTruthy,
  toFixed,
  trimAddress,
} from '@phala/utils'
import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'
import {StatefulInput} from 'baseui/input'
import {StatefulMenu} from 'baseui/menu'
import {Modal, ModalProps} from 'baseui/modal'
import {StatefulPopover} from 'baseui/popover'
import {TableBuilder, TableBuilderColumn} from 'baseui/table-semantic'
import {toaster} from 'baseui/toast'
import {StatefulTooltip} from 'baseui/tooltip'
import {ParagraphXSmall} from 'baseui/typography'
import {
  addDays,
  formatDuration,
  intervalToDuration,
  isAfter,
  isFuture,
} from 'date-fns'
import Decimal from 'decimal.js'
import {debounce} from 'lodash-es'
import {FC, useCallback, useEffect, useState} from 'react'
import {Search} from 'react-feather'
import {
  useWorkersConnectionQuery,
  Worker,
  WorkerEdge,
  WorkerOrderByInput,
} from '../../hooks/subsquid'
import useBlockHeightListener from '../../hooks/useBlockHeightListener'
import {subsquidClient} from '../../utils/GraphQLClient'
import Pagination from '../Pagination'
import PopoverButton from '../PopoverButton'
import TableSkeleton from '../TableSkeleton'
import TooltipHeader from '../TooltipHeader'
import ChangeStakeModalBody from './ChangeStakeModalBody'
import ReclaimModalBody from './ReclaimModalBody'
import RemoveModalBody from './RemoveModalBody'
// FIXME: should be loadable, but meet some problems when configuring gatsby-plugin-loadable-components-ssr
import StartModalBody from './StartModalBody'
import StopModalBody from './StopModalBody'
import {tooltipContent} from './tooltipContent'

type ModalKey = 'start' | 'changeStake' | 'stop' | 'remove' | 'reclaim'
type MenuItem = {label: string; key: ModalKey; disabled?: boolean}

const modalKeyMap: Readonly<
  Record<ModalKey, FC<{worker: Worker} & Pick<ModalProps, 'onClose'>>>
> = {
  start: StartModalBody,
  stop: StopModalBody,
  remove: RemoveModalBody,
  reclaim: ReclaimModalBody,
  changeStake: ChangeStakeModalBody,
}

const WorkerTableV2: FC<{
  kind: 'stakePool' | 'mining'
  pid?: number
  isOwner?: boolean
}> = ({kind, pid, isOwner}) => {
  const [css] = useStyletron()
  const pageSize = 10
  const [polkadotAccount] = useCurrentAccount()
  const address = polkadotAccount?.address
  const [sortColumn, setSortColumn] = useState<string>(
    kind === 'stakePool' ? 'MinerV' : 'StakePoolPid'
  )
  const [sortAsc, setSortAsc] = useState(kind === 'mining')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchString, setSearchString] = useState('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [openModalKey, setOpenModalKey] = useState<ModalKey | null>(null)
  const [operatingWorker, setOperatingWorker] = useState<Worker | null>(null)

  const enabled =
    (kind === 'mining' && Boolean(address)) ||
    (kind === 'stakePool' && pid !== undefined)
  const {data, isInitialLoading, refetch} = useWorkersConnectionQuery(
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
        ...(searchString && {id_contains: searchString}),
        ...(kind === 'mining' && {stakePool: {owner: {id_eq: address}}}),
        ...(kind === 'stakePool' && {stakePool: {id_eq: String(pid)}}),
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

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const ModalBody = openModalKey && modalKeyMap[openModalKey]

  useEffect(() => {
    if (kind === 'mining') {
      setCurrentPage(1)
    }
  }, [polkadotAccount?.address, kind])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetSearchString = useCallback(
    debounce(setSearchString, 500),
    []
  )

  return (
    <div>
      <div>
        <StatefulInput
          size="compact"
          clearable
          placeholder="Search Public Key"
          onChange={(e) => debouncedSetSearchString(e.target.value)}
          endEnhancer={<Search size={18} />}
          overrides={{
            Root: {
              style: {
                width: '480px',
                maxWidth: '100%',
              },
            },
          }}
        />
        <TableBuilder
          isLoading={isInitialLoading}
          loadingMessage={<TableSkeleton />}
          data={data?.workersConnection.edges || []}
          sortColumn={sortColumn}
          sortOrder={sortAsc ? 'ASC' : 'DESC'}
          onSort={onSort}
          emptyMessage="No Results"
          overrides={{
            TableBodyCell: {style: {whiteSpace: 'nowrap'}},
            TableHeadCellSortable: {style: {svg: {right: 'initial'}}},
            TableLoadingMessage: {style: {padding: '10px 0'}},
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
          <TableBuilderColumn
            id="MinerState"
            header={
              <TooltipHeader content={tooltipContent.state}>
                State
              </TooltipHeader>
            }
            sortable
          >
            {({node}: WorkerEdge) => {
              if (!node.miner) return
              const {state, coolingDownStartTime} = node.miner
              if (state === 'MiningIdle') return 'Mining'
              if (state === 'MiningUnresponsive') return 'Unresponsive'
              if (state === 'MiningCoolingDown') {
                if (!coolingDownStartTime) return 'CoolingDown'
                const start = new Date()
                const end = addDays(new Date(coolingDownStartTime), 7)
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
          </TableBuilderColumn>

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

          {(kind === 'mining' || (kind === 'stakePool' && isOwner)) && (
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
              {({node}: WorkerEdge) => {
                const {miner} = node
                if (!miner) return
                const {state, coolingDownStartTime} = miner
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
                      !coolingDownStartTime ||
                      isFuture(addDays(new Date(coolingDownStartTime), 7)),
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
                          setOperatingWorker(node) // Pass object directly is Bad design
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
          )}
        </TableBuilder>
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={totalCount}
        pageSize={pageSize}
      />

      {!isSSR && operatingWorker && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          overrides={{
            Dialog: {
              style: ({$theme}) => ({
                borderRadius: '4px',
                borderWidth: '2px',
                borderColor: $theme.colors.accent,
                borderStyle: 'solid',
              }),
            },
          }}
        >
          {/* TODO: add suspense wrapper here with loadable modal components */}
          {ModalBody && (
            <ModalBody worker={operatingWorker} onClose={closeModal} />
          )}
        </Modal>
      )}
    </div>
  )
}

export default WorkerTableV2
