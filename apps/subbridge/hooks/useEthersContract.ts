import chainBridgeAbi from '@/assets/chainbridge_abi.json'
import moonriverXTokensAbi from '@/assets/moonriver_xtokens_abi.json'
import tokenStandardAbi from '@/assets/token_standard_abi.json'
import {assetAtom, fromChainAtom} from '@/store/bridge'
import type {ethers} from 'ethers'
import {useAtomValue} from 'jotai'
import useSWRImmutable from 'swr/immutable'
import {useEthersProvider} from './useEthersProvider'

type AbiKind = 'chainBridge' | 'moonriverXTokens' | 'tokenStandard'
const abi: Record<AbiKind, ethers.ContractInterface> = {
  chainBridge: chainBridgeAbi,
  moonriverXTokens: moonriverXTokensAbi,
  tokenStandard: tokenStandardAbi,
}

const fetcher = async (
  provider: ethers.providers.Web3Provider,
  address: string,
  abiKind: AbiKind
) => {
  const {ethers} = await import('ethers')
  return new ethers.Contract(address, abi[abiKind], provider.getSigner())
}

export const useEthersAssetContract = () => {
  const fromChain = useAtomValue(fromChainAtom)
  const asset = useAtomValue(assetAtom)
  const address =
    fromChain.kind === 'evm'
      ? asset.erc20TokenContractAddress?.[fromChain.id]
      : undefined
  const provider = useEthersProvider()
  const {data} = useSWRImmutable(
    provider && address ? [provider, address, 'tokenStandard'] : null,
    fetcher
  )

  return data
}

export const useEthersXTokensContract = () => {
  const fromChain = useAtomValue(fromChainAtom)
  const provider = useEthersProvider()
  const address =
    fromChain.kind === 'evm' ? fromChain.xTokensContractAddress : undefined

  const {data} = useSWRImmutable(
    provider && address ? [provider, address, 'moonriverXTokens'] : null,
    fetcher
  )

  return data
}

export const useEthersChainBridgeContract = () => {
  const fromChain = useAtomValue(fromChainAtom)
  const provider = useEthersProvider()
  const address =
    fromChain.kind === 'evm'
      ? fromChain.chainBridgeContract?.address
      : undefined
  const {data} = useSWRImmutable(
    provider && address ? [provider, address, 'chainBridge'] : null,
    fetcher
  )

  return data
}
