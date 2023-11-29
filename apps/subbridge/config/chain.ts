import acalaIcon from '@phala/ui/icons/chain/acala.png'
import astarIcon from '@phala/ui/icons/chain/astar.png'
import basiliskIcon from '@phala/ui/icons/chain/basilisk.png'
import bifrostIcon from '@phala/ui/icons/chain/bifrost.png'
import calamariIcon from '@phala/ui/icons/chain/calamari.png'
import ethereumIcon from '@phala/ui/icons/chain/ethereum.png'
import karuraIcon from '@phala/ui/icons/chain/karura.png'
import khalaIcon from '@phala/ui/icons/chain/khala.png'
import moonbaseAlphaIcon from '@phala/ui/icons/chain/moonbase_alpha.png'
import moonbeamIcon from '@phala/ui/icons/chain/moonbeam.png'
import moonriverIcon from '@phala/ui/icons/chain/moonriver.png'
import parallelIcon from '@phala/ui/icons/chain/parallel.png'
import parallelHeikoIcon from '@phala/ui/icons/chain/parallel_heiko.png'
import phalaIcon from '@phala/ui/icons/chain/phala.png'
import shidenIcon from '@phala/ui/icons/chain/shiden.png'
import turingIcon from '@phala/ui/icons/chain/turing.png'
import {type AssetId} from './asset'

export type EvmChainId =
  | 'ethereum'
  | 'moonbeam'
  | 'moonriver'
  | 'moonbase-alpha'
  | 'goerli'
export type SubstrateChainId =
  | 'phala'
  | 'khala'
  | 'acala'
  | 'karura'
  | 'rhala'
  | 'bifrost-kusama'
  | 'parallel'
  | 'parallel-heiko'
  | 'basilisk'
  | 'turing'
  | 'calamari'
  | 'shiden'
  | 'astar'
export type ChainId = EvmChainId | SubstrateChainId
export type ChainKind = 'evm' | 'substrate'

interface BaseChain {
  name: string
  icon: string
  kind: ChainKind
  isTest?: boolean
  nativeAsset?: AssetId
  explorerURL?: string
  sygmaChainId?: number
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
  generalIndex?: number
  sygmaHandler?: string
}

export interface SubstrateChain extends BaseChain {
  id: SubstrateChainId
  kind: 'substrate'
  endpoint: string | string[]
  ss58Format: number
  paraId: number
  relayChain: 'polkadot' | 'kusama'
  balanceSource: 'tokensPallet' | 'assetsPallet'
}

export type Chain = EvmChain | SubstrateChain

export const CHAINS: Readonly<
  Record<SubstrateChainId, SubstrateChain> & Record<EvmChainId, EvmChain>
