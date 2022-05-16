import {Block} from 'baseui/block'
import React from 'react'
import {down} from 'styled-breakpoints'
import styled from 'styled-components'
import Account from './Account'
import CheckMore from './CheckMore'
import Links from './Links'
import Logo from './Logo'
import SelectNode from './SelectNode'

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

  ${down('lg')} {
    padding: 0 20px;
  }

  ${down('md')} {
    height: 72px;
    padding: 0 10px;
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const Index: React.FC = () => {
  return (
    <Wrapper>
      <Content>
        <Block display="flex" alignItems="center" flex="none">
          <Logo />
          <Links />
        </Block>
        <Block display="flex" alignItems="center" flex="none">
          <SelectNode />
          <Account />
          <CheckMore />
        </Block>
      </Content>
    </Wrapper>
  )
}

export default Index
