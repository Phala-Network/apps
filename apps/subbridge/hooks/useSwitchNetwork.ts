import evmChainsData from '@/assets/evm_chains_data.json'
import {fromChainAtom} from '@/store/bridge'
import {useAtom} from 'jotai'
import {useCallback} from 'react'
import {useEthersWeb3Provider} from './useEthersProvider'

export const useSwitchNetwork = (): (() => Promise<void>) => {
  const [fromChain] = useAtom(fromChainAtom)
  const ethersWeb3Provider = useEthersWeb3Provider()

  const switchNetwork = useCallback(async () => {
    if (ethersWeb3Provider == null || fromChain.kind !== 'evm') return
    try {
      await ethersWeb3Provider.provider.request?.({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: `0x${fromChain.evmChainId.toString(16)}`}],
      })
    } catch (switchError) {
      if ((switchError as {code: number}).code === 4902) {
        await ethersWeb3Provider.provider.request?.({
          method: 'wallet_addEthereumChain',
          params: [
            (evmChainsData as Readonly<Record<number, unknown>>)[
              fromChain.evmChainId
            ],
          ],
        })
      }
    }
  }, [ethersWeb3Provider, fromChain])

  return switchNetwork
}