> = {
  phala: {
    id: 'phala',
    name: 'Phala',
    icon: phalaIcon,
    kind: 'substrate',
    endpoint: [
      'wss://phala-rpc.dwellir.com',
      'wss://api.phala.network/ws',
      'wss://phala.api.onfinality.io/public-ws',
    ],
    ss58Format: 30,
    paraId: 2035,
    nativeAsset: 'pha',
    explorerURL: 'https://phala.subscan.io/',
    sygmaChainId: 5233,
    relayChain: 'polkadot',
    balanceSource: 'assetsPallet',
  },
  khala: {
    id: 'khala',
    name: 'Khala',
    icon: khalaIcon,
    kind: 'substrate',
    endpoint: [
      'wss://khala-rpc.dwellir.com',
      'wss://khala.api.onfinality.io/public-ws',
      'wss://khala-api.phala.network/ws',
    ],
    ss58Format: 30,
    paraId: 2004,
    nativeAsset: 'pha',
    explorerURL: 'https://khala.subscan.io/',
    sygmaChainId: 5232,
    relayChain: 'kusama',
    balanceSource: 'assetsPallet',
  },
  acala: {
    id: 'acala',
    name: 'Acala',
    icon: acalaIcon,
    kind: 'substrate',
    endpoint: [
      'wss://acala-rpc-0.aca-api.network',
      'wss://acala-rpc-1.aca-api.network',
      'wss://acala-rpc-3.aca-api.network/ws',
      'wss://acala-rpc.dwellir.com',
      'wss://acala-polkadot.api.onfinality.io/public-ws',
      'wss://acala.polkawallet.io',
    ],
    ss58Format: 10,
    paraId: 2000,
    nativeAsset: 'aca',
    explorerURL: 'https://acala.subscan.io/',
    relayChain: 'polkadot',
    balanceSource: 'tokensPallet',
  },
  karura: {
    id: 'karura',
    name: 'Karura',
    icon: karuraIcon,
    kind: 'substrate',
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
    relayChain: 'kusama',
    balanceSource: 'tokensPallet',
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
    generalIndex: 1,
    explorerURL: 'https://etherscan.io/',
    sygmaChainId: 1,
    sygmaHandler: '0xC832588193cd5ED2185daDA4A531e0B26eC5B830',
  },
  goerli: {
    id: 'goerli',
    name: 'Goerli',
    icon: ethereumIcon,
    kind: 'evm',
    evmChainId: 5,
    currencySymbol: 'GoerliETH',
    isTest: true,
    explorerURL: 'https://goerli.etherscan.io/',
    generalIndex: 1,
    sygmaChainId: 5,
    sygmaHandler: '0x7Ed4B14a82B2F2C4DfB13DC4Eac00205EDEff6C2',
  },
  rhala: {
    id: 'rhala',
    name: 'Rhala',
    icon: khalaIcon,
    kind: 'substrate',
    endpoint: 'wss://subbridge-test.phala.network/rhala/ws',
    ss58Format: 30,
    isTest: true,
    paraId: 2004,
    nativeAsset: 'pha',
    sygmaChainId: 5231,
    relayChain: 'kusama',
    balanceSource: 'assetsPallet',
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
    kind: 'substrate',
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
    relayChain: 'kusama',
    balanceSource: 'tokensPallet',
  },
  parallel: {
    id: 'parallel',
    name: 'Parallel',
    kind: 'substrate',
    icon: parallelIcon,
    paraId: 2012,
    endpoint: [
      'wss://rpc.parallel.fi',
      'wss://parallel.api.onfinality.io/public-ws',
    ],
    ss58Format: 172,
    nativeAsset: 'para',
    explorerURL: 'https://parallel.subscan.io/',
    relayChain: 'polkadot',
    balanceSource: 'assetsPallet',
  },
  'parallel-heiko': {
    id: 'parallel-heiko',
    name: 'Parallel Heiko',
    kind: 'substrate',
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
    relayChain: 'kusama',
    balanceSource: 'assetsPallet',
  },
  basilisk: {
    id: 'basilisk',
    name: 'Basilisk',
    icon: basiliskIcon,
    kind: 'substrate',
    paraId: 2090,
    endpoint: [
      'wss://rpc-01.basilisk.hydradx.io',
      'wss://basilisk.api.onfinality.io/public-ws',
      'wss://basilisk-rpc.dwellir.com',
    ],
    ss58Format: 10041,
    nativeAsset: 'bsx',
    explorerURL: 'https://basilisk.subscan.io/',
    relayChain: 'kusama',
    balanceSource: 'tokensPallet',
  },
  turing: {
    id: 'turing',
    name: 'Turing',
    icon: turingIcon,
    kind: 'substrate',
    paraId: 2114,
    endpoint: [
      'wss://rpc.turing.oak.tech',
      'wss://turing.api.onfinality.io/public-ws',
      'wss://turing-rpc.dwellir.com',
    ],
    ss58Format: 51,
    nativeAsset: 'tur',
    explorerURL: 'https://turing.subscan.io/',
    relayChain: 'kusama',
    balanceSource: 'tokensPallet',
  },
  calamari: {
    id: 'calamari',
    name: 'Calamari',
    icon: calamariIcon,
    kind: 'substrate',
    paraId: 2084,
    endpoint: [
      'wss://ws.calamari.systems/',
      'wss://calamari.api.onfinality.io/public-ws',
    ],
    ss58Format: 78,
    nativeAsset: 'kma',
    explorerURL: 'https://calamari.subscan.io/',
    relayChain: 'kusama',
    balanceSource: 'assetsPallet',
  },
  shiden: {
    id: 'shiden',
    name: 'Shiden',
    icon: shidenIcon,
    kind: 'substrate',
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
    relayChain: 'kusama',
    balanceSource: 'assetsPallet',
  },
  astar: {
    id: 'astar',
    name: 'Astar',
    icon: astarIcon,
    kind: 'substrate',
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
    relayChain: 'polkadot',
    balanceSource: 'assetsPallet',
  },
}
