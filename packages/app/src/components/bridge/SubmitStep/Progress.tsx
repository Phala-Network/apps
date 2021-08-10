import React from 'react'
import styled from 'styled-components'

type Props = {
  data: any[]
}

const Root = styled.div`
  padding-left: 30px;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
`

const ProgressItem = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  color: #494949;
  margin: 4px;
  display: flex;
  align-items: center;
`

const DATA = [
  {
    text: 'Transaction Send',
    status: 'none',
  },
  {
    text: 'Ethereum Confirmed',
    status: 'none',
  },
  {
    text: 'Relayer Confirmed',
    status: 'none',
  },
  {
    text: 'Khala Confirmed',
    status: 'none',
  },
]

const Progress: React.FC<Props> = (props) => {
  const data = props.data || DATA

  return (
    <Root>
      {data.map((item) => (
        <ProgressItem key={item.text}>
          <svg
            style={{
              margin: '0 8px',
              opacity: item.status === 'success' ? 1 : 0,
            }}
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.22347 2.84163C0.52143 2.54367 1.00452 2.54367 1.30248 2.84163L4 5.53916L8.69752 0.841634C8.99548 0.543674 9.47857 0.543674 9.77653 0.841634C10.0745 1.13959 10.0745 1.62268 9.77653 1.92064L4.5395 7.15767C4.24154 7.45563 3.75846 7.45563 3.4605 7.15767L0.22347 3.92064C-0.07449 3.62268 -0.07449 3.13959 0.22347 2.84163Z"
              fill="#494949"
            />
          </svg>
          {item.text}
        </ProgressItem>
      ))}
    </Root>
  )
}

export default Progress
