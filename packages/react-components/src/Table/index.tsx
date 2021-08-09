import styled from 'styled-components'
import { Column, usePagination, useSortBy, useTable } from 'react-table'
import TablePagination from './TablePagination'
import TableSorter from './TableSorter'
import React from 'react'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: none;
    width: 100%;
    font-family: Lato;
    font-style: normal;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th {
      font-weight: bold;
      font-size: 12px;
      line-height: 14px;
      color: #202020;
      border-bottom: 1px solid #dddddd;
      padding: 0.8rem;
      text-align: left;
    }

    td {
      margin: 0;
      padding: 0.8rem;

      :last-child {
        border-right: 0;
      }
    }
  }
`

const Table: React.FC<{ columns: Column<{}>[]; data: {}[] }> = ({
  columns,
  data,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  )

  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <TableSorter
                    isSorted={column.isSorted}
                    isSortedDesc={column.isSortedDesc}
                  >
                    {' '}
                    {column.render('Header')}
                  </TableSorter>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <TablePagination
        pageIndex={pageIndex}
        previousPage={previousPage}
        pageOptions={pageOptions}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        nextPage={nextPage}
      />
    </Styles>
  )
}

export default Table
