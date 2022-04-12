import {useCurrentAccount} from '@phala/store'
import {SelectAccountModal} from '@phala/react-components'
import React, {useCallback, useState} from 'react'
import styled from 'styled-components'
import {useSSR} from '@phala/react-hooks'

const Wrapper = styled.div`
  user-select: none;
`

const AccountInfo = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid #cecece;
  box-sizing: border-box;
  height: 100%;
  padding: 0 16px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  background: #eeeeee;
  height: 36px;
`

const ConnectButton = styled.div.attrs({children: 'Connect Wallet'})`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  padding: 0 10px;
  background: #d1ff52;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #111111;
`

const MobilePolkadotTicket: React.FC = () => {
  const [currentAccount] = useCurrentAccount()
  const [accountModalVisible, setAccountModalVisible] = useState(false)

  const onClick = useCallback(() => {
    setAccountModalVisible(true)
  }, [])

  const {isServer} = useSSR()

  if (isServer) return null

  return (
    <Wrapper>
      {currentAccount ? (
        <AccountInfo onClick={() => setAccountModalVisible(true)}>
          {currentAccount.name}
        </AccountInfo>
      ) : (
        <ConnectButton onClick={onClick}></ConnectButton>
      )}

      <SelectAccountModal
        isOpen={accountModalVisible}
        onClose={() => setAccountModalVisible(false)}
      ></SelectAccountModal>
    </Wrapper>
  )
}

export default MobilePolkadotTicket
