import {useCallback} from 'react'
import {useSwitchChain, useWatchAsset} from 'wagmi'

interface TokenInfo {
  chainId: number
  address: `0x${string}`
  symbol: string
  decimals?: number
  image?: string
}

export function useAddTokenToWallet() {
  const {switchChainAsync} = useSwitchChain()
  const {watchAsset} = useWatchAsset()

  const addTokenToWallet = useCallback(
    async ({chainId, address, symbol, decimals = 18, image}: TokenInfo) => {
      try {
        await switchChainAsync({chainId})
      } catch (error) {
        console.error('Failed to switch network:', error)
        return false
      }

      try {
        watchAsset({
          type: 'ERC20',
          options: {
            address,
            symbol,
            decimals,
            image,
          },
        })
        return true
      } catch (error) {
        console.error('Failed to add token to wallet:', error)
        return false
      }
    },
    [switchChainAsync, watchAsset],
  )

  const addNetwork = useCallback(
    async (chainId: number) => {
      try {
        await switchChainAsync({chainId})
        return true
      } catch (error) {
        console.error('Failed to add network to wallet:', error)
        return false
      }
    },
    [switchChainAsync],
  )

  return {addTokenToWallet, addNetwork}
}
