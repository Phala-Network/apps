import {assetAtom, fromChainAtom} from '@/store/bridge'
import {ethersProviderAtom} from '@/store/ethers'
import type {ethers} from 'ethers'
import {useAtom} from 'jotai'
import useSWRImmutable from 'swr/immutable'

const fetcher = async (
  provider: ethers.providers.Web3Provider,
  address: string,
  abi: ethers.ContractInterface
) => {
  const {ethers} = await import('ethers')
  return new ethers.Contract(address, abi, provider.getSigner())
}

export const useEthersContract = (
  contract: 'assetContract' | 'bridgeContract'
) => {
  const [fromChain] = useAtom(fromChainAtom)
  const [asset] = useAtom(assetAtom)
  const [provider] = useAtom(ethersProviderAtom)
  const address =
    fromChain.kind === 'evm'
      ? asset[contract]?.[fromChain.id]?.address
      : undefined

  const abi =
    fromChain.kind === 'evm' ? asset[contract]?.[fromChain.id]?.abi : undefined
  const {data} = useSWRImmutable(
    provider && address && abi ? [provider, address, abi] : null,
    fetcher
  )

  return data
}
