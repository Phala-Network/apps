import WithdrawalQueueIcon from '@/assets/withdraw_queue.svg'
import Empty from '@/components/Empty'
import SectionHeader from '@/components/SectionHeader'
import {subsquidClient} from '@/lib/graphql'
import {
  BasePoolCommonFragment,
  DelegationOrderByInput,
  useDelegationsConnectionQuery,
} from '@/lib/subsquidQuery'
import {useTheme} from '@mui/material'
import {DataGrid, GridColDef, GridSortModel} from '@mui/x-data-grid'
import {toCurrency} from '@phala/util'
import {addDays, formatDuration, intervalToDuration, isAfter} from 'date-fns'
import {FC, useMemo, useState} from 'react'

type RowModel = {
  id: string
  delegator: string
  value: string
  startTime?: string | null
}

const columns: GridColDef<RowModel>[] = [
  {
    field: 'delegator',
    headerName: 'Delegator',
    flex: 1,
    sortable: false,
  },
  {
    field: 'value',
    headerName: 'Value',
    flex: 1,
    valueFormatter: ({value}) => `${toCurrency(value)} PHA`,
  },
  {
    field: 'countdown',
    headerName: 'Countdown',
    flex: 1,
    valueGetter: ({row}) => row.startTime && new Date(row.startTime),
    valueFormatter: ({value}) => {
      const start = new Date()
      const end = addDays(new Date(value), 7)
      if (isAfter(start, end)) return 'Ended'
      return formatDuration(intervalToDuration({start, end}), {
        format: ['days', 'hours', 'minutes'],
      })
    },
  },
  {
    field: 'latestWithdrawal',
    headerName: 'Latest Withdrawal',
    flex: 1,
    valueGetter: ({row}) => row.startTime && new Date(row.startTime),
    valueFormatter: ({value}) =>
      addDays(new Date(value), 14).toLocaleDateString(),
  },
]

const WithdrawQueue: FC<{basePool: BasePoolCommonFragment}> = ({basePool}) => {
  const theme = useTheme()
  const [sortModal, setSortModal] = useState<GridSortModel>([
    {field: 'countdown', sort: 'asc'},
  ])
  const {data, isLoading} = useDelegationsConnectionQuery(subsquidClient, {
    orderBy: DelegationOrderByInput.WithdrawalStartTimeAsc,
    where: {
      basePool: {pid_eq: basePool.id},
      withdrawalShares_gt: '0',
    },
  })

  const rows = useMemo<RowModel[]>(() => {
    return (
      data?.delegationsConnection.edges.map(({node}) => {
        return {
          id: node.id,
          delegator: node.account.id,
          value: node.withdrawalValue,
          startTime: node.withdrawalStartTime,
        }
      }) ?? []
    )
  }, [data])

  return (
    <>
      <SectionHeader
        icon={<WithdrawalQueueIcon />}
        title="Withdrawal Queue"
      ></SectionHeader>
      <DataGrid
        components={{
          NoRowsOverlay: () => <Empty />,
        }}
        sx={{
          '&,.MuiDataGrid-columnHeaders,.MuiDataGrid-cell,.MuiDataGrid-footerContainer':
            {borderColor: theme.palette.divider},
          '.MuiDataGrid-cell,.MuiDataGrid-columnHeader': {
            outline: 'none!important',
          },
          '.MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
        }}
        loading={isLoading}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableColumnMenu
        disableColumnSelector
        disableColumnFilter
        disableSelectionOnClick
        autoHeight
        sortModel={sortModal}
        onSortModelChange={(model) => setSortModal(model)}
      />
    </>
  )
}

export default WithdrawQueue
