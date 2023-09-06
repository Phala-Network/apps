import evmChainsData from '@/assets/evm_chains_data.json'
import {evmChainIdMap} from '@/config/common'
import {fromChainAtom} from '@/store/core'
import {ethereumProviderAtom} from '@/store/ethers'
import {useAtom} from 'jotai'
import {useCallback} from 'react'

export const useSwitchNetwork = (): (() => Promise<void>) => {
  const [fromChain] = useAtom(fromChainAtom)
  const [ethereum] = useAtom(ethereumProviderAtom)

  const switchNetwork = useCallback(async () => {
    if (ethereum == null || fromChain == null) return
    const targetEvmChainId = evmChainIdMap[fromChain.name]
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: `0x${targetEvmChainId.toString(16)}`}],
      })
    } catch (switchError) {
      if ((switchError as {code: number}).code === 4902) {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            (evmChainsData as Record<number, unknown>)[targetEvmChainId],
          ],
        })
      }
    }
  }, [ethereum, fromChain])

  return switchNetwork
}
