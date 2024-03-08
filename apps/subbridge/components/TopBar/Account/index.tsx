import ConnectWalletButton from '@/components/ConnectWalletButton'
import {fromChainAtom} from '@/store/bridge'
import {isWalletConnectAtom} from '@/store/common'
import {useAtom} from 'jotai'
import type {FC} from 'react'
import EvmAccount from './EvmAccount'
import PolkadotAccount from './PolkadotAccount'

const Account: FC = () => {
  const [fromChain] = useAtom(fromChainAtom)
  const [isWalletConnected] = useAtom(isWalletConnectAtom)
  if (!isWalletConnected) {
    return <ConnectWalletButton />
  }

  if (fromChain.kind === 'evm') {
    return <EvmAccount />
  }

  if (fromChain.kind === 'substrate') {
    return <PolkadotAccount />
  }

  return null
}

export default Account
