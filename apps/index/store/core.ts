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
export const solutionStringAtom = atomWithStorage(
  'jotai:solution-v2',
  '[\n  {\n    "exe": "moonbeam_stellaswap",\n    "sourceChain": "Moonbeam",\n    "destChain": "Moonbeam",\n    "spendAsset": "0xAcc15dC74880C9944775448304B263D191c6077F",\n    "receiveAsset": "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080"\n  },\n  {\n    "exe": "moonbeam_stellaswap",\n    "sourceChain": "Moonbeam",\n    "destChain": "Moonbeam",\n    "spendAsset": "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080",\n    "receiveAsset": "0xFFFfFfFf63d24eCc8eB8a7b5D0803e900F7b6cED"\n  },\n  {\n    "exe": "moonbeam_bridge_to_phala",\n    "sourceChain": "Moonbeam",\n    "destChain": "Phala",\n    "spendAsset": "0xFFFfFfFf63d24eCc8eB8a7b5D0803e900F7b6cED",\n    "receiveAsset": "0x0000"\n  },\n  {\n    "exe": "phala_bridge_to_astar",\n    "sourceChain": "Phala",\n    "destChain": "Astar",\n    "spendAsset": "0x0000",\n    "receiveAsset": "0x010100cd1f"\n  },\n  {\n    "exe": "astar_bridge_to_astarevm",\n    "sourceChain": "Astar",\n    "destChain": "AstarEvm",\n    "spendAsset": "0x010100cd1f",\n    "receiveAsset": "0xFFFFFFFF00000000000000010000000000000006"\n  },\n  {\n    "exe": "astar_evm_arthswap",\n    "sourceChain": "AstarEvm",\n    "destChain": "AstarEvm",\n    "spendAsset": "0xFFFFFFFF00000000000000010000000000000006",\n    "receiveAsset": "0xaeaaf0e2c81af264101b9129c00f4440ccf0f720"\n  },\n  {\n    "exe": "astar_evm_arthswap",\n    "sourceChain": "AstarEvm",\n    "destChain": "AstarEvm",\n    "spendAsset": "0xaeaaf0e2c81af264101b9129c00f4440ccf0f720",\n    "receiveAsset": "0xFFFFFFFF00000000000000010000000000000003"\n  }\n]',
)
export const solutionAtom = atom((get) => {
  try {
    const value = JSON.parse(get(solutionStringAtom))
    if (get(clientAtom)?.validateSolution(value) === true) {
      return value
    }
  } catch (err) {
    // noop
  }
})
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
