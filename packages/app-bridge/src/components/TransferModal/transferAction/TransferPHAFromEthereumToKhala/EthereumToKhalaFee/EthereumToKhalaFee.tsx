import {useEthereumBridgeFee} from '@phala/react-libs'
import {FC} from 'react'
import styled from 'styled-components'

const Root = styled.div`
  display: flex;
  color: #111111;
  align-items: center;
`

const Label = styled.span`
  font-size: 16px;
  line-height: 16px;
  margin-right: 12px;
`

export const EthereumToKhalaFee: FC = (props) => {
  const {children} = props
  const ethFee = useEthereumBridgeFee()

  return (
    <Root {...props}>
      <Label>Fee:</Label> {ethFee?.toFixed(4) || '-'} ETH
      {children}
    </Root>
  )
}
