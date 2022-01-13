import {trimAddress} from '@phala/utils'
import React from 'react'
import styled from 'styled-components'

export type ItemInfoBlockProps = {
  address: string
  amount: string
  network: string
}

const ItemInfoBlockRoot = styled.div`
  font-family: PT Mono;
  font-weight: normal;
  font-size: 10px;
  line-height: 11px;
  width: 130px;
`

const B = styled.b`
  font-weight: bold;
  font-family: 'Lato';
`

const NetworkName = styled.span`
  text-transform: capitalize;
  font-weight: bold;
  font-family: 'Lato';
`

export const ItemInfoBlock: React.FC<ItemInfoBlockProps> = (props) => {
  const {address, amount, network, ...others} = props

  return (
    <ItemInfoBlockRoot {...others}>
      <div>
        <NetworkName>{network}</NetworkName>: {trimAddress(address)}
      </div>
      <div>
        {amount} <B>PHA</B>
      </div>
    </ItemInfoBlockRoot>
  )
}
