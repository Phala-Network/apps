import React from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import SelectNode from './SelectNode'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 72px;
  background-color: #fff;
  padding: 0 20px;
`

const BottomBar: React.FC = () => {
  return (
    <Wrapper>
      <Logo />
      <SelectNode />
    </Wrapper>
  )
}

export default BottomBar
