import {formatCurrency, trimAddress} from '@phala/utils'
import {TableBuilder, TableBuilderColumn} from 'baseui/table-semantic'
import {formatDuration, intervalToDuration, isAfter} from 'date-fns'
import {VFC} from 'react'
import {StakePoolQuery} from '../../hooks/graphql'
import TableSkeleton from '../TableSkeleton'

type StakePoolWithdrawals = NonNullable<
  StakePoolQuery['findUniqueStakePools']
>['stakePoolWithdrawals']

type StakePoolWithdrawal = StakePoolWithdrawals[0]

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
      <TableBuilderColumn header="Delegation">
        {({stake}: StakePoolWithdrawal) => `${formatCurrency(stake)} PHA`}
      </TableBuilderColumn>
      <TableBuilderColumn header="Countdown">
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
    </TableBuilder>
  )
}

export default WithdrawQueue
