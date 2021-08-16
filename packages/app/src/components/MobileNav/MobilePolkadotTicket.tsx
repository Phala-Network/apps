import { usePolkadotAccountAtom } from '@phala/app-store'
import { useWeb3 } from '@phala/react-libs/esm/polkadot/hooks/useWeb3'
import { abridgeString } from '@phala/utils'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import KhalaIcon from '../../icons/khala.svg'
import PolkadotAccountModal from '../PolkadotAccountModal'
import ConnectButton from './ConnectButton'
import EmptyAccountModal from './EmptyAccountModal'

const Wrapper = styled.div`
  user-select: none;
`

const Account = styled.div`
  display: flex;
  align-items: center;
  font-family: PT Mono;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 0.07em;
  color: ${(props) => props.theme.colors.khala};
`

const MobilePolkadotTicket: React.FC = () => {
  const { accounts } = useWeb3()
  const [polkadotAccount, setPolkadotAccount] = usePolkadotAccountAtom()
  const [accountModalVisible, setAccountModalVisible] = useState(false)
  const [emptyAccountModalVisible, setEmptyAccountModalVisible] =
    useState(false)

  // FIXME: move this hook to a separate file
  useEffect(() => {
    if (
      accounts.length &&
      !accounts?.find(({ address }) => address === polkadotAccount?.address)
    ) {
      const account = accounts[0]
      setPolkadotAccount({
        name: account.meta.name || 'Account',
        address: account.address,
      })
    }
  }, [accounts, polkadotAccount])

  const onClick = useCallback(() => {
    if (accounts.length) {
      setAccountModalVisible(true)
    } else {
      setEmptyAccountModalVisible(true)
    }
  }, [accounts.length])

  return (
    <Wrapper>
      {polkadotAccount ? (
        <Account onClick={() => setAccountModalVisible(true)}>
          <KhalaIcon width="24" height="24" />
          {polkadotAccount.name} | {abridgeString(polkadotAccount.address)}
        </Account>
      ) : (
        <ConnectButton onClick={onClick}></ConnectButton>
      )}

      <PolkadotAccountModal
        visible={accountModalVisible}
        onClose={() => setAccountModalVisible(false)}></PolkadotAccountModal>

      <EmptyAccountModal
        visible={emptyAccountModalVisible}
        onClose={() => setEmptyAccountModalVisible(false)}></EmptyAccountModal>
    </Wrapper>
  )
}

export default MobilePolkadotTicket
