import WithdrawalQueueIcon from '@/assets/withdraw_queue.svg'
import Empty from '@/components/Empty'
import SectionHeader from '@/components/SectionHeader'
import {
  type BasePoolCommonFragment,
  useDelegationsConnectionQuery,
} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import {subsquidClientAtom} from '@/store/common'
import Check from '@mui/icons-material/Check'
import WarningAmber from '@mui/icons-material/WarningAmber'
import {
  Box,
  Chip,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import {DataGrid, type GridColDef, type GridSortModel} from '@mui/x-data-grid'
import {compactFormat, toCurrency} from '@phala/lib'
import {polkadotAccountAtom} from '@phala/store'
import {
  addDays,
  formatDuration,
  intervalToDuration,
  isAfter,
  isSameDay,
} from 'date-fns'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {type FC, useMemo, useState} from 'react'
import {
  Line,
  LineChart,
  Tooltip as RechartsTooltip,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import Property from '../Property'
import CustomRechartsTooltip from '../RechartsTooltip'
import WikiButton from '../Wiki/Button'
import WrapDecimal from '../WrapDecimal'

interface RowModel {
  id: string
  delegator: string
  value: string
  startTime?: string | null
}

const WithdrawQueue: FC<{basePool: BasePoolCommonFragment}> = ({basePool}) => {
  const theme = useTheme()
  const [account] = useAtom(polkadotAccountAtom)
  const [sortModal, setSortModal] = useState<GridSortModel>([
    {field: 'countdown', sort: 'asc'},
  ])
  const [subsquidClient] = useAtom(subsquidClientAtom)
  const {data, isLoading} = useDelegationsConnectionQuery(subsquidClient, {
    orderBy: 'withdrawalStartTime_ASC',
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

  const columns = useMemo<Array<GridColDef<RowModel>>>(
    () => [
      {
        field: 'delegator',
        headerName: 'Delegator',
        flex: 1,
        sortable: false,
        minWidth: 420,
        renderCell: ({value}) => {
          if (value === account?.address) {
            return (
              <>
                {value}
                <Chip
                  label="You"
                  sx={{ml: 1}}
                  size="small"
                  color={basePool.kind === 'Vault' ? 'secondary' : 'primary'}
                />
              </>
            )
          }
          return value
        },
      },
      {
        field: 'value',
        headerName: 'Value',
        width: 200,
        renderCell: ({value}) => (
          <WrapDecimal>{`${toCurrency(value as number)} PHA`}</WrapDecimal>
        ),
      },
      {
        field: 'countdown',
        headerName: 'Countdown',
        width: 200,
        valueGetter: ({row}) =>
          row.startTime != null && new Date(row.startTime),
        valueFormatter: ({value}) => {
          const start = new Date()
          const end = addDays(new Date(value as number), 7)
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
        valueGetter: ({row}) =>
          row.startTime != null && new Date(row.startTime),
        valueFormatter: ({value}) =>
          addDays(new Date(value as number), 14).toLocaleDateString(),
      },
    ],
    [account?.address, basePool.kind],
  )

  const gapValue = useMemo(() => {
    const {withdrawingValue, freeValue, releasingValue} = basePool
    return new Decimal(withdrawingValue).minus(freeValue).minus(releasingValue)
  }, [basePool])

  const criticalTime = useMemo(() => {
    let time: string | undefined
    const {freeValue, releasingValue} = basePool
    let baseValue = new Decimal(freeValue).plus(releasingValue)
    for (const row of rows) {
      baseValue = baseValue.minus(row.value)
      if (baseValue.lt(0) && row.startTime != null) {
        time = row.startTime
      }
    }
    if (time != null) {
      return addDays(new Date(time), 7)
    }
  }, [basePool, rows])

  const isInsufficient = gapValue.gt(0)

  const chartData = useMemo(() => {
    const now = new Date()
    const days = 14
    const result: Array<{date: Date; dateString: string; value?: number}> =
      Array.from({
        length: days,
      }).map((_, i) => {
        const date = addDays(now, i)
        return {
          dateString: date.toLocaleDateString(),
          date,
        }
      })
    let acc = new Decimal(0)
    for (const row of rows) {
      if (row.startTime == null) continue
      const endTime = addDays(new Date(row.startTime), 7)
      acc = acc.plus(row.value)
      const index = result.findIndex((item) => isSameDay(item.date, endTime))
      if (index === -1) continue
      result[index].value = acc.toDP(2, Decimal.ROUND_DOWN).toNumber()
    }
    for (let i = 0; i < result.length; i++) {
      if (result[i].value === undefined) {
        result[i].value = result[i - 1]?.value ?? 0
      }
    }
    return result
  }, [rows])

  return (
    <>
      <SectionHeader icon={<WithdrawalQueueIcon />} title="Withdrawal Queue" />
      <Paper sx={{background: 'transparent', mb: 2, p: 2}}>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={2}>
          <Stack spacing={3} flex={{xs: 'none', md: '1'}}>
            <Stack direction="row" alignItems="center">
              {gapValue.gt(0) ? (
                <WarningAmber fontSize="large" color="warning" />
              ) : (
                <Check fontSize="large" color="success" />
              )}
              <WikiButton entry="sufficientStake">
                <Typography variant="h6" ml={1}>
                  {isInsufficient ? 'Insufficient Stake' : 'Sufficient Stake'}
                </Typography>
              </WikiButton>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              flexWrap="wrap"
            >
              <Property label="Total Withdraw">
                {`${toCurrency(basePool.withdrawingValue)} PHA`}
              </Property>
              <Typography variant="body1" component="div">
                -
              </Typography>
              <Property label="Releasing Value">
                {`${toCurrency(basePool.releasingValue)} PHA`}
              </Property>
              <Typography variant="body1" component="div">
                -
              </Typography>
              <Property label="Free Value">
                {`${toCurrency(basePool.freeValue)} PHA`}
              </Property>
              <Typography variant="body1" component="div">
                =
              </Typography>
              <Property label="Gap Value">{`${toCurrency(
                gapValue,
              )} PHA`}</Property>
            </Stack>
            {criticalTime != null && (
              <Stack direction="row" spacing={1}>
                {/* TODO: critical time explanation */}
                <Tooltip title="">
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
          <Box flex={{xs: 'none', md: 1}} height={170} minWidth={0}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis height={20} tickLine={false} dataKey="dateString" />
                <YAxis
                  width={40}
                  type="number"
                  dataKey="value"
                  name="Value"
                  tickLine={false}
                  tickFormatter={(value) => compactFormat(value as number, 0)}
                />
                <RechartsTooltip
                  isAnimationActive={false}
                  content={<CustomRechartsTooltip />}
                />
                <Line
                  unit=" PHA"
                  dot={false}
                  type="stepAfter"
                  dataKey="value"
                  stroke={
                    basePool.kind === 'Vault'
                      ? colors.vault[500]
                      : colors.main[400]
                  }
                  strokeWidth={3}
                  name="Due withdrawal"
                />
                {criticalTime != null && (
                  <ReferenceLine
                    strokeDasharray="3 3"
                    x={criticalTime.toLocaleDateString()}
                  />
                )}
                <ReferenceLine
                  ifOverflow="extendDomain"
                  strokeDasharray="3 3"
                  y={new Decimal(basePool.freeValue)
                    .plus(basePool.releasingValue)
                    .toDP(2, Decimal.ROUND_DOWN)
                    .toNumber()}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Stack>
      </Paper>
      <DataGrid
        slots={{noRowsOverlay: () => <Empty />}}
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
        pageSizeOptions={[5]}
        initialState={{pagination: {paginationModel: {pageSize: 5}}}}
        disableColumnMenu
        disableColumnSelector
        disableColumnFilter
        disableRowSelectionOnClick
        autoHeight
        sortModel={sortModal}
        onSortModelChange={(model) => {
          setSortModal(model)
        }}
      />
    </>
  )
}

export default WithdrawQueue
