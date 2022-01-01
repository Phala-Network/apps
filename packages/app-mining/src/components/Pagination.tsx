// TODO: move this component to common folder
import styled from 'styled-components'
import {Pagination as BasePagination} from 'baseui/pagination'
import {ParagraphSmall} from 'baseui/typography'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  /* gap polyfill */
  & > *:not(:first-child) {
    margin-left: 20px;
  }
`
const Pagination = ({
  pageSize = 20,
  totalCount,
  currentPage,
  setCurrentPage,
}: {
  totalCount: number
  pageSize?: number
  currentPage: number
  setCurrentPage: (page: number) => void
}): JSX.Element => {
  const numPages = Math.ceil(totalCount / pageSize)

  return (
    <Wrapper>
      {totalCount > 1 && <ParagraphSmall>{totalCount} records</ParagraphSmall>}
      {numPages > 1 && (
        <BasePagination
          numPages={numPages}
          currentPage={currentPage}
          onPageChange={({nextPage}) => {
            setCurrentPage(Math.min(Math.max(nextPage, 1), numPages))
          }}
        />
      )}
    </Wrapper>
  )
}

export default Pagination
