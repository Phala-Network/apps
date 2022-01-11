import React from 'react'
import styled from 'styled-components'
import {down} from 'styled-breakpoints'
import {DataType} from './Table'

const Wrapper = styled.div``

const Balance = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #111111;
`

const ValueItem = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  color: #8c8c8c;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 265px;

  :first-of-type {
    margin-top: 20px;
  }

  ${down('sm')} {
    font-size: 14px;
    margin-bottom: 14px;
  }
`

const BalanceCell: React.FC<DataType> = ({
  balance,
  transferrable,
  crowdloanVesting,
  delegate,
}) => {
  return (
    <Wrapper>
      <Balance>{balance}</Balance>
      <div>
        {transferrable ? (
          <ValueItem>
            <span>transferrable</span>
            <span>{transferrable}</span>
          </ValueItem>
        ) : null}
        {crowdloanVesting ? (
          <ValueItem>
            <span>crowdloanVesting</span>
            <span>{crowdloanVesting}</span>
          </ValueItem>
        ) : null}
        {delegate ? (
          <ValueItem>
            <span>delegate</span>
            <span>{delegate}</span>
          </ValueItem>
        ) : null}
      </div>
    </Wrapper>
  )
}

export default BalanceCell
