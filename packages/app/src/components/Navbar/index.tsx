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
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: #fff;
  padding: 0 40px;

  ${down('sm')} {
    display: none;
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

const Index: React.FC = () => {
  return (
    <Wrapper>
      <Content>
        <Logo />
        <Links />
        <SelectNode />
        <Account />
        <CheckMore />
      </Content>
    </Wrapper>
  )
}

export default Index
