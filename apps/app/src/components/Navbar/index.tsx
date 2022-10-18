import {Block} from 'baseui/block'
import React from 'react'
import {down} from 'styled-breakpoints'
import styled from 'styled-components'
import {useCurrentNetworkNode} from '../../store/networkNode'
import BlockHeight from '../BlockHeight'
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
  padding: 0 20px;

  ${down('md')} {
    height: 64px;
    padding: 0 12px;
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const Index: React.FC = () => {
  const [currentNetworkNode] = useCurrentNetworkNode()
  return (
    <Wrapper>
      <Content>
        <Block display="flex" alignItems="center" flex="none">
          <Logo />
          <Links />
        </Block>
        <Block display="flex" alignItems="center" flex="none">
          {currentNetworkNode.kind === 'khala' && <BlockHeight />}
          <SelectNode />
          <Account />
          <CheckMore />
        </Block>
      </Content>
    </Wrapper>
  )
}

export default Index
