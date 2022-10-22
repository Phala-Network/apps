import {formatCurrency, trimAddress} from '@phala/utils'
import {TableBuilder, TableBuilderColumn} from 'baseui/table-semantic'
import {addDays, formatDuration, intervalToDuration, isAfter} from 'date-fns'
import {FC} from 'react'
import {
  StakePoolStakeEdge,
  StakePoolStakeOrderByInput,
  useStakePoolStakesConnectionQuery,
} from '../../hooks/subsquid'
import useCurrentTime from '../../hooks/useCurrentTime'
import {subsquidClient} from '../../lib/graphqlClient'
import TableSkeleton from '../TableSkeleton'
import TooltipHeader from '../TooltipHeader'
import {tooltipContent} from './tooltipContent'

const WithdrawQueue: FC<{
  pid?: string
}> = ({pid}) => {
  const currentTime = useCurrentTime()
  const {data, isInitialLoading} = useStakePoolStakesConnectionQuery(
    subsquidClient,
    {
      where: {stakePool: {id_eq: pid}, withdrawalAmount_gt: '0'},
      orderBy: StakePoolStakeOrderByInput.WithdrawalStartTimeAsc,
    },
    {enabled: Boolean(pid), refetchOnWindowFocus: false}
  )

  return (
    <TableBuilder
      isLoading={isInitialLoading}
      loadingMessage={<TableSkeleton />}
      data={data?.stakePoolStakesConnection.edges || []}
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
          const start = currentTime
          const end = addDays(new Date(node.withdrawalStartTime), 7)
          if (isAfter(start, end)) return 'Ended'
          return formatDuration(intervalToDuration({start, end}), {
            format: ['days', 'hours', 'minutes'],
          })
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
