import React from 'react'
import styled from 'styled-components'
import DollarIcon from '../../icons/dollar.svg'

type Props = {
  themeType: 'black' | 'white'
}

const DollarWrap = styled.div`
  height: 20px;
  font-size: 12px;
  line-height: 13px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-family: PT Mono;

  &.black {
    border: 1px solid white;
  }

  &.white {
    border: 1px solid #202020;
  }
`

const Icon = styled.div<{ themeType: 'black' | 'white' }>`
  width: 18px;
  height: 18px;
  background-color: ${(props) =>
    props.themeType === 'black' ? 'white' : '#202020'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.themeType};
`
const Balance = styled.div`
  padding: 0 3px;
`

const Dollar: React.FC<Props> = (props) => {
  const { children, themeType } = props

  return (
    <DollarWrap className={themeType}>
      <Icon themeType={themeType}>
        <DollarIcon />
      </Icon>
      <Balance>{children}</Balance>
    </DollarWrap>
  )
}

export default Dollar
