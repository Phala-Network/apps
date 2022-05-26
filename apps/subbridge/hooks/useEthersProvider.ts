import {fromChainAtom} from '@/store/bridge'
import {ethereumProviderAtom, evmChainIdAtom} from '@/store/ethers'
import type {ethers} from 'ethers'
import {useAtomValue} from 'jotai'
import useSWRImmutable from 'swr/immutable'

const fetcher = async (ethereumProvider: ethers.providers.ExternalProvider) => {
  const {ethers} = await import('ethers')
  const provider = new ethers.providers.Web3Provider(ethereumProvider)
  return provider
}

export const useEthersProvider = ():
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
    fetcher
  )

  return data
}
