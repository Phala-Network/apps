import ethereumIcon from '@/assets/ethereum_chain_icon.jpg'
import karuraIcon from '@/assets/karura_chain_icon.jpg'
import khalaIcon from '@/assets/khala_chain_icon.jpg'
import moonriverIcon from '@/assets/moonriver_chain_icon.png'
import {StaticImageData} from 'next/image'
import {AssetId} from './asset'

export type EvmChainId = 'ethereum' | 'kovan' | 'moonriver'
export type PolkadotChainId = 'khala' | 'karura' | 'thala' | 'karura-test'
export type ChainId = EvmChainId | PolkadotChainId
export type ChainKind = 'evm' | 'polkadot'

interface BaseChain {
  name: string
  icon: StaticImageData
  kind: ChainKind
  isTest?: boolean
  nativeAsset?: AssetId
}

export interface EvmChain extends BaseChain {
  id: EvmChainId
  kind: 'evm'
  evmChainId: number
  currencySymbol: string
  isSubstrateCompatible?: boolean
  paraId?: number // for compatible chains
}

export interface PolkadotChain extends BaseChain {
  id: PolkadotChainId
  kind: 'polkadot'
  endpoint: string | string[]
  ss58Format: number
  paraId: number
}

export type Chain = EvmChain | PolkadotChain

export const CHAINS: Readonly<
  Record<PolkadotChainId, PolkadotChain> & Record<EvmChainId, EvmChain>
> = {
  khala: {
    id: 'khala',
    name: 'Khala',
    icon: khalaIcon,
    kind: 'polkadot',
    endpoint: [
      'wss://khala-api.phala.network/ws',
      'wss://khala.api.onfinality.io/public-ws',
      'wss://khala-rpc.dwellir.com',
    ],
    ss58Format: 30,
    paraId: 2004,
    nativeAsset: 'pha',
  },
  karura: {
    id: 'karura',
    name: 'Karura',
    icon: karuraIcon,
    kind: 'polkadot',
    endpoint: [
      'wss://karura-rpc-0.aca-api.network',
      'wss://karura-rpc-1.aca-api.network',
      'wss://karura-rpc-2.aca-api.network',
      'wss://karura-rpc-3.aca-api.network',
      'wss://karura.polkawallet.io',
      'wss://karura.api.onfinality.io/public-ws',
      'wss://karura-rpc.dwellir.com',
    ],
    ss58Format: 8,
    paraId: 2000,
  },
  ethereum: {
    id: 'ethereum',
    name: 'Ethereum',
    icon: ethereumIcon,
    kind: 'evm',
    evmChainId: 1,
    currencySymbol: 'ETH',
  },
  kovan: {
    id: 'kovan',
    name: 'Kovan',
    icon: ethereumIcon,
    kind: 'evm',
    evmChainId: 42,
    currencySymbol: 'kETH',
    isTest: true,
  },
  thala: {
    id: 'thala',
    name: 'Thala',
    icon: khalaIcon,
    kind: 'polkadot',
    endpoint: 'wss://bridge-testnet-api.phala.network/thala/ws',
    ss58Format: 30,
    isTest: true,
    paraId: 2004,
    nativeAsset: 'pha',
  },
  'karura-test': {
    id: 'karura-test',
    name: 'Karura Test',
    icon: karuraIcon,
    kind: 'polkadot',
    endpoint: 'wss://bridge-testnet-api.phala.network/karura/ws',
    ss58Format: 8,
    isTest: true,
    paraId: 2000,
  },
  moonriver: {
    id: 'moonriver',
    name: 'Moonriver',
    icon: moonriverIcon,
    kind: 'evm',
    evmChainId: 1285,
    currencySymbol: 'MOVR',
    paraId: 2023,
    isSubstrateCompatible: true,
    nativeAsset: 'movr',
  },
}
