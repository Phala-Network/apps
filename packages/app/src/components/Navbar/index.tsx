import React from 'react'
import {down} from 'styled-breakpoints'
import styled from 'styled-components'
import Logo from './Logo'
import Links from './Links'
import SelectNode from './SelectNode'
import Account from './Account'
import CheckMore from './CheckMore'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: #fff;
  z-index: 100;
  padding-right: 85px;

  ${down('sm')} {
    display: none;
  }
`

const Index: React.FC = () => {
  return (
    <Wrapper>
      <Logo />
      <Links />
      <SelectNode />
      <Account />
      <CheckMore />
    </Wrapper>
  )
}

export default Index
