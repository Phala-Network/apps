import {toFixed} from '@phala/utils'
import React, {ComponentProps} from 'react'
import {Tag} from '../Tag'
import {Tooltip} from '../Tooltip'
import {Amount, AmountInfoWrap, Divider, Header, Type} from './styledComponents'

export type AmountInfoProps = {
  amount?: number | string
  type?: string
  network?: string
  tooltip?: string
} & ComponentProps<typeof AmountInfoWrap>

export const AmountInfo: React.FC<AmountInfoProps> = (props) => {
  const {children, amount, type, tooltip, network, ...others} = props
  const display = typeof amount === 'string' ? amount : toFixed(amount ?? 0)

  return (
    <AmountInfoWrap {...others}>
      <Header>
        {network && <Type>{network}</Type>}
        {amount && (
          <Tooltip placement="top" overlay={<span>{tooltip ?? display}</span>}>
            <Amount>{display}</Amount>
          </Tooltip>
        )}
        {type && <Tag>{type}</Tag>}
      </Header>

      {children && <Divider></Divider>}

      {children}
    </AmountInfoWrap>
  )
}
