import {assetMap, assets, type Asset} from '@/config/common'
import {ERROR_MESSAGES, type Error} from '@/config/error'
import {type Client, type EvmChain, type SubstrateChain} from '@phala/index'
import {polkadotAccountAtom} from '@phala/store'
import {atom} from 'jotai'
import {atomWithReset, atomWithStorage} from 'jotai/utils'
import {evmAccountAtom} from './ethers'

const getAssets = (chainId: string): Asset[] => {
  return assets.filter((x) => x.chainId === chainId)
}

export const clientAtom = atom<Client | undefined>(undefined)
export const chainInstanceAtom = atom<EvmChain | SubstrateChain | undefined>(
  (get) => {
    const client = get(clientAtom)
    const fromChain = get(fromChainAtom)
    if (client != null && fromChain != null) {
      if (fromChain.chainType === 'Evm') {
        return client.createEvmChain(fromChain.name)
      }
    }
  },
)
export const currentTaskAtom = atom<
  {id: string; fromChainId: string; hash: string} | undefined
>(undefined)

const fromChainIdAtom = atomWithStorage('jotai:from_chain_id', 'Moonbeam')
export const fromChainAtom = atom(
  (get) => get(clientAtom)?.chainMap.get(get(fromChainIdAtom)),
  (get, set, update: string) => {
    set(fromChainIdAtom, update)
    if (get(fromAssetAtom)?.chainId !== update) {
      set(fromAssetAtom, getAssets(update)[0]?.id)
    }
  },
)

const fromAssetIdAtom = atomWithStorage('jotai:from_asset_id', 'Moonbeam-WGLMR')
export const fromAssetAtom = atom(
  (get) => assetMap.get(get(fromAssetIdAtom)),
  (get, set, update: string) => {
    set(fromAssetIdAtom, update)
  },
)

export const fromAssetsAtom = atom((get) => getAssets(get(fromChainIdAtom)))

export const fromAmountAtom = atomWithReset('')

const toChainIdAtom = atomWithStorage('jotai:to_chain_id', 'AstarEvm')
export const toChainAtom = atom(
  (get) => get(clientAtom)?.chainMap.get(get(toChainIdAtom)),
  (get, set, update: string) => {
    set(toChainIdAtom, update)
    if (get(toAssetAtom)?.chainId !== update) {
      set(toAssetAtom, getAssets(update)[0]?.id)
    }
  },
)

const toAssetIdAtom = atomWithStorage('jotai:to_asset_id', 'AstarEvm-xcGLMR')
export const toAssetAtom = atom(
  (get) => assetMap.get(get(toAssetIdAtom)),
  (get, set, update: string) => {
    set(toAssetIdAtom, update)
  },
)

export const toAssetsAtom = atom((get) => getAssets(get(toChainIdAtom)))

export const toAmountAtom = atomWithReset('')

export const fromAccountAtom = atom<string | null>((get) => {
  const fromChain = get(fromChainAtom)
  const polkadotAccount = get(polkadotAccountAtom)
  const evmAccount = get(evmAccountAtom)
  if (fromChain?.chainType === 'Evm') {
    return evmAccount
  }
  if (fromChain?.chainType === 'Sub' && polkadotAccount != null) {
    return polkadotAccount.address
  }
  return null
})

export const destinationAccountAtom = atomWithReset('')

export const errorAtom = atom<Error | null>('InvalidAmount')

export const errorMessageAtom = atom<string | null>((get) => {
  const error = get(errorAtom)
  if (error === null) return null
  return ERROR_MESSAGES[error]
})
