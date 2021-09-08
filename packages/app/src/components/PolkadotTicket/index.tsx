import {usePolkadotAccountAtom} from '@phala/app-store'
import {BalanceLabel, PolkadotAccountModal} from '@phala/react-components'
import {useBalance} from '@phala/react-hooks'
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
  const [polkadotAccount] = usePolkadotAccountAtom()
  const [selectAccountModalViable, setSelectAccountModalViable] =
    useState(false)
  const openAccountSelectModal = () => setSelectAccountModalViable(true)
  const balance = useBalance(polkadotAccount?.address)

  let value = 0
  let name = 'PHA'

  // format balance use polkadot's decimals
  if (balance) {
    const result = balance?.toHuman()?.toString()?.split?.(' ')

    value = parseFloat(result[0] || '0')
    name = result[1] || 'PHA'

    // dont show kPHA value
    if (name === 'kPHA') {
      value *= 1000
      name = 'PHA'
    }
  }

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
              <TicketCurrency>{name}</TicketCurrency>
            </>
          }
        />
      )}

      <PolkadotAccountModal
        onClose={() => setSelectAccountModalViable(false)}
        visible={selectAccountModalViable}
      />
    </>
  )
}

export default PolkadotTicket
