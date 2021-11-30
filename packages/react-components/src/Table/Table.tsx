import {useEffect} from 'react'
import {
  Filters,
  TableOptions,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
  useAsyncDebounce,
} from 'react-table'
import styled from 'styled-components'
import TablePagination from './TablePagination'
import TableSorter from './TableSorter'

const TableWrapper = styled.div`
  overflow-x: auto;
`

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  font-size: 14px;
  color: #878787;
`

const Styles = styled.div`
  table {
    font-size: 12px;
    line-height: 1.2;
    border-spacing: 0;
    border: none;
    width: 100%;
    font-family: Lato;
    font-style: normal;

    tbody tr {
      :nth-child(even) {
        background-color: #f7f7f7;
      }
      :hover {
        background-color: ${(props) => props.theme.colors.phala};
      }
    }

    th {
      font-weight: bold;
      line-height: 14px;
      color: #202020;
      border-bottom: 1px solid #dddddd;
      padding: 12px;
      text-align: left;
    }

    td {
      margin: 0;
      padding: 12px;
      white-space: nowrap;

      :last-child {
        border-right: 0;
      }
    }
  }
`

export type TableProps<D extends Record<string, unknown>> = TableOptions<D> & {
  isLoading?: boolean
  globalFilterValue?: any
  filters?: Filters<D>
}

export const Table = <D extends Record<string, unknown>>(
  props: TableProps<D>
): JSX.Element => {
  const {isLoading, globalFilterValue, filters, ...restProps} = props
  const table = useTable(
    {
      initialState: {pageIndex: 0, ...props.initialState},
      ...restProps,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: {pageIndex},
    pageCount,
    setAllFilters,
    setGlobalFilter,
    gotoPage,
  } = table

  const debounceSetGlobalFilter = useAsyncDebounce(setGlobalFilter, 200)

  useEffect(() => {
    if (filters) {
      setAllFilters(filters)
      gotoPage(0)
    }
  }, [filters, setAllFilters, gotoPage])

  useEffect(() => {
    debounceSetGlobalFilter(globalFilterValue)
    gotoPage(0)
  }, [globalFilterValue, debounceSetGlobalFilter, gotoPage])

  return (
    <Styles>
      <TableWrapper>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              // eslint-disable-next-line react/jsx-key
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  // eslint-disable-next-line react/jsx-key
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <TableSorter
                      canSort={column.canSort}
                      isSorted={column.isSorted}
                      isSortedDesc={column.isSortedDesc}>
                      {column.render('Header')}
                    </TableSorter>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {Boolean(props.data.length) && (
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row)
                return (
                  // eslint-disable-next-line react/jsx-key
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          )}
        </table>

        {!props.data.length &&
          (isLoading ? (
            <Placeholder>Loading…</Placeholder>
          ) : (
            <Placeholder>No Data</Placeholder>
          ))}
      </TableWrapper>

      {pageCount > 1 && (
        <TablePagination
          pageIndex={pageIndex}
          previousPage={previousPage}
          pageOptions={pageOptions}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          nextPage={nextPage}
          gotoPage={gotoPage}
        />
      )}
    </Styles>
  )
}
