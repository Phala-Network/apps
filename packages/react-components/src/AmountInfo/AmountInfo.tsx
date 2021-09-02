import {toFixed} from '@phala/utils'
import React, {ComponentProps} from 'react'
import Tag from '../Tag'
import {Amount, AmountInfoWrap, Divider, Header, Type} from './styledComponents'

type Props = {
  amount?: number | string
  type?: string
  network?: string
} & ComponentProps<typeof AmountInfoWrap>

const AmountInfo: React.FC<Props> = (props) => {
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

export default AmountInfo
