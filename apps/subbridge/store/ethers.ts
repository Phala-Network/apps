import type {ethers} from 'ethers'
import {atom} from 'jotai'
import {fromChainAtom} from './bridge'

export const ethersWeb3ProviderAtom =
  atom<ethers.providers.Web3Provider | null>(null)
export const evmAccountAtom = atom<string | null>(null)
export const evmChainIdAtom = atom<number | null>(null)
export const isNetworkWrongAtom = atom<boolean>((get) => {
  const evmChainId = get(evmChainIdAtom)
  const fromChain = get(fromChainAtom)
  return (
    evmChainId !== undefined &&
    fromChain.kind === 'evm' &&
    fromChain.evmChainId !== evmChainId
  )
})
