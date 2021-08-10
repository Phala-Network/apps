import React from 'react'
import styled from 'styled-components'
import Spacer from './Spacer'
import EthereumTicket from './EthereumTicket'
import PolkadotTicket from './PolkadotTicket'

type Props = {}

const TicketsRoot = styled.div`
  padding: 60px;
`

const TicketsInner = styled.div`
  position: fixed;
  top: 48px;
  z-index: 0;
`

const Tickets: React.FC<Props> = () => {
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
