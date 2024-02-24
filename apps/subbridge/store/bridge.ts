import {ASSETS, type AssetId} from '@/config/asset'
import {BRIDGES} from '@/config/bridge'
import {CHAINS, type ChainId} from '@/config/chain'
import {BRIDGE_ERROR_MESSAGES, type BridgeError} from '@/config/error'
import {polkadotAccountAtom} from '@phala/store'
import Decimal from 'decimal.js'
import {atom} from 'jotai'
import {atomWithReset} from 'jotai/utils'
import {evmAccountAtom} from './ethers'

export const amountAtom = atomWithReset('')
amountAtom.debugLabel = 'amount'

const assetIdAtom = atom<AssetId>('pha')
assetIdAtom.debugLabel = 'assetId'
export const assetAtom = atom(
  (get) => ASSETS[get(assetIdAtom)],
  (_get, set, update: AssetId) => {
    set(assetIdAtom, update)
  },
)

const fromChainIdAtom = atom<ChainId>('ethereum')
fromChainIdAtom.debugLabel = 'fromChainId'
export const fromChainAtom = atom(
  (get) => CHAINS[get(fromChainIdAtom)],
  (_get, set, update: ChainId) => {
    set(fromChainIdAtom, update)
  },
)

const toChainIdAtom = atom<ChainId>('phala')
toChainIdAtom.debugLabel = 'toChain'
export const toChainAtom = atom(
  (get) => CHAINS[get(toChainIdAtom)],
  (_get, set, update: ChainId) => {
    set(toChainIdAtom, update)
  },
)

export const fromAccountAtom = atom<string | null>((get) => {
  const fromChain = get(fromChainAtom)
  const polkadotAccount = get(polkadotAccountAtom)
  const evmAccount = get(evmAccountAtom)
  if (fromChain.kind === 'evm') {
    return evmAccount
  }
  if (fromChain.kind === 'substrate' && polkadotAccount != null) {
    return polkadotAccount.address
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

export const decimalsAtom = atom((get) => {
  const fromChain = get(fromChainAtom)
  const asset = get(assetAtom)
  return asset.decimals[fromChain.id] ?? asset.decimals.default
})

export const existentialDepositAtom = atom((get) => {
  const toChain = get(toChainAtom)
  const asset = get(assetAtom)
  const existentialDeposit = asset.existentialDeposit[toChain.id]

  if (existentialDeposit == null) {
    return new Decimal(0)
  }

  return existentialDeposit
})

export const bridgeInfoAtom = atom((get) => {
  const fromChain = get(fromChainAtom)
  const toChain = get(toChainAtom)
  const asset = get(assetAtom)
  const toChainConfig = BRIDGES.find(
    (bridge) => bridge.fromChain === fromChain.id,
  )?.toChains.find((x) => x.id === toChain.id)
  const bridge = toChainConfig?.assets.find(
    (assetConfig) => assetConfig.assetId === asset.id,
  )

  return {
    kind: bridge?.kind ?? null,
    estimatedTime: bridge?.estimatedTime ?? null,
    proxy: bridge?.proxy,
    disabled: toChainConfig?.disabled ?? bridge?.disabled ?? false,
  }
})

export const destChainTransactionFeeAtom = atom((get) => {
  const {kind, proxy} = get(bridgeInfoAtom)
  const toChain = get(toChainAtom)
  const asset = get(assetAtom)
  const destChainTransactionFee = asset.destChainTransactionFee[toChain.id]

  if (proxy != null) {
    const proxyFee = asset.destChainTransactionFee[proxy] ?? new Decimal(0)
    return proxyFee.add(destChainTransactionFee ?? 0)
  }

  if (kind === 'evmSygma' || destChainTransactionFee == null) {
    return new Decimal(0)
  }

  return destChainTransactionFee
})
