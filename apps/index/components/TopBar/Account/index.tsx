'use client'
import ConnectWalletButton from '@/components/ConnectWalletButton'
import {isWalletConnectAtom} from '@/store/common'
import {fromChainAtom} from '@/store/core'
import {useAtom} from 'jotai'
import {type FC} from 'react'
import EvmAccount from './EvmAccount'
import PolkadotAccount from './PolkadotAccount'

const Account: FC = () => {
  const [fromChain] = useAtom(fromChainAtom)
  const [isWalletConnected] = useAtom(isWalletConnectAtom)
  if (!isWalletConnected) {
    return <ConnectWalletButton />
  }

  if (fromChain?.chainType === 'Evm') {
    return <EvmAccount />
  }

  if (fromChain?.chainType === 'Sub') {
    return <PolkadotAccount />
  }

  return null
}

export default Account
