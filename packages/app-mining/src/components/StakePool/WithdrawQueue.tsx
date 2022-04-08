import {formatCurrency, trimAddress} from '@phala/utils'
import {TableBuilder, TableBuilderColumn} from 'baseui/table-semantic'
import {formatDuration, intervalToDuration, isAfter} from 'date-fns'
import {VFC} from 'react'
import {StakePoolQuery} from '../../hooks/graphql'
import TooltipHeader from '../../TooltipHeader'
import TableSkeleton from '../TableSkeleton'
import {tooltipContent} from './tooltipContent'

type StakePoolWithdrawals = NonNullable<
  StakePoolQuery['findUniqueStakePools']
>['stakePoolWithdrawals']

type StakePoolWithdrawal = StakePoolWithdrawals[number]

const WithdrawQueue: VFC<{
  stakePoolWithdrawals: StakePoolWithdrawals
  isLoading?: boolean
}> = ({stakePoolWithdrawals, isLoading = false}) => {
  return (
    <TableBuilder
      isLoading={isLoading}
      loadingMessage={<TableSkeleton />}
      data={stakePoolWithdrawals}
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
      <TableBuilderColumn header="Delegator">
        {({userAddress}: StakePoolWithdrawal) =>
          userAddress && trimAddress(userAddress)
        }
      </TableBuilderColumn>
      <TableBuilderColumn header="Withdrawing">
        {({stake}: StakePoolWithdrawal) => `${formatCurrency(stake)} PHA`}
      </TableBuilderColumn>
      <TableBuilderColumn
        header={
          <TooltipHeader content={tooltipContent.countdown}>
            Countdown
          </TooltipHeader>
        }
      >
        {({estimatesEndTime}: StakePoolWithdrawal) => {
          const start = new Date()
          const end = new Date(estimatesEndTime)
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
        {({estimatesEndTime}: StakePoolWithdrawal) => {
          const date = new Date(estimatesEndTime)
          date.setDate(date.getDate() + 7)
          return date.toLocaleDateString()
        }}
      </TableBuilderColumn>
    </TableBuilder>
  )
}

export default WithdrawQueue
