import astarIcon from '@/assets/astar_chain_icon.png'
import basiliskIcon from '@/assets/basilisk_chain_icon.png'
import bifrostIcon from '@/assets/bifrost_chain_icon.svg'
import calamariIcon from '@/assets/calamari_chain_icon.png'
import crabChainIcon from '@/assets/crab_chain_icon.svg'
import ethereumIcon from '@/assets/ethereum_chain_icon.jpg'
import karuraIcon from '@/assets/karura_chain_icon.png'
import khalaIcon from '@/assets/khala_chain_icon.svg'
import moonbaseAlphaIcon from '@/assets/moonbase_alpha_chain_icon.png'
import moonbeamIcon from '@/assets/moonbeam_chain_icon.png'
import moonriverIcon from '@/assets/moonriver_chain_icon.png'
import parallelIcon from '@/assets/parallel_chain_icon.svg'
import parallelHeikoIcon from '@/assets/parallel_heiko_chain_icon.svg'
import phalaIcon from '@/assets/phala_chain_icon.svg'
import shidenIcon from '@/assets/shiden_chain_icon.png'
import turingIcon from '@/assets/turing_chain_icon.png'
import {type AssetId} from './asset'

export type EvmChainId =
  | 'ethereum'
  | 'moonbeam'
  | 'moonriver'
  | 'moonbase-alpha'
export type PolkadotChainId =
  | 'phala'
  | 'khala'
  | 'karura'
  | 'thala'
  | 'karura-test'
  | 'bifrost-kusama'
  | 'bifrost-test'
  | 'parallel'
  | 'parallel-heiko'
  | 'basilisk'
  | 'turing'
  | 'calamari'
  | 'crab'
  | 'shiden'
  | 'astar'
export type ChainId = EvmChainId | PolkadotChainId
export type ChainKind = 'evm' | 'polkadot'

interface BaseChain {
  name: string
  icon: string
  kind: ChainKind
  isTest?: boolean
  nativeAsset?: AssetId
  explorerURL?: string
}

