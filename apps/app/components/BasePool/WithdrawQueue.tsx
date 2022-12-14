import WithdrawalQueueIcon from '@/assets/withdraw_queue.svg'
import Empty from '@/components/Empty'
import SectionHeader from '@/components/SectionHeader'
import {subsquidClient} from '@/lib/graphql'
import {
  BasePoolCommonFragment,
  DelegationOrderByInput,
  useDelegationsConnectionQuery,
} from '@/lib/subsquidQuery'
import Check from '@mui/icons-material/Check'
import WarningAmber from '@mui/icons-material/WarningAmber'
import {Box, Paper, Stack, Tooltip, Typography, useTheme} from '@mui/material'
import {DataGrid, GridColDef, GridSortModel} from '@mui/x-data-grid'
import {toCurrency} from '@phala/util'
import {addDays, formatDuration, intervalToDuration, isAfter} from 'date-fns'
import Decimal from 'decimal.js'
import {FC, useMemo, useState} from 'react'
import Property from '../Property'

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
    minWidth: 420,
  },
  {
    field: 'value',
    headerName: 'Value',
    width: 200,
    valueFormatter: ({value}) => `${toCurrency(value)} PHA`,
  },
  {
    field: 'countdown',
    headerName: 'Countdown',
    width: 200,
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
    width: 200,
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
      withdrawingShares_gt: '0',
    },
  })

  const rows = useMemo<RowModel[]>(() => {
    return (
      data?.delegationsConnection.edges.map(({node}) => {
        return {
          id: node.id,
          delegator: node.account.id,
          value: node.withdrawingValue,
          startTime: node.withdrawalStartTime,
        }
      }) ?? []
    )
  }, [data])

  const gapValue = useMemo(() => {
    const {withdrawingValue, freeValue, releasingValue} = basePool
    return new Decimal(withdrawingValue).minus(freeValue).minus(releasingValue)
  }, [basePool])

  const criticalTime = useMemo(() => {
    let time
    const {freeValue, releasingValue} = basePool
    let baseValue = new Decimal(freeValue).plus(releasingValue)
    for (const row of rows) {
      baseValue = baseValue.minus(row.value)
      if (baseValue.lt(0) && row.startTime) {
        time = row.startTime
      }
    }
    return time && addDays(new Date(time), 7)
  }, [basePool, rows])

  const isInsufficient = gapValue.gt(0)

  return (
    <>
      <SectionHeader
        icon={<WithdrawalQueueIcon />}
        title="Withdrawal Queue"
      ></SectionHeader>
      <Paper sx={{background: 'transparent', mb: 2, p: 2}}>
        <Stack direction={{xs: 'column', md: 'row'}}>
          <Stack spacing={3} flex={{xs: 'none', md: '1'}}>
            <Stack direction="row" alignItems="center">
              {gapValue.gt(0) ? (
                <WarningAmber fontSize="large" color="warning" />
              ) : (
                <Check fontSize="large" color="success" />
              )}
              <Typography variant="h6" ml={1}>
                {isInsufficient ? 'Insufficient Stake' : 'Sufficient Stake'}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Property label="Total Withdraw">
                {toCurrency(basePool.withdrawingValue)} PHA
              </Property>
              <Typography variant="body1" component="div">
                -
              </Typography>
              <Property label="Releasing Value">
                {toCurrency(basePool.releasingValue)} PHA
              </Property>
              <Typography variant="body1" component="div">
                -
              </Typography>
              <Property label="Free Value">
                {toCurrency(basePool.freeValue)} PHA
              </Property>
              <Typography variant="body1" component="div">
                =
              </Typography>
              <Property label="Gap Value">{toCurrency(gapValue)} PHA</Property>
            </Stack>
            {criticalTime && (
              <Stack direction="row" spacing={1}>
                <Tooltip title="----">
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{textDecoration: 'underline dotted', cursor: 'help'}}
                  >
                    Critical Time
                  </Typography>
                </Tooltip>
                <Typography variant="subtitle2">
                  {criticalTime.toLocaleString()}
                </Typography>
              </Stack>
            )}
          </Stack>
          <Box flex={1}></Box>
        </Stack>
      </Paper>
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
