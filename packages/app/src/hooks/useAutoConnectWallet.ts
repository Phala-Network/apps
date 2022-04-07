import {useLastWalletExtensionName} from '@phala/app-store'
import {useEffect} from 'react'

export const useAutoConnectWallet = () => {
  const [lastWalletExtensionName] = useLastWalletExtensionName()

  useEffect(() => {
    // TODO: auto connect wallet here
  }, [lastWalletExtensionName])
}
