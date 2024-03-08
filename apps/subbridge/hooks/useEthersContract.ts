import moonriverXTokensAbi from '@/assets/moonriver_xtokens_abi.json'
import tokenStandardAbi from '@/assets/token_standard_abi.json'
import {ASSETS, type AssetId} from '@/config/asset'
import type {EvmChainId} from '@/config/chain'
import {assetAtom, fromChainAtom} from '@/store/bridge'
import {ethers} from 'ethers'
import {useAtomValue} from 'jotai'
import useSWRImmutable from 'swr/immutable'
import {useEthersWeb3Provider} from './useEthersProvider'

type AbiKind = 'moonriverXTokens' | 'tokenStandard'
const abi: Record<AbiKind, ethers.ContractInterface> = {
  moonriverXTokens: moonriverXTokensAbi,
  tokenStandard: tokenStandardAbi,
}

const fetcher = async ([provider, address, abiKind]: [
  ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider,
  string,
  AbiKind,
]): Promise<ethers.Contract> => {
  return new ethers.Contract(
    address,
    abi[abiKind],
    provider instanceof ethers.providers.Web3Provider
      ? provider.getSigner()
      : provider, // JsonRpcProvider is readonly
  )
}

export function useEthersAssetContract(
  provider:
    | ethers.providers.Web3Provider
    | ethers.providers.JsonRpcProvider
    | undefined,
  chainId: EvmChainId,
  assetId: AssetId,
): ethers.Contract | undefined {
  const address = ASSETS[assetId].erc20TokenContractAddress?.[chainId]

  const {data} = useSWRImmutable(
    provider != null && address != null
      ? [provider, address, 'tokenStandard' as AbiKind]
      : null,
    fetcher,
  )

  return data
}

export const useCurrentEthersAssetContract = ():
  | ethers.Contract
  | undefined => {
  const fromChain = useAtomValue(fromChainAtom)
  const asset = useAtomValue(assetAtom)
  const address =
    fromChain.kind === 'evm'
      ? asset.erc20TokenContractAddress?.[fromChain.id]
      : undefined
  const provider = useEthersWeb3Provider()
  const {data} = useSWRImmutable(
    provider != null && address != null
      ? [provider, address, 'tokenStandard' as AbiKind]
      : null,
    fetcher,
  )

  return data
}

export const useEthersXTokensContract = (): ethers.Contract | undefined => {
  const fromChain = useAtomValue(fromChainAtom)
  const provider = useEthersWeb3Provider()
  const address =
    fromChain.kind === 'evm' ? fromChain.xTokensContractAddress : undefined

  const {data} = useSWRImmutable(
    provider != null && address != null
      ? [provider, address, 'moonriverXTokens' as AbiKind]
      : null,
    fetcher,
  )

  return data
}
