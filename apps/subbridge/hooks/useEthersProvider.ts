import {fromChainAtom} from '@/store/bridge'
import {ethersWeb3ProviderAtom} from '@/store/ethers'
import type {ethers} from 'ethers'
import {useAtomValue} from 'jotai'

export const useEthersWeb3Provider =
  (): ethers.providers.Web3Provider | null => {
    const fromChain = useAtomValue(fromChainAtom)
    const ethersWeb3Provider = useAtomValue(ethersWeb3ProviderAtom)

    if (fromChain.kind === 'evm') {
      return ethersWeb3Provider
    }

    return null
  }
