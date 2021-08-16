import React from 'react'
import styled from 'styled-components'

const TransactionStatusRoot = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 41px;
  height: 41px;
  /* TODO: just hide it */
  opacity: 0;
`

type Props = {
  status: string
}

const TransactionStatus: React.FC<Props> = (props) => {
  const { status } = props

  return (
    <TransactionStatusRoot>
      {status === 'pending' && (
        <svg
          width="6"
          height="8"
          viewBox="0 0 6 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.75 0C1.16421 0 1.5 0.335785 1.5 0.75V7.25C1.5 7.66422 1.16421 8 0.75 8C0.335787 8 0 7.66422 0 7.25V0.75C0 0.335785 0.335787 0 0.75 0ZM4.75 0C5.16421 0 5.5 0.335785 5.5 0.75V7.25C5.5 7.66422 5.16421 8 4.75 8C4.33579 8 4 7.66422 4 7.25V0.75C4 0.335785 4.33579 0 4.75 0Z"
            fill="#202020"
          />
        </svg>
      )}

      {status === 'success' && (
        <svg
          width="10"
          height="7"
          viewBox="0 0 10 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.22347 2.22347C0.52143 1.92551 1.00452 1.92551 1.30248 2.22347L4 4.92099L8.69752 0.22347C8.99548 -0.07449 9.47857 -0.07449 9.77653 0.22347C10.0745 0.52143 10.0745 1.00452 9.77653 1.30248L4.5395 6.53951C4.24154 6.83746 3.75846 6.83746 3.4605 6.53951L0.22347 3.30248C-0.07449 3.00452 -0.07449 2.52143 0.22347 2.22347Z"
            fill="black"
          />
        </svg>
      )}
    </TransactionStatusRoot>
  )
}

export default TransactionStatus
