import {useAppKitAccount, useAppKitNetwork} from '@reown/appkit/react'

import {ethChain} from '@/config'
import {toAddress} from '@/lib/wagmi'

export function useValidConnection() {
  const {address: rawAddress, isConnected} = useAppKitAccount()
  const {chainId} = useAppKitNetwork()
  const address = toAddress(rawAddress)
  const isValidConnection = isConnected && chainId === ethChain.id

  return {address, isConnected, chainId, isValidConnection}
}
