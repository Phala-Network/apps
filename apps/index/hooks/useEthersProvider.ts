import {evmChainIdMap} from '@/config/common'
import {fromChainAtom} from '@/store/core'
import {ethereumProviderAtom, evmChainIdAtom} from '@/store/ethers'
import {ethers} from 'ethers'
import {useAtom, useAtomValue} from 'jotai'
import useSWRImmutable from 'swr/immutable'

export const useEthersBrowserProvider = ():
  | ethers.BrowserProvider
  | undefined => {
  const [fromChain] = useAtom(fromChainAtom)
  const evmChainId = useAtomValue(evmChainIdAtom)
  const ethereumProvider = useAtomValue(ethereumProviderAtom)
  const {data} = useSWRImmutable(
    fromChain != null &&
      fromChain.chainType === 'Evm' &&
      evmChainIdMap[fromChain.name] === evmChainId &&
      ethereumProvider != null && [ethereumProvider, evmChainId],
    async ([ethereumProvider]) => {
      const provider = new ethers.BrowserProvider(ethereumProvider)
      return provider
    },
  )

  return data
}

// export const useEthersJsonRpcProvider = (
//   url?: string,
// ): ethers.JsonRpcProvider | undefined => {
//   const {data} = useSWRImmutable(url, async (url) => {
//     const {ethers} = await import('ethers')
//     return new ethers.JsonRpcProvider(url)
//   })
//   return data
// }
