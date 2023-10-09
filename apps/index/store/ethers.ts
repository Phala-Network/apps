import {evmChainIdMap} from '@/config/common'
import {type ethers} from 'ethers'
import {atom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'
import {fromChainAtom} from './core'

export const isEvmWalletAuthorizedAtom = atomWithStorage(
  'jotai:is_evm_wallet_authorized',
  true,
)
export const ethereumProviderAtom = atom<ethers.Eip1193Provider | null>(null)
export const evmAccountAtom = atom<string | null>(null)
export const evmChainIdAtom = atom<number | null>(null)
export const isNetworkWrongAtom = atom<boolean>((get) => {
  const evmChainId = get(evmChainIdAtom)
  const fromChain = get(fromChainAtom)
  return (
    evmChainId !== undefined &&
    fromChain != null &&
    fromChain.chainType === 'Evm' &&
    evmChainIdMap[fromChain.name] !== evmChainId
  )
})
