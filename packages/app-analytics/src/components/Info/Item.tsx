import {FC} from 'react'
import styled from 'styled-components'

const Name = styled.div`
  font-family: PT Mono;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: right;
  color: #000000;
  margin-top: 8px;
`

const Value = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  color: #000000;
`

export interface ItemProps {
  name: string
  value: string
}

export const Item: FC<ItemProps> = (props) => {
  const {name, value} = props

  return (
    <div>
      <Value>{value}</Value>
      <Name>{name}</Name>
    </div>
  )
}
