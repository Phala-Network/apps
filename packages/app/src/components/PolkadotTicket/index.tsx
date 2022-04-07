import {useCurrentAccount} from '@phala/app-store'
import {BalanceLabel, SelectAccountModal} from '@phala/react-components'
import {useBalance} from '@phala/react-hooks'
import {formatPolkadotBalance} from '@phala/utils'
import Decimal from 'decimal.js'
import React, {useState} from 'react'
import styled, {useTheme} from 'styled-components'
import Ticket, {
  DefaultStatus,
  DefaultStatusIcon,
  DefaultStatusName,
  TicketCurrency,
  TicketName as _TicketName,
} from '../Ticket'
import logo from './logo.png'

const TicketName = styled(_TicketName)`
  background: ${(props) => props.theme.colors.khala};
  letter-spacing: 0;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 8px;
  color: #000000;
`

const PolkadotTicket: React.FC = () => {
  const theme = useTheme()
  const [polkadotAccount] = useCurrentAccount()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openAccountSelectModal = () => setIsModalOpen(true)
  const balance = useBalance(polkadotAccount?.address)

  const [value, unit] = formatPolkadotBalance(balance?.toString() || '0')

  return (
    <>
      {!polkadotAccount ? (
        <Ticket
          onClick={openAccountSelectModal}
          cover={
            <DefaultStatus>
              <DefaultStatusIcon>
                <img src={logo} alt="logo" />
              </DefaultStatusIcon>
              <DefaultStatusName>{`Connect Polkadot{.js}`}</DefaultStatusName>
            </DefaultStatus>
          }
        />
      ) : (
        <Ticket
          onClick={openAccountSelectModal}
          themeColor={theme.colors.khala}
          no={polkadotAccount?.address}
          name={<TicketName>Khala</TicketName>}
          bottomContent={
            <>
              <BalanceLabel value={new Decimal(value)} />
              <TicketCurrency>{unit}</TicketCurrency>
            </>
          }
        />
      )}

      <SelectAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

export default PolkadotTicket
