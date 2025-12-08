import {useConnection} from 'wagmi'

import {ethChain} from '@/config'

export function useValidConnection() {
  const {address, chainId, isConnected} = useConnection()
  const isValidConnection = isConnected && chainId === ethChain.id

  return {address, isConnected, chainId, isValidConnection}
}
