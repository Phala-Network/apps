import handlerAbi from '@/assets/handler_abi.json'
import tokenStandardAbi from '@/assets/token_standard_abi.json'
import {fromAssetAtom} from '@/store/core'
import type {ethers} from 'ethers'
import {useAtom} from 'jotai'
import useSWRImmutable from 'swr/immutable'
import {useEthersBrowserProvider} from './useEthersProvider'

type AbiKind = 'tokenStandard' | 'handler'
const abi: Record<AbiKind, ethers.InterfaceAbi> = {
  tokenStandard: tokenStandardAbi,
  handler: handlerAbi,
}

const fetcher = async ([provider, address, abiKind]: [
  ethers.BrowserProvider | ethers.JsonRpcProvider,
  string,
  AbiKind,
]): Promise<ethers.Contract> => {
  const {ethers} = await import('ethers')
  return new ethers.Contract(
    address,
    abi[abiKind],
    provider instanceof ethers.BrowserProvider
      ? await provider.getSigner()
      : provider, // JsonRpcProvider is readonly
  )
}

// export function useEthersAssetContract(
//   provider:
//     | ethers.providers.Web3Provider
//     | ethers.providers.JsonRpcProvider
//     | undefined
//   // chainId: EvmChainId,
//   // assetId: AssetId
// ): ethers.Contract | undefined {
//   // const address = ASSETS[assetId].erc20TokenContractAddress?.[chainId]

//   const address = ''

//   const {data} = useSWRImmutable(
//     provider != null && address != null && [provider, address, 'tokenStandard'],
//     fetcher
//   )

//   return data
// }

// export const useEthersHandlerContract = (
//   provider: ethers.BrowserProvider | ethers.JsonRpcProvider | undefined,
//   address?: string,
// ): ethers.Contract | undefined => {
//   const {data} = useSWRImmutable(
//     provider != null && address != null && [provider, address, 'handler'],
//     fetcher,
//   )

//   return data
// }

export const useCurrentEthersAssetContract = ():
  | ethers.Contract
  | undefined => {
  const [fromAsset] = useAtom(fromAssetAtom)
  const provider = useEthersBrowserProvider()
  const {data} = useSWRImmutable(
    provider != null && fromAsset != null
      ? [provider, fromAsset.location, 'tokenStandard']
      : null,
    fetcher,
  )

  return data
}

// export const useEthersXTokensContract = (): ethers.Contract | undefined => {
//   const fromChain = useAtomValue(fromChainAtom)
//   const provider = useEthersWeb3Provider()
//   const address =
//     fromChain.kind === 'evm' ? fromChain.xTokensContractAddress : undefined

//   const {data} = useSWRImmutable(
//     provider != null && address != null
//       ? [provider, address, 'moonriverXTokens']
//       : null,
//     fetcher
//   )

//   return data
// }

// export const useEthersChainBridgeContract = (): ethers.Contract | undefined => {
//   const fromChain = useAtomValue(fromChainAtom)
//   const provider = useEthersWeb3Provider()
//   const address =
//     fromChain.kind === 'evm'
//       ? fromChain.chainBridgeContract?.address
//       : undefined
//   const {data} = useSWRImmutable(
//     provider != null && address != null
//       ? [provider, address, 'chainBridge']
//       : null,
//     fetcher
//   )

//   return data
// }
