import {useEthereumBridgeFee} from '@phala/react-libs'
import {FC} from 'react'
import styled from 'styled-components'

const Root = styled.div`
  display: flex;
  font-size: 14px;
`

const Label = styled.span`
  font-weight: bold;
  margin-right: 5px;
  display: block;
`

export const EthereumToKhalaFee: FC = (props) => {
  const {children} = props
  const ethFee = useEthereumBridgeFee()

  return (
    <Root {...props}>
      <Label>Fee:</Label> {ethFee?.toFixed(4) || '...'} ETH
      {children}
    </Root>
  )
}
