import {FC} from 'react'
import {Address, Amount, Body, Label, Line, Type} from './styledComponents'

interface TransferPanelProps {
  label: string
  address?: string
  type?: string
  amount?: string
}

export const InformationDetailItem: FC<TransferPanelProps> = (props) => {
  const {type, label, address, amount} = props

  return (
    <div>
      <Label>{label}</Label>

      <Body>
        <div>
          <Amount>{amount}</Amount>
          <Type>{type}</Type>
        </div>
      </Body>

      <Line />

      <Body>
        <Address>{address}</Address>
      </Body>
    </div>
  )
}
