import React from 'react'
import {down} from 'styled-breakpoints'
import styled from 'styled-components'
import {DataType} from './index'

const Balance = styled.div`
  font-weight: 600;
  font-size: 16px;
`

const ValueItem = styled.div`
  font-size: 14px;
  color: #8c8c8c;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  white-space: nowrap;
  gap: 12px;
  max-width: 280px;

  :first-of-type {
    margin-top: 20px;
  }

  ${down('md')} {
    font-size: 14px;
  }
`

const BalanceCell: React.FC<
  Pick<DataType, 'balance' | 'transferrable' | 'crowdloanVesting' | 'delegate'>
> = ({balance, transferrable, crowdloanVesting, delegate}) => {
  return (
    <div>
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
    </div>
  )
}

export default BalanceCell
