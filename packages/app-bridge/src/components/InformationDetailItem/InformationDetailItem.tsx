import {Block} from 'baseui/block'
import {FC} from 'react'
import {formatCurrency} from '../../utils/formatCurrency'
import {NetworkIcon} from '../NetworkIcon'
import {
  Address,
  Amount,
  Body,
  Label,
  Line,
  Network,
  Root,
  Type,
} from './styledComponents'

export interface TransferPanelProps {
  label: string
  address?: string
  coin?: string
  amount?: string
  network?: string
  isShowNetworkIcon?: boolean
  isTrimAddress?: boolean
}

function trim(str: string) {
  return `${str.slice(0, 18)}…${str.slice(-8)}`
}

export const InformationDetailItem: FC<TransferPanelProps> = (props) => {
  const {
    coin,
    label,
    address = '',
    amount,
    network,
    isShowNetworkIcon = true,
    isTrimAddress = false,
  } = props

  return (
    <Root>
      <Label>{label}</Label>

      <Body>
        <Block display="flex">
          {isShowNetworkIcon && <NetworkIcon network={network as any} />}

          <Network>{network}</Network>
        </Block>

        <Block display="flex" alignItems="flex-end">
          <Amount>{formatCurrency(amount)}</Amount>
          <Type>{coin}</Type>
        </Block>
      </Body>

      <Line />

      <Body>
        <Address
          style={{
            paddingLeft: isShowNetworkIcon ? 74 : 20,
          }}
        >
          {isTrimAddress ? trim(address) : address}
        </Address>
      </Body>
    </Root>
  )
}
