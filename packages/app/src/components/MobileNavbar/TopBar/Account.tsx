import {usePolkadotAccountAtom} from '@phala/app-store'
import {PolkadotAccountModal} from '@phala/react-components'
import {usePolkadotWeb3} from '@phala/react-libs'
import React, {useCallback, useEffect, useState} from 'react'
import styled from 'styled-components'
import {useSSR} from '@phala/react-hooks'
import EmptyAccountModal from './EmptyAccountModal'

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
  const {accounts} = usePolkadotWeb3()
  const [polkadotAccount, setPolkadotAccount] = usePolkadotAccountAtom()
  const [accountModalVisible, setAccountModalVisible] = useState(false)
  const [emptyAccountModalVisible, setEmptyAccountModalVisible] =
    useState(false)

  // FIXME: move this hook to a separate file
  useEffect(() => {
    if (
      accounts[0] &&
      accounts.length &&
      !accounts?.find(({address}) => address === polkadotAccount?.address)
    ) {
      const account = accounts[0]
      setPolkadotAccount({
        name: account.meta.name || 'Account',
        address: account.address,
      })
    }
  }, [accounts, polkadotAccount, setPolkadotAccount])

  const onClick = useCallback(() => {
    if (accounts.length) {
      setAccountModalVisible(true)
    } else {
      setEmptyAccountModalVisible(true)
    }
  }, [accounts.length])

  const {isServer} = useSSR()

  if (isServer) return null

  return (
    <Wrapper>
      {polkadotAccount ? (
        <AccountInfo onClick={() => setAccountModalVisible(true)}>
          {polkadotAccount.name}
        </AccountInfo>
      ) : (
        <ConnectButton onClick={onClick}></ConnectButton>
      )}

      <PolkadotAccountModal
        visible={accountModalVisible}
        onClose={() => setAccountModalVisible(false)}
      ></PolkadotAccountModal>

      <EmptyAccountModal
        visible={emptyAccountModalVisible}
        onClose={() => setEmptyAccountModalVisible(false)}
      ></EmptyAccountModal>
    </Wrapper>
  )
}

export default MobilePolkadotTicket
