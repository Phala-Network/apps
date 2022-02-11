import {
  BooleanColumn,
  CategoricalColumn,
  StatefulDataTable,
  StringColumn,
} from 'baseui/data-table'
import React, {FC} from 'react'

function pseudoRandomString(rowIdx: any, columnIdx: any) {
  return (
    (0.88 * rowIdx).toString(36).replace('.', '').substring(2) +
    (0.99 * columnIdx).toString(36).replace('.', '')
  ).slice(0, 30)
}

function makeRowsFromColumns(columns: any, rowCount: number) {
  const rows = []
  for (let i = 0; i < rowCount; i++) {
    rows.push({
      id: i,
      data: columns.map((_: any, j: number) => {
        return pseudoRandomString(i, j)
      }),
    })
  }
  return rows
}
type RowDataT = [string, string, string, string, string, string, string]

const columns = [
  CategoricalColumn({
    title: 'Source Chain',
    mapDataToValue: (data: RowDataT) => data[0],
  }),
  StringColumn({
    title: 'Transit Chain',
    mapDataToValue: (data: RowDataT) => data[1],
  }),
  StringColumn({
    title: 'Dest Chain',
    mapDataToValue: (data: RowDataT) => data[2],
  }),
  StringColumn({
    title: 'Time',
    mapDataToValue: (data: RowDataT) => data[3],
  }),
  StringColumn({
    title: 'Amount',
    mapDataToValue: (data: RowDataT) => data[4],
  }),
  CategoricalColumn({
    title: 'Asset',
    mapDataToValue: (data: RowDataT) => data[5],
  }),
  BooleanColumn({
    title: 'Txid',
    mapDataToValue: (data: RowDataT) => data[6],
  }),
]

const rows = makeRowsFromColumns(columns, 500)

export interface TransactionTableProps {
  children?: React.ReactNode
}

export const TransactionTable: FC<TransactionTableProps> = () => {
  return (
    <div style={{height: '80vh'}}>
      <StatefulDataTable columns={columns} rows={rows} />
    </div>
  )
}
