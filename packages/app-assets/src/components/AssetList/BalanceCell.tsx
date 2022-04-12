import React from 'react'
import styled from 'styled-components'
import {down} from 'styled-breakpoints'
import {DataType} from './index'

const Wrapper = styled.div``

const Balance = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
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
    width: 220px;
  }
`

const BalanceCell: React.FC<
  Pick<DataType, 'balance' | 'transferrable' | 'crowdloanVesting' | 'delegate'>
> = ({balance, transferrable, crowdloanVesting, delegate}) => {
  return (
    <Wrapper>
      <Balance>{balance}</Balance>
      <div>
        {transferrable ? (
          <ValueItem>
            <span>Transferrable</span>
            <span>{transferrable}</span>
          </ValueItem>
        ) : null}
        {crowdloanVesting ? (
          <ValueItem>
            <span>CrowdloanVesting</span>
            <span>{crowdloanVesting}</span>
          </ValueItem>
        ) : null}
        {delegate ? (
          <ValueItem>
            <span>Delegation</span>
            <span>{delegate}</span>
          </ValueItem>
        ) : null}
      </div>
    </Wrapper>
  )
}

export default BalanceCell
