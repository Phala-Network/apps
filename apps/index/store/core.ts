import {ERROR_MESSAGES, type Error} from '@/config/error'
import {ChainType, type Config} from '@/lib/fetchConfig'
import {polkadotAccountAtom} from '@phala/store'
import {atom} from 'jotai'
import {atomWithReset, atomWithStorage} from 'jotai/utils'
import {evmAccountAtom} from './ethers'

export const configAtom = atom<Config>({
  chains: [],
  assets: [],
  chainMap: {},
  assetMap: {},
})
configAtom.debugLabel = 'config'

const fromChainIdAtom = atomWithStorage('jotai:from_chain_id', 2)
export const fromChainAtom = atom(
  (get) => get(configAtom).chainMap[get(fromChainIdAtom)],
  (get, set, update: number | string) => {
    const chainId = Number(update)
    set(fromChainIdAtom, chainId)
    if (get(fromAssetAtom).chainId !== chainId) {
      set(fromAssetAtom, get(fromAssetsAtom)[0].id)
    }
  },
)
fromChainAtom.debugLabel = 'fromChain'

const fromAssetIdAtom = atomWithStorage('jotai:from_asset_id', 4)
export const fromAssetAtom = atom(
  (get) => get(configAtom).assetMap[get(fromAssetIdAtom)],
  (get, set, update: number | string) => {
    const assetId = Number(update)
    set(fromAssetIdAtom, assetId)
  },
)
fromAssetAtom.debugLabel = 'fromAsset'

export const fromAssetsAtom = atom((get) =>
  get(configAtom).assets.filter(
    (asset) => asset.chainId === get(fromChainIdAtom),
  ),
)

export const fromAmountAtom = atomWithReset('')
fromAmountAtom.debugLabel = 'fromAmount'

const toChainIdAtom = atomWithStorage('jotai:to_chain_id', 1)
export const toChainAtom = atom(
  (get) => get(configAtom).chainMap[get(toChainIdAtom)],
  (get, set, update: number | string) => {
    const chainId = Number(update)
    set(toChainIdAtom, chainId)
    if (get(toAssetAtom).chainId !== chainId) {
      set(toAssetAtom, get(toAssetsAtom)[0].id)
    }
  },
)
toChainAtom.debugLabel = 'toChain'

const toAssetIdAtom = atomWithStorage('jotai:to_asset_id', 7)
export const toAssetAtom = atom(
  (get) => get(configAtom).assetMap[get(toAssetIdAtom)],
  (get, set, update: number | string) => {
    set(toAssetIdAtom, Number(update))
  },
)
toAssetAtom.debugLabel = 'toAsset'

export const toAssetsAtom = atom((get) =>
  get(configAtom).assets.filter(
    (asset) => asset.chainId === get(toChainIdAtom),
  ),
)

export const toAmountAtom = atomWithReset('')
toAmountAtom.debugLabel = 'toAmount'

export const fromAccountAtom = atom<string | null>((get) => {
  const fromChain = get(fromChainAtom)
  const polkadotAccount = get(polkadotAccountAtom)
  const evmAccount = get(evmAccountAtom)
  if (fromChain.chainType === ChainType.EVM) {
    return evmAccount
  }
  if (fromChain.chainType === ChainType.Substrate && polkadotAccount != null) {
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

// export const existentialDepositAtom = atom((get) => {
//   const toChain = get(toChainAtom)
//   const asset = get(fromAssetAtom)
//   const existentialDeposit = asset.existentialDeposit[toChain.id]

//   if (existentialDeposit == null) {
//     return new Decimal(0)
//   }

//   return existentialDeposit
// })

// export const infoAtom = atom((get) => {
//   const fromChain = get(fromChainAtom)
//   const toChain = get(toChainAtom)
//   const asset = get(fromAssetAtom)
//   const toChainConfig = BRIDGES.find(
//     (bridge) => bridge.fromChain === fromChain.id
//   )?.toChains.find((x) => x.id === toChain.id)
//   const bridge = toChainConfig?.assets.find(
//     (assetConfig) => assetConfig.assetId === asset.id
//   )

//   return {
//     kind: bridge?.kind ?? null,
//     estimatedTime: bridge?.estimatedTime ?? null,
//     isThroughKhala: bridge?.isThroughKhala ?? false,
//     disabled: toChainConfig?.disabled ?? bridge?.disabled ?? false,
//   }
// })

// export const destChainTransactionFeeAtom = atom((get) => {
//   const {kind, isThroughKhala} = get(infoAtom)
//   const toChain = get(toChainAtom)
//   const asset = get(fromAssetAtom)
//   const destChainTransactionFee = asset.destChainTransactionFee[toChain.id]
//   const khalaFee = asset.destChainTransactionFee.khala ?? new Decimal(0)

//   if (kind !== 'evmChainBridge' && isThroughKhala) {
//     return khalaFee.add(destChainTransactionFee ?? 0)
//   }

//   if (
//     (kind === 'evmChainBridge' && !isThroughKhala) ||
//     destChainTransactionFee == null
//   ) {
//     return new Decimal(0)
//   }

//   return destChainTransactionFee
// })
