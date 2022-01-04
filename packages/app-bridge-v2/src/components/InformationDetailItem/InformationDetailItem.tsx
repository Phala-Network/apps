import {Block} from 'baseui/block'
import {FC} from 'react'
import {
  Address,
  Amount,
  Body,
  Label,
  Line,
  Network,
  Type,
} from './styledComponents'

interface TransferPanelProps {
  label: string
  address?: string
  coin?: string
  amount?: string
  network?: string
}

export const InformationDetailItem: FC<TransferPanelProps> = (props) => {
  const {coin, label, address, amount, network} = props

  return (
    <div>
      <Label>{label}</Label>

      <Body>
        <div>
          <Network>{network}</Network>
        </div>

        <Block display="flex">
          <Amount>{amount}</Amount>
          <Type>{coin}</Type>
        </Block>
      </Body>

      <Line />

      <Body>
        <Address>{address}</Address>
      </Body>
    </div>
  )
}
