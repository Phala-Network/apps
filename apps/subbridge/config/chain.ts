import bifrostIcon from '@/assets/bifrost_chain_icon.png'
import ethereumIcon from '@/assets/ethereum_chain_icon.jpg'
import karuraIcon from '@/assets/karura_chain_icon.png'
import khalaIcon from '@/assets/khala_chain_icon.jpg'
import moonriverIcon from '@/assets/moonriver_chain_icon.png'
import {StaticImageData} from 'next/image'
import {AssetId} from './asset'

export type EvmChainId = 'ethereum' | 'kovan' | 'moonriver' | 'moonbase-alpha'
export type PolkadotChainId =
  | 'khala'
  | 'karura'
  | 'thala'
  | 'karura-test'
  | 'bifrost'
  | 'bifrost-test'
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
  paraId?: number // for compatible chains
  chainBridgeContract?: {
    address: `0x${string}`
    spender: `0x${string}`
  }
  xTokensContractAddress?: `0x${string}`
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
    nativeAsset: 'kar',
  },
  ethereum: {
    id: 'ethereum',
    name: 'Ethereum',
    icon: ethereumIcon,
    kind: 'evm',
    evmChainId: 1,
    currencySymbol: 'ETH',
    chainBridgeContract: {
      address: '0x8F92e7353b180937895E0C5937d616E8ea1A2Bb9',
      spender: '0xEEc0fb4913119567cDfC0c5fc2Bf8f9F9B226c2d',
    },
  },
  kovan: {
    id: 'kovan',
    name: 'Kovan',
    icon: ethereumIcon,
    kind: 'evm',
    evmChainId: 42,
    currencySymbol: 'kETH',
    isTest: true,
    chainBridgeContract: {
      address: '0x82db1f1717487cADEAf6F0C74825495d6D89E08e',
      spender: '0xF69b08D649B744A4d4781CB1B86E30Cc9Ac9991b',
    },
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
    nativeAsset: 'kar',
  },
  moonriver: {
    id: 'moonriver',
    name: 'Moonriver',
    icon: moonriverIcon,
    kind: 'evm',
    evmChainId: 1285,
    currencySymbol: 'MOVR',
    paraId: 2023,
    nativeAsset: 'movr',
    chainBridgeContract: {
      address: '0xCe6652551A989C13B41f70cac504341A5F711c8d',
      spender: '0xf88337a0db6e24Dff0fCD7F92ab0655B97A68d38',
    },
    xTokensContractAddress: '0x0000000000000000000000000000000000000804',
  },
  'moonbase-alpha': {
    id: 'moonbase-alpha',
    name: 'Moonbase Alpha',
    icon: moonriverIcon,
    kind: 'evm',
    evmChainId: 1287,
    currencySymbol: 'DEV',
    chainBridgeContract: {
      address: '0x1e4ED6d37685D2FB254e47C5b58Cf95173326E4c',
      spender: '0x0B674CC89F54a47Be4Eb6C1A125bB8f04A529181',
    },
    isTest: true,
  },
  bifrost: {
    id: 'bifrost',
    name: 'Bifrost',
    icon: bifrostIcon,
    kind: 'polkadot',
    endpoint: [
      'wss://bifrost-rpc.liebi.com/ws',
      'wss://us.bifrost-rpc.liebi.com/ws',
      'wss://eu.bifrost-rpc.liebi.com/ws',
      'wss://bifrost-parachain.api.onfinality.io/public-ws',
      'wss://bifrost-rpc.dwellir.com',
    ],
    ss58Format: 6,
    paraId: 2001,
    nativeAsset: 'bnc',
  },
  'bifrost-test': {
    id: 'bifrost-test',
    name: 'Bifrost Test',
    icon: bifrostIcon,
    kind: 'polkadot',
    endpoint: 'wss://bridge-testnet-api.phala.network/bifrost/ws',
    ss58Format: 6,
    paraId: 2001,
    nativeAsset: 'bnc',
    isTest: true,
  },
}