export interface EvmChain extends BaseChain {
  id: EvmChainId
  kind: 'evm'
  evmChainId: number
  currencySymbol: string
  paraId?: number // for compatible chains
  chainBridgeContract?: {
    address: `0x${string}`
    spender: {
      [toChainId in ChainId | 'default']?: `0x${string}`
    }
  }
  xTokensContractAddress?: `0x${string}`
  generalIndex?: number // for khala chain bridge
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
  phala: {
    id: 'phala',
    name: 'Phala',
    icon: phalaIcon,
    kind: 'polkadot',
    endpoint: ['wss://api.phala.network/ws'],
    ss58Format: 30,
    paraId: 2035,
    nativeAsset: 'pha',
    explorerURL: 'https://phala.subscan.io/',
  },
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
    explorerURL: 'https://khala.subscan.io/',
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
    explorerURL: 'https://karura.subscan.io/',
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
      spender: {
        phala: '0xcd38b15a419491c7c1238b0659f65c755792e257',
        khala: '0xEEc0fb4913119567cDfC0c5fc2Bf8f9F9B226c2d',
      },
    },
    generalIndex: 0,
    explorerURL: 'https://etherscan.io/',
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
  moonbeam: {
    id: 'moonbeam',
    name: 'Moonbeam',
    icon: moonbeamIcon,
    kind: 'evm',
    evmChainId: 1284,
    currencySymbol: 'GLMR',
    paraId: 2004,
    nativeAsset: 'glmr',
    xTokensContractAddress: '0x0000000000000000000000000000000000000804',
    explorerURL: 'https://moonbeam.moonscan.io/',
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
      spender: {default: '0xf88337a0db6e24Dff0fCD7F92ab0655B97A68d38'},
    },
    xTokensContractAddress: '0x0000000000000000000000000000000000000804',
    generalIndex: 2,
    explorerURL: 'https://moonriver.moonscan.io/',
  },
  'moonbase-alpha': {
    id: 'moonbase-alpha',
    name: 'Moonbase Alpha',
    icon: moonbaseAlphaIcon,
    kind: 'evm',
    evmChainId: 1287,
    currencySymbol: 'DEV',
    chainBridgeContract: {
      address: '0x1e4ED6d37685D2FB254e47C5b58Cf95173326E4c',
      spender: {default: '0x0B674CC89F54a47Be4Eb6C1A125bB8f04A529181'},
    },
    isTest: true,
    generalIndex: 2,
    explorerURL: 'https://moonbase.moonscan.io/',
  },
  'bifrost-kusama': {
    id: 'bifrost-kusama',
    name: 'Bifrost Kusama',
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
    explorerURL: 'https://bifrost-kusama.subscan.io',
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
  parallel: {
    id: 'parallel',
    name: 'Parallel',
    kind: 'polkadot',
    icon: parallelIcon,
    paraId: 2012,
    endpoint: [
      'wss://rpc.parallel.fi',
      'wss://parallel.api.onfinality.io/public-ws',
    ],
    ss58Format: 172,
    nativeAsset: 'para',
    explorerURL: 'https://parallel.subscan.io/',
  },
  'parallel-heiko': {
    id: 'parallel-heiko',
    name: 'Parallel Heiko',
    kind: 'polkadot',
    icon: parallelHeikoIcon,
    paraId: 2085,
    endpoint: [
      'wss://heiko-rpc.parallel.fi',
      'wss://parallel-heiko.api.onfinality.io/public-ws',
      'wss://heiko-rpc.dwellir.com',
    ],
    ss58Format: 110,
    nativeAsset: 'hko',
    explorerURL: 'https://parallel-heiko.subscan.io/',
  },
  basilisk: {
    id: 'basilisk',
    name: 'Basilisk',
    icon: basiliskIcon,
    kind: 'polkadot',
    paraId: 2090,
    endpoint: [
      'wss://rpc-01.basilisk.hydradx.io',
      'wss://basilisk.api.onfinality.io/public-ws',
      'wss://basilisk-rpc.dwellir.com',
    ],
    ss58Format: 10041,
    nativeAsset: 'bsx',
    explorerURL: 'https://basilisk.subscan.io/',
  },
  turing: {
    id: 'turing',
    name: 'Turing',
    icon: turingIcon,
    kind: 'polkadot',
    paraId: 2114,
    endpoint: [
      'wss://rpc.turing.oak.tech',
      'wss://turing.api.onfinality.io/public-ws',
      'wss://turing-rpc.dwellir.com',
    ],
    ss58Format: 51,
    nativeAsset: 'tur',
    explorerURL: 'https://turing.subscan.io/',
  },
  calamari: {
    id: 'calamari',
    name: 'Calamari',
    icon: calamariIcon,
    kind: 'polkadot',
    paraId: 2084,
    endpoint: [
      'wss://ws.calamari.systems/',
      'wss://calamari.api.onfinality.io/public-ws',
    ],
    ss58Format: 78,
    nativeAsset: 'kma',
    explorerURL: 'https://calamari.subscan.io/',
  },
  crab: {
    id: 'crab',
    name: 'Crab',
    icon: crabChainIcon,
    kind: 'polkadot',
    paraId: 2105,
    endpoint: ['wss://crab-parachain-rpc.darwinia.network/'],
    ss58Format: 42,
    nativeAsset: 'crab',
    explorerURL: 'https://crab.subscan.io/',
  },
  shiden: {
    id: 'shiden',
    name: 'Shiden',
    icon: shidenIcon,
    kind: 'polkadot',
    paraId: 2007,
    endpoint: [
      'wss://rpc.shiden.astar.network',
      'wss://shiden.public.blastapi.io',
      'wss://shiden-rpc.dwellir.com',
      'wss://shiden.api.onfinality.io/public-ws',
    ],
    ss58Format: 5,
    nativeAsset: 'sdn',
    explorerURL: 'https://shiden.subscan.io/',
  },
  astar: {
    id: 'astar',
    name: 'Astar',
    icon: astarIcon,
    kind: 'polkadot',
    paraId: 2006,
    endpoint: [
      'wss://rpc.astar.network',
      'wss://astar.public.blastapi.io',
      'wss://astar-rpc.dwellir.com',
      'wss://astar.api.onfinality.io/public-ws',
      'wss://1rpc.io/astr',
    ],
    ss58Format: 5,
    nativeAsset: 'astr',
    explorerURL: 'https://astar.subscan.io/',
  },
}
