import { useEthereumAccountAtom } from '@phala/app-store'
import { abridgeString } from '@phala/utils'
import { useState } from 'react'
import styled from 'styled-components'
import EthereumIcon from '../../icons/ethereum.svg'
import ConnectButton from './ConnectButton'
import EmptyAccountModal from './EmptyAccountModal'

const Account = styled.div`
  font-family: PT Mono;
  display: flex;
  color: #92a5ff;
  align-items: center;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 0.07em;
  user-select: none;
`

const Wrapper = styled.div`
  user-select: none;
`

const MobileEthereumTicket: React.FC = () => {
  const [ethereumAccount] = useEthereumAccountAtom()
  const address = ethereumAccount?.address
  const [emptyAccountModalVisible, setEmptyAccountModalVisible] =
    useState(false)

  return (
    <Wrapper>
      {address ? (
        <Account>
          <EthereumIcon width="24" height="24"></EthereumIcon>
          {abridgeString(address)}
        </Account>
      ) : (
        <ConnectButton
          onClick={() => setEmptyAccountModalVisible(true)}></ConnectButton>
      )}

      <EmptyAccountModal
        visible={emptyAccountModalVisible}
        onClose={() => setEmptyAccountModalVisible(false)}></EmptyAccountModal>
    </Wrapper>
  )
}

export default MobileEthereumTicket
