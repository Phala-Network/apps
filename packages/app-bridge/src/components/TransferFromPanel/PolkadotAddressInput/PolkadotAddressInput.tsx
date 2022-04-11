import {useCurrentAccount} from '@phala/app-store'
import {Block} from 'baseui/block'
import {FC, useEffect} from 'react'
import {useFromAddress} from '../../../store'
import {PolkadotConnectWallet} from '../../PolkadotConnectWallet'
import {Address, Root, WalletName} from './styledComponents'

export interface PolkadotAddressInputProps {
  children?: React.ReactNode
}

export const PolkadotAddressInput: FC<PolkadotAddressInputProps> = () => {
  const [polkadotAccount] = useCurrentAccount()
  const [, setFromAddress] = useFromAddress()

  useEffect(() => {
    if (polkadotAccount?.address) {
      setFromAddress(polkadotAccount?.address)
    }
  }, [polkadotAccount?.address, setFromAddress])

  return (
    <Root>
      <Block>
        <WalletName>{polkadotAccount?.name}</WalletName>
        <PolkadotConnectWallet />
      </Block>
      <Address>{polkadotAccount?.address}</Address>
    </Root>
  )
}
