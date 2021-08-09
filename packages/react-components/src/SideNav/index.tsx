import React from 'react'
import styled from 'styled-components'
import Spacer from '../Spacer'
import Icons from './Icons'
import Links from './Links'
import Logo from './Logo'
import bg from './sidebar.jpg'

const SideNavWrap = styled.div`
  background-image: url(${bg});
  background-size: 100% auto;
  width: 240px;
  padding: 60px 30px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  box-shadow: 12px 16px 0px 0px #cccccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Header = styled.div``

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  align-items: flex-start;
`

const ExternalLink = styled.a`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 30px;
  display: flex;
  align-items: center;
  text-decoration-line: underline;
  color: #868686;
  cursor: pointer;

  &:hover {
    color: white;
  }
`

const SideNav: React.FC = () => {
  return (
    <SideNavWrap>
      <Header>
        <Logo></Logo>

        <Links></Links>
      </Header>

      <Footer>
        <ExternalLink target="__blank" href="https://phala.network">
          phala.network
        </ExternalLink>

        <ExternalLink target="__blank" href="https://wiki.phala.network">
          wiki
        </ExternalLink>

        <Spacer></Spacer>

        <Icons></Icons>

        <Spacer></Spacer>
      </Footer>
    </SideNavWrap>
  )
}

export default React.memo(SideNav)
