import {FC} from 'react'
import styled from 'styled-components'
import {useBridgePage} from '../../../useBridgePage'

const Root = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  /* identical to box height, or 114% */
  text-align: right;
  /* Gy 003 */
  color: #8c8c8c;
`

export const BalanceLabel: FC = () => {
  const {currentBalance} = useBridgePage()

  return <Root>Balance: {currentBalance.toString()} PHA</Root>
}
