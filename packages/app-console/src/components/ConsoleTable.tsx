import {Table, TableProps} from '@phala/react-components'
import styled from 'styled-components'

const TableWrapper = styled.div`
  tbody {
    td:not(:last-child) {
      font-family: PT Mono, monospace;
    }
  }
`

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

const TableTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`
const ConsoleTable = <D extends Record<string, unknown>>({
  title,
  header,
  ...restProps
}: TableProps<D> & {
  title: string
  header?: React.ReactNode
}): JSX.Element => {
  return (
    <TableWrapper>
      <TableHeader>
        <TableTitle>{title}</TableTitle>
        {header}
      </TableHeader>
      <Table
        autoResetPage={false}
        autoResetSortBy={false}
        {...restProps}
      ></Table>
    </TableWrapper>
  )
}

export default ConsoleTable
