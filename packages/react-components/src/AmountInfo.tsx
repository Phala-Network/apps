import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import toFixed from '../utils/toFixed'
import Tag from './Tag'

const AmountInfoWrap = styled.div`
  background: #ececec;
  padding: 16px;
`

const Amount = styled.div`
  color: #494949;
  font-size: 20px;
  margin-right: 8px;
`

const Header = styled.div`
  font-family: PT Mono;
  display: flex;
  align-items: center;
`

const Type = styled.div`
  flex: 1;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  color: #494949;
  text-transform: capitalize;
`

const Divider = styled.div`
  opacity: 0.2;
  background-color: #000000;
  height: 1px;
  margin: 16px 0;
`

type Props = {
  amount?: number | string
  type?: string
  network?: string
} & ComponentProps<typeof AmountInfoWrap>

const AmountInfo: React.FC<Props> = (props) => {
  const { children, amount, type, network, ...others } = props

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
