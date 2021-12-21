import {useEthereumAccountAtom} from '@phala/app-store'
import {BalanceLabel, EthereumAccountModal} from '@phala/react-components'
import {useEthereumWeb3} from '@phala/react-libs'
import React, {useState} from 'react'
import styled from 'styled-components'
import {useCheckEthereumNetwork} from '../../hooks/useCheckEthereumNetwork'
import useEthereumAccountBalanceETHDecimal from '../../hooks/useEthereumAccountBalanceETHDecimal'
import Ticket, {
  DefaultStatus,
  DefaultStatusIcon,
  DefaultStatusName,
  TicketCurrency,
  TicketName as _TicketName,
} from '../Ticket'
import logoImage from './logo.png'

const TicketName = styled(_TicketName)`
  background: #c5cdf2;
  letter-spacing: 0;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 8px;
  color: #000000;
`

const EthereumTicket: React.FC = () => {
  const [ethereumAccount] = useEthereumAccountAtom()
  const {value: ethereumAccountBalanceETHDecimal} =
    useEthereumAccountBalanceETHDecimal()
  const [selectAccountModalViable, setSelectAccountModalViable] =
    useState(false)
  const isTheCurrentNetworkCorrect = useCheckEthereumNetwork()
  const {ethereumWeb3connect} = useEthereumWeb3()

  const openAccountSelectModal = () => {
    if (isTheCurrentNetworkCorrect) {
      setSelectAccountModalViable(true)
    } else {
      ethereumWeb3connect()
    }
  }

  return (
    <>
      {!ethereumAccount || !isTheCurrentNetworkCorrect ? (
        <Ticket
          onClick={openAccountSelectModal}
          cover={
            <DefaultStatus>
              <DefaultStatusIcon>
                <img src={logoImage} alt="logo" />
              </DefaultStatusIcon>
              <DefaultStatusName>Connect METAMASK</DefaultStatusName>
            </DefaultStatus>
          }
        ></Ticket>
      ) : (
        <Ticket
          onClick={openAccountSelectModal}
          themeColor={'black'}
          no={ethereumAccount?.address}
          name={<TicketName>Ethereum</TicketName>}
          bottomContent={
            <>
              <BalanceLabel value={ethereumAccountBalanceETHDecimal} />
              <TicketCurrency>ETH</TicketCurrency>
            </>
          }
        />
      )}

      <EthereumAccountModal
        onClose={() => setSelectAccountModalViable(false)}
        visible={selectAccountModalViable}
      />
    </>
  )
}

export default EthereumTicket
