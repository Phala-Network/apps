import {AssetId} from './asset'
import {ChainId} from './chain'

export type BridgeKind =
  | 'evmChainBridge'
  | 'evmXTokens'
  | 'polkadotXTokens'
  | 'khalaXTransfer'

type AssetsConfig = {
  assetId: AssetId
  estimatedTime: string
  kind: BridgeKind
}[]

export interface Bridge {
  fromChain: ChainId
  toChains: {
    id: ChainId
    assets: AssetsConfig
  }[]
}

const ethereumToKhalaAssets: AssetsConfig = [
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'evmChainBridge'},
]

const khalaToEthereumAssets: AssetsConfig = [
  {assetId: 'pha', estimatedTime: '~ 10 mins', kind: 'khalaXTransfer'},
]

const khalaToKaruraAssets: AssetsConfig = [
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
  {assetId: 'kar', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
]

const karuraToKhalaAssets: AssetsConfig = [
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
  {assetId: 'kar', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
]

const khalaToMoonriverAssets: AssetsConfig = [
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
  {assetId: 'movr', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
  // {assetId: 'zlk', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
]

const moonriverToKhalaAssets: AssetsConfig = [
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'evmXTokens'},
  {assetId: 'movr', estimatedTime: '< 1 min', kind: 'evmXTokens'},
  // {assetId: 'zlk', estimatedTime: '< 3 mins', kind: 'evmChainBridge'},
]

const khalaToBifrostAssets: AssetsConfig = [
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
  {assetId: 'bnc', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
]

const bifrostToKhalaAssets: AssetsConfig = [
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
  {assetId: 'bnc', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
]

const moonriverToBifrostAssets: AssetsConfig = [
  // {assetId: 'zlk', estimatedTime: '< 1 min', kind: 'evmChainBridge'},
]

const bifrostToMoonriverAssets: AssetsConfig = [
  // {assetId: 'zlk', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
]

export const BRIDGES: Readonly<Bridge[]> = [
  {
    fromChain: 'ethereum',
    toChains: [{id: 'khala', assets: ethereumToKhalaAssets}],
  },
  {
    fromChain: 'kovan',
    toChains: [{id: 'thala', assets: ethereumToKhalaAssets}],
  },
  {
    fromChain: 'khala',
    toChains: [
      {id: 'ethereum', assets: khalaToEthereumAssets},
      {id: 'karura', assets: khalaToKaruraAssets},
      {id: 'moonriver', assets: khalaToMoonriverAssets},
      {id: 'bifrost', assets: khalaToBifrostAssets},
    ],
  },
  {
    fromChain: 'thala',
    toChains: [
      {id: 'kovan', assets: khalaToEthereumAssets},
      {id: 'karura-test', assets: khalaToKaruraAssets},
      {id: 'moonbase-alpha', assets: khalaToMoonriverAssets},
      {id: 'bifrost-test', assets: khalaToBifrostAssets},
    ],
  },
  {
    fromChain: 'karura',
    toChains: [{id: 'khala', assets: karuraToKhalaAssets}],
  },
  {
    fromChain: 'karura-test',
    toChains: [{id: 'thala', assets: karuraToKhalaAssets}],
  },
  {
    fromChain: 'moonriver',
    toChains: [
      {id: 'khala', assets: moonriverToKhalaAssets},
      {id: 'bifrost', assets: moonriverToBifrostAssets},
    ],
  },
  {
    fromChain: 'moonbase-alpha',
    toChains: [
      {id: 'thala', assets: moonriverToKhalaAssets},
      {id: 'bifrost-test', assets: moonriverToBifrostAssets},
    ],
  },
  {
    fromChain: 'bifrost',
    toChains: [
      {id: 'khala', assets: bifrostToKhalaAssets},
      {id: 'moonriver', assets: bifrostToMoonriverAssets},
    ],
  },
  {
    fromChain: 'bifrost-test',
    toChains: [
      {id: 'thala', assets: bifrostToKhalaAssets},
      {id: 'moonbase-alpha', assets: bifrostToMoonriverAssets},
    ],
  },
]

export const ALL_FROM_CHAINS = BRIDGES.filter((bridge) =>
  bridge.toChains.some((x) => x.assets.length > 0)
).map((bridge) => bridge.fromChain)
