import evmChainsData from '@/assets/evm_chains_data.json'
import {fromChainAtom} from '@/store/bridge'
import {ethereumProviderAtom} from '@/store/ethers'
import {useAtom} from 'jotai'
import {useCallback} from 'react'

export const useSwitchNetwork = (): (() => Promise<void>) => {
  const [fromChain] = useAtom(fromChainAtom)
  const [ethereum] = useAtom(ethereumProviderAtom)

  const switchNetwork = useCallback(async () => {
    if (ethereum == null || fromChain.kind !== 'evm') return
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: `0x${fromChain.evmChainId.toString(16)}`}],
      })
    } catch (switchError) {
      if ((switchError as {code: number}).code === 4902) {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            (evmChainsData as Readonly<Record<number, unknown>>)[
              fromChain.evmChainId
            ],
          ],
        })
      }
    }
  }, [ethereum, fromChain])

  return switchNetwork
}
