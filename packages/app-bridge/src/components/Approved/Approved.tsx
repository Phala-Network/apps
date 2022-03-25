import {FC} from 'react'
import styled from 'styled-components'

const Root = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  /* identical to box height, or 100% */

  display: flex;
  align-items: center;

  /* Gn 002 */

  color: #aad829;
`

const Text = styled.div`
  margin-right: 12px;
`

export const Approved: FC = () => {
  return (
    <Root>
      <Text>Approved</Text>
      <svg
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.255322 2.39178C0.595752 2.07127 1.1477 2.07127 1.48813 2.39178L4.57014 5.2935L9.93722 0.240386C10.2776 -0.0801287 10.8296 -0.0801287 11.17 0.240386C11.5105 0.560901 11.5105 1.08056 11.17 1.40107L5.18654 7.03453C4.84611 7.35505 4.29417 7.35505 3.95374 7.03453L0.255322 3.55247C-0.0851074 3.23195 -0.0851074 2.7123 0.255322 2.39178Z"
          fill="#AAD829"
        />
      </svg>
    </Root>
  )
}
