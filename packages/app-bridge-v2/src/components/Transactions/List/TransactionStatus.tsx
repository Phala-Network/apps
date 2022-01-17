import React from 'react'
import styled from 'styled-components'

const TransactionStatusRoot = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 41px;
  height: 41px;
`

type Props = {
  status: 'pending' | 'executed' | 'none'
}

export const TransactionStatus: React.FC<Props> = (props) => {
  const {status} = props

  return (
    <TransactionStatusRoot>
      {status === 'none' && <div />}
      {status === 'pending' && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.25532 7.39178C2.59575 7.07127 3.1477 7.07127 3.48813 7.39178L6.57014 10.2935L11.9372 5.24039C12.2776 4.91987 12.8296 4.91987 13.17 5.24039C13.5105 5.5609 13.5105 6.08056 13.17 6.40107L7.18654 12.0345C6.84611 12.355 6.29417 12.355 5.95374 12.0345L2.25532 8.55247C1.91489 8.23195 1.91489 7.7123 2.25532 7.39178Z"
            fill="white"
          />
        </svg>
      )}

      {status === 'executed' && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.8163 7.82038L5.0095 3.09291C4.57205 2.83027 4 3.15856 4 3.65101V13.106C4 13.5984 4.57205 13.9267 5.0095 13.6641L12.7826 8.93659C13.2537 8.70678 13.2537 8.05019 12.8163 7.82038Z"
            fill="white"
          />
        </svg>
      )}
    </TransactionStatusRoot>
  )
}
