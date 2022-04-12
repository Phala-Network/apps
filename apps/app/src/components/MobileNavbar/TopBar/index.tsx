import React from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import SelectNode from './SelectNode'
import Account from './Account'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  background-color: #fff;
  padding: 0 10px;
`

const BottomBar: React.FC = () => {
  return (
    <Wrapper>
      <Logo />
      <SelectNode />
      <Account />
    </Wrapper>
  )
}

export default BottomBar
