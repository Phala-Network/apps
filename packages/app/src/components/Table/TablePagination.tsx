import React from 'react'
import styled from 'styled-components'

type Props = {
  pageIndex: number
  previousPage: () => void
  pageOptions: number[]
  canPreviousPage: boolean
  canNextPage: boolean
  nextPage: () => void
}

const Button = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:disabled,
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const PaginationWrap = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  color: #000000;
  text-align: right;
`

const TablePagination: React.FC<Props> = (props) => {
  const {
    pageIndex,
    previousPage,
    pageOptions,
    canPreviousPage,
    canNextPage,
    nextPage,
  } = props

  return (
    <PaginationWrap>
      <Button onClick={previousPage} disabled={!canPreviousPage}>
        <svg
          width="5"
          height="8"
          viewBox="0 0 5 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.77653 0.22347C5.07449 0.52143 5.07449 1.00452 4.77653 1.30248L2.07901 4L4.77653 6.69752C5.07449 6.99548 5.07449 7.47857 4.77653 7.77653C4.47857 8.07449 3.99548 8.07449 3.69752 7.77653L0.460495 4.5395C0.162535 4.24154 0.162535 3.75846 0.460495 3.4605L3.69752 0.22347C3.99548 -0.07449 4.47857 -0.07449 4.77653 0.22347Z"
            fill="#202020"
          />
        </svg>
      </Button>
      <span>
        {pageIndex + 1} / {pageOptions.length}
      </span>
      <Button onClick={nextPage} disabled={!canNextPage}>
        <svg
          width="5"
          height="8"
          viewBox="0 0 5 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.22347 0.22347C-0.07449 0.52143 -0.07449 1.00452 0.22347 1.30248L2.92099 4L0.22347 6.69752C-0.07449 6.99548 -0.07449 7.47857 0.22347 7.77653C0.52143 8.07449 1.00452 8.07449 1.30248 7.77653L4.5395 4.5395C4.83746 4.24154 4.83746 3.75846 4.5395 3.4605L1.30248 0.22347C1.00452 -0.07449 0.52143 -0.07449 0.22347 0.22347Z"
            fill="#202020"
          />
        </svg>
      </Button>
    </PaginationWrap>
  )
}

export default TablePagination
