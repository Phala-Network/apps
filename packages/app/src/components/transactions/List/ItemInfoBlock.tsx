import React from 'react'
import styled from 'styled-components'
import { TransactionInfoItem } from '../../../types/normal'
import abridgeString from '../../../utils/abridgeString'

export type ItemInfoBlockProps = TransactionInfoItem

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

const ItemInfoBlock: React.FC<ItemInfoBlockProps> = (props) => {
  const { address, amount, network, ...others } = props

  return (
    <ItemInfoBlockRoot {...others}>
      <div>
        <NetworkName>{network}</NetworkName>: {abridgeString(address)}
      </div>
      <div>
        {amount?.toString()} <B>PHA</B>
      </div>
    </ItemInfoBlockRoot>
  )
}

export default ItemInfoBlock
