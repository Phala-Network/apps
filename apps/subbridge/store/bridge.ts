import {Asset, AssetId, ASSETS} from '@/config/asset'
import {BridgeKind, BRIDGES} from '@/config/bridge'
import {Chain, ChainId, CHAINS} from '@/config/chain'
import {BridgeError, BRIDGE_ERROR_MESSAGES} from '@/config/error'
import {polkadotAccountAtom} from '@phala/store'
import Decimal from 'decimal.js'
import {atom} from 'jotai'
import {atomWithReset} from 'jotai/utils'
import {evmAccountAtom} from './ethers'

export const amountAtom = atomWithReset('')
amountAtom.debugLabel = 'amount'

const assetIdAtom = atom<AssetId>('pha')
assetIdAtom.debugLabel = 'assetId'
export const assetAtom = atom<Asset, AssetId>(
  (get) => ASSETS[get(assetIdAtom)],
  (get, set, update) => {
    set(assetIdAtom, update)
  }
)

const fromChainIdAtom = atom<ChainId>('ethereum')
fromChainIdAtom.debugLabel = 'fromChainId'
export const fromChainAtom = atom<Chain, ChainId>(
  (get) => CHAINS[get(fromChainIdAtom)],
  (get, set, update) => {
    set(fromChainIdAtom, update)
  }
)

const toChainIdAtom = atom<ChainId>('khala')
toChainIdAtom.debugLabel = 'toChain'
export const toChainAtom = atom<Chain, ChainId>(
  (get) => CHAINS[get(toChainIdAtom)],
  (get, set, update) => {
    set(toChainIdAtom, update)
  }
)

export const fromAccountAtom = atom<string | null>((get) => {
  const fromChain = get(fromChainAtom)
  const polkadotAccount = get(polkadotAccountAtom)
  const evmAccount = get(evmAccountAtom)
  if (fromChain.kind === 'evm') {
    return evmAccount
  }
  if (fromChain.kind === 'polkadot') {
    return polkadotAccount && polkadotAccount.address
  }
  return null
})

export const destinationAccountAtom = atomWithReset('')

export const bridgeErrorAtom = atom<BridgeError | null>('InvalidAmount')

export const bridgeErrorMessageAtom = atom<string | null>((get) => {
  const error = get(bridgeErrorAtom)
  if (error === null) return null
  return BRIDGE_ERROR_MESSAGES[error]
})

export const decimalsAtom = atom<number>((get) => {
  const fromChain = get(fromChainAtom)
  const asset = get(assetAtom)
  return asset.decimals[fromChain.id] ?? asset.decimals.default
})

export const existentialDepositAtom = atom<Decimal>((get) => {
  const toChain = get(toChainAtom)
  const asset = get(assetAtom)
  const existentialDeposit = asset.existentialDeposit[toChain.id]

  if (!existentialDeposit) {
    return new Decimal(0)
  }

  return existentialDeposit
})

export const bridgeInfoAtom = atom<{
  kind: BridgeKind | null
  estimatedTime: string | null
}>((get) => {
  const fromChain = get(fromChainAtom)
  const toChain = get(toChainAtom)
  const asset = get(assetAtom)
  const bridge = BRIDGES.find((bridge) => bridge.fromChain === fromChain.id)
    ?.toChains.find((x) => x.id === toChain.id)
    ?.assets.find((assetConfig) => assetConfig.assetId === asset.id)

  return {
    kind: bridge?.kind ?? null,
    estimatedTime: bridge?.estimatedTime ?? null,
  }
})

export const destChainTransactionFeeAtom = atom<Decimal>((get) => {
  const {kind} = get(bridgeInfoAtom)
  const toChain = get(toChainAtom)
  const asset = get(assetAtom)
  const destChainTransactionFee = asset.destChainTransactionFee[toChain.id]

  if (kind === 'evmChainBridge' || !destChainTransactionFee) {
    return new Decimal(0)
  }

  return destChainTransactionFee
})
