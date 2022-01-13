import {Block} from 'baseui/block'
import {FC} from 'react'
import {NetworkIcon} from '../NetworkIcon'
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
  isShowNetworkIcon?: boolean
}

export const InformationDetailItem: FC<TransferPanelProps> = (props) => {
  const {
    coin,
    label,
    address,
    amount,
    network,
    isShowNetworkIcon = true,
  } = props

  return (
    <div>
      <Label>{label}</Label>

      <Body>
        <Block display="flex">
          {isShowNetworkIcon && <NetworkIcon network={network as any} />}

          <Network>{network}</Network>
        </Block>

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
