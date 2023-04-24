import ConnectWalletButton from '@/components/ConnectWalletButton'
import {ChainType} from '@/lib/fetchConfig'
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

  if (fromChain.chainType === ChainType.EVM) {
    return <EvmAccount />
  }

  if (fromChain.chainType === ChainType.Substrate) {
    return <PolkadotAccount />
  }

  return null
}

export default Account
