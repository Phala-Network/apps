// TODO: move this component to common folder
import {Pagination as BasePagination} from 'baseui/pagination'
import {ParagraphSmall} from 'baseui/typography'
import {Block} from 'baseui/block'

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
    <Block display="flex" justifyContent="flex-end" alignItems="center">
      {totalCount > 1 && (
        <Block marginRight="scale400">
          <ParagraphSmall as="div">{totalCount} records</ParagraphSmall>
        </Block>
      )}
      {numPages > 1 && (
        <BasePagination
          numPages={numPages}
          currentPage={currentPage}
          onPageChange={({nextPage}) => {
            setCurrentPage(Math.min(Math.max(nextPage, 1), numPages))
          }}
        />
      )}
    </Block>
  )
}

export default Pagination
