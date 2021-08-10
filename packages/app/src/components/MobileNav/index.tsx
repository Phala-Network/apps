import React from 'react'
import styled from 'styled-components'
import { up } from 'styled-breakpoints'
import { useLocation } from '@reach/router'
import MobilePolkadotTicker from './MobilePolkadotTicket'
import PhalaIcon from '../../icons/phala_icon.svg'
import background from './mobile_nav_background.png'
import Links from './Links'
import useSSR from '../../hooks/useSSR'
import MobileEthereumTicket from './MobileEthereumTicket'

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  background-color: #101010;
  background-image: url(${background});
  align-items: center;
  padding-right: 8px;

  ${up('md')} {
    display: none;
  }
`

const MobileNav: React.FC = () => {
  const { isBrowser } = useSSR()
  const { pathname } = useLocation()

  return (
    <Wrapper>
      <PhalaIcon></PhalaIcon>
      <Links></Links>
      {isBrowser &&
        (pathname.endsWith('/bridge/') ? (
          <MobileEthereumTicket></MobileEthereumTicket>
        ) : (
          <MobilePolkadotTicker></MobilePolkadotTicker>
        ))}
    </Wrapper>
  )
}

export default MobileNav
