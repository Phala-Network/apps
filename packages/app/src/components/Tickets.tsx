import {Spacer} from '@phala/react-components'
import React from 'react'
import styled from 'styled-components'
import EthereumTicket from './EthereumTicket'
import PolkadotTicket from './PolkadotTicket'

const TicketsRoot = styled.div`
  padding: 60px;
`

const TicketsInner = styled.div`
  position: fixed;
  top: 48px;
  z-index: 0;
`

const Tickets: React.FC = () => {
  return (
    <TicketsRoot>
      <TicketsInner>
        <PolkadotTicket></PolkadotTicket>

        <Spacer y={2}></Spacer>

        <EthereumTicket></EthereumTicket>
      </TicketsInner>
    </TicketsRoot>
  )
}

export default Tickets
