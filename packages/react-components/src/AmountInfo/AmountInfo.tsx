import {toFixed} from '@phala/utils'
import React, {ComponentProps} from 'react'
import Tag from '../Tag'
import {Amount, AmountInfoWrap, Divider, Header, Type} from './styledComponents'

export type AmountInfoProps = {
  amount?: number | string
  type?: string
  network?: string
} & ComponentProps<typeof AmountInfoWrap>

export const AmountInfo: React.FC<AmountInfoProps> = (props) => {
  const {children, amount, type, network, ...others} = props

  return (
    <AmountInfoWrap {...others}>
      <Header>
        {network && <Type>{network}</Type>}
        {amount && (
          <Amount>
            {typeof amount === 'string' ? amount : toFixed(amount)}
          </Amount>
        )}
        {type && <Tag>{type}</Tag>}
      </Header>

      {children && <Divider></Divider>}

      {children}
    </AmountInfoWrap>
  )
}
