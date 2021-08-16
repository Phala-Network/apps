import styled from 'styled-components'
import React, { ComponentProps } from 'react'
import Select from './Select'
import { Target } from '.'

const BlockWrap = styled.div`
  padding: 16px;
  background: #25292e;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  flex: 1;
  color: #ffffff;
  text-align: left;
`

const Divider = styled.div`
  width: 0.5px;
  height: 31px;
  background: #ffffff;
  opacity: 0.2;
  margin: 0 16px;
`

type Props = {
  title: string
  value: Target
  disableSelect: boolean
} & ComponentProps<typeof BlockWrap>

const Block: React.FC<Props> = (props) => {
  const { title, value, disableSelect } = props

  return (
    <BlockWrap>
      <Title>{title}</Title>
      <Select
        disable={disableSelect}
        color={value.color}
        icon={value.icon}
        value={value.network}></Select>
      <Divider></Divider>
      <Select disable={disableSelect} value={value.type}></Select>
    </BlockWrap>
  )
}

export default Block
