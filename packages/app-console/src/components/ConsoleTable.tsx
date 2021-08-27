import styled from 'styled-components'
import {Table, TableProps} from '@phala/react-components'

const TableWrapper = styled.div``

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const TableTitle = styled.div`
  font-size: 18px;
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
