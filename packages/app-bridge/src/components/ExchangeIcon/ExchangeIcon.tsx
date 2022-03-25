import React from 'react'
import styled from 'styled-components'
import {ArrowDown} from 'baseui/icon'

const Icon = styled.div`
  width: 66px;
  height: 66px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  position: relative;
  z-index: 1;
  border: 6px solid #e6e6e6;
  margin-top: -28px;
  margin-bottom: -28px;

  svg {
    transition: transform 0.2s;
    fill: #202020;
  }
`

export const ExchangeIcon: React.FC<React.ComponentProps<typeof Icon>> = (
  props
) => {
  return (
    <Icon {...props}>
      <ArrowDown size={36} />
    </Icon>
  )
}
