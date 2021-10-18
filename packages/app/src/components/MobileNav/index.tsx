import {BridgeTypeAtomEnum, useBridgeTypeAtom} from '@phala/app-store'
import {useSSR} from '@phala/react-hooks'
import {useLocation} from '@reach/router'
import React from 'react'
import {up} from 'styled-breakpoints'
import styled from 'styled-components'
import PhalaIcon from '../../icons/phala_icon.svg'
import Links from './Links'
import MobileEthereumTicket from './MobileEthereumTicket'
import MobilePolkadotTicker from './MobilePolkadotTicket'
import background from './mobile_nav_background.png'

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
  const {isBrowser} = useSSR()
  const {pathname} = useLocation()
  const [bridgeType] = useBridgeTypeAtom()

  const ticketCheck =
    isBrowser &&
    pathname.endsWith('/bridge/') &&
    bridgeType === BridgeTypeAtomEnum.fromEthToKhala

  return (
    <Wrapper>
      <PhalaIcon></PhalaIcon>
      <Links></Links>
      {ticketCheck ? <MobileEthereumTicket /> : <MobilePolkadotTicker />}
    </Wrapper>
  )
}

export default MobileNav
