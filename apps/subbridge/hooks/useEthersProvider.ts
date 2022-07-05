import {fromChainAtom} from '@/store/bridge'
import {ethereumProviderAtom, evmChainIdAtom} from '@/store/ethers'
import type {ethers} from 'ethers'
import {useAtomValue} from 'jotai'
import useSWRImmutable from 'swr/immutable'

const ethersWeb3ProviderFetcher = async (
  ethereumProvider: ethers.providers.ExternalProvider
) => {
  const {ethers} = await import('ethers')
  const provider = new ethers.providers.Web3Provider(ethereumProvider)
  return provider
}

export const useEthersWeb3Provider = ():
  | ethers.providers.Web3Provider
  | undefined => {
  const fromChain = useAtomValue(fromChainAtom)
  const evmChainId = useAtomValue(evmChainIdAtom)
  const ethereumProvider = useAtomValue(ethereumProviderAtom)
  const {data} = useSWRImmutable(
    ethereumProvider &&
      fromChain.kind === 'evm' &&
      fromChain.evmChainId === evmChainId
      ? [ethereumProvider, evmChainId]
      : null,
    ethersWeb3ProviderFetcher
  )

  return data
}

const ethersJsonRpcProviderFetcher = async (url: string) => {
  const {ethers} = await import('ethers')
  return new ethers.providers.StaticJsonRpcProvider(url)
}

export const useEthersJsonRpcProvider = (url?: string) => {
  const {data} = useSWRImmutable(url || null, ethersJsonRpcProviderFetcher)
  return data
}
