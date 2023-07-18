import type {ethers} from 'ethers'
import {atom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'
import {fromChainAtom} from './bridge'

export const isEvmWalletAuthorizedAtom = atomWithStorage(
  'jotai:is_evm_wallet_authorized',
  false,
)
export const ethereumProviderAtom =
  atom<ethers.providers.ExternalProvider | null>(null)
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
