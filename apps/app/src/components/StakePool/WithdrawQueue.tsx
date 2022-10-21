import {formatCurrency, trimAddress} from '@phala/utils'
import {TableBuilder, TableBuilderColumn} from 'baseui/table-semantic'
import {addDays, formatDuration, intervalToDuration, isAfter} from 'date-fns'
import {FC} from 'react'
import {
  StakePoolStakeEdge,
  StakePoolStakeOrderByInput,
  useStakePoolStakesConnectionQuery,
} from '../../hooks/subsquid'
import useBlockHeightListener from '../../hooks/useBlockHeightListener'
import {subsquidClient} from '../../utils/GraphQLClient'
import TableSkeleton from '../TableSkeleton'
import TooltipHeader from '../TooltipHeader'
import {tooltipContent} from './tooltipContent'

const WithdrawQueue: FC<{
  pid?: string
}> = ({pid}) => {
  const enabled = Boolean(pid)
  const {data, isInitialLoading, refetch} = useStakePoolStakesConnectionQuery(
    subsquidClient,
    {
      where: {stakePool: {id_eq: pid}, withdrawalAmount_gt: '0'},
      orderBy: StakePoolStakeOrderByInput.WithdrawalStartTimeAsc,
    },
    {enabled, refetchOnWindowFocus: false}
  )
  useBlockHeightListener(() => {
    if (enabled) {
      refetch()
    }
  })
  return (
    <TableBuilder
      isLoading={isInitialLoading}
      loadingMessage={<TableSkeleton />}
      data={data?.stakePoolStakesConnection.edges || []}
      emptyMessage="No Results"
      overrides={{
        TableBodyCell: {style: {whiteSpace: 'nowrap'}},
        TableHeadCellSortable: {style: {svg: {right: 'initial'}}},
        TableLoadingMessage: {style: {padding: '10px 0'}},
      }}
    >
      <TableBuilderColumn header="Delegator">
        {({node}: StakePoolStakeEdge) => trimAddress(node.account.id)}
      </TableBuilderColumn>
      <TableBuilderColumn header="Withdrawing">
        {({node}: StakePoolStakeEdge) =>
          `${formatCurrency(node.withdrawalAmount)} PHA`
        }
      </TableBuilderColumn>
      <TableBuilderColumn
        header={
          <TooltipHeader content={tooltipContent.countdown}>
            Countdown
          </TooltipHeader>
        }
      >
        {({node}: StakePoolStakeEdge) => {
          if (!node.withdrawalStartTime) return
          const start = new Date()
          const end = addDays(new Date(node.withdrawalStartTime), 7)
          return formatDuration(
            intervalToDuration({
              start,
              end: isAfter(end, start) ? end : start,
            }),
            {format: ['days', 'hours', 'minutes'], zero: true}
          )
        }}
      </TableBuilderColumn>
      <TableBuilderColumn
        header={
          <TooltipHeader content={tooltipContent.latestWithdrawal}>
            Latest Withdrawal
          </TooltipHeader>
        }
      >
        {({node}: StakePoolStakeEdge) => {
          if (!node.withdrawalStartTime) return
          const date = new Date(node.withdrawalStartTime)
          return addDays(date, 14).toLocaleDateString()
        }}
      </TableBuilderColumn>
    </TableBuilder>
  )
}

export default WithdrawQueue
