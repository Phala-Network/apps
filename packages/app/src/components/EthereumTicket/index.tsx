import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import ethereumAccountAtom from '../../atoms/ethereumAccountAtom'
import { useCheckEthereumNetwork } from '../../hooks/useCheckEthereumNetwork'
import useEthereumAccountBalanceETHDecimal from '../../hooks/useEthereumAccountBalanceETHDecimal'
import BalanceLabel from '../BalanceLabel'
import EthereumAccountModal from '../EthereumAccountModal'
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
  const [ethereumAccount] = useAtom(ethereumAccountAtom)
  const {
    value: ethereumAccountBalanceETHDecimal,
  } = useEthereumAccountBalanceETHDecimal()
  const [selectAccountModalViable, setSelectAccountModalViable] = useState(
    false
  )
  const isTheCurrentNetworkCorrect = useCheckEthereumNetwork()

  const openAccountSelectModal = () => {
    if (isTheCurrentNetworkCorrect) {
      setSelectAccountModalViable(true)
    } else {
      toast(
        <div>
          <h1>Wrong Network</h1>
          <p>Please connect to the Ethereum Mainnet.</p>
        </div>
      )
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
              <DefaultStatusName>Connet METAMASK</DefaultStatusName>
            </DefaultStatus>
          }></Ticket>
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
