import {AssetId} from './asset'
import {ChainId} from './chain'

export type BridgeKind =
  | 'evmChainBridge'
  | 'evmXTokens'
  | 'polkadotXTokens'
  | 'khalaXTransfer'
type AssetConfig = {assetId: AssetId; estimatedTime: string; kind: BridgeKind}[]

export interface Bridge {
  fromChain: ChainId
  toChain: ChainId
  assets: AssetConfig
}

const ethereumToKhalaAssets: AssetConfig = [
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'evmChainBridge'},
]

const khalaToEthereumAssets: AssetConfig = [
  {assetId: 'pha', estimatedTime: '~ 10 mins', kind: 'khalaXTransfer'},
]

const khalaToKaruraAssets: AssetConfig = [
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
  {assetId: 'kar', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
]

const karuraToKhalaAssets: AssetConfig = [
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
  {assetId: 'kar', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
]

const khalaToMoonriverAssets: AssetConfig = [
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
  {assetId: 'movr', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
]

const moonriverToKhalaAssets: AssetConfig = [
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'evmXTokens'},
  {assetId: 'movr', estimatedTime: '< 1 min', kind: 'evmXTokens'},
]

const khalaToBifrostAssets: AssetConfig = [
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
  {assetId: 'bnc', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
]

const bifrostToKhalaAssets: AssetConfig = [
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
  {assetId: 'bnc', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
]

export const BRIDGES: Readonly<Bridge[]> = [
  {
    fromChain: 'ethereum',
    toChain: 'khala',
    assets: ethereumToKhalaAssets,
  },
  {
    fromChain: 'kovan',
    toChain: 'thala',
    assets: ethereumToKhalaAssets,
  },
  {
    fromChain: 'khala',
    toChain: 'ethereum',
    assets: khalaToEthereumAssets,
  },
  {
    fromChain: 'thala',
    toChain: 'kovan',
    assets: khalaToEthereumAssets,
  },
  {
    fromChain: 'karura',
    toChain: 'khala',
    assets: karuraToKhalaAssets,
  },
  {
    fromChain: 'karura-test',
    toChain: 'thala',
    assets: karuraToKhalaAssets,
  },
  {
    fromChain: 'khala',
    toChain: 'karura',
    assets: khalaToKaruraAssets,
  },
  {
    fromChain: 'thala',
    toChain: 'karura-test',
    assets: khalaToKaruraAssets,
  },
  {
    fromChain: 'moonriver',
    toChain: 'khala',
    assets: moonriverToKhalaAssets,
  },
  {
    fromChain: 'khala',
    toChain: 'moonriver',
    assets: khalaToMoonriverAssets,
  },
  {
    fromChain: 'bifrost',
    toChain: 'khala',
    assets: bifrostToKhalaAssets,
  },
  {
    fromChain: 'khala',
    toChain: 'bifrost',
    assets: khalaToBifrostAssets,
  },
  {
    fromChain: 'bifrost-test',
    toChain: 'thala',
    assets: bifrostToKhalaAssets,
  },
  {
    fromChain: 'thala',
    toChain: 'bifrost-test',
    assets: khalaToBifrostAssets,
  },
  {
    fromChain: 'moonbase-alpha',
    toChain: 'khala',
    assets: [
      {assetId: 'zlk', estimatedTime: '< 3 mins', kind: 'evmChainBridge'},
    ],
  },
]

export const ALL_FROM_CHAINS = [
  ...new Set(BRIDGES.map((bridge) => bridge.fromChain)),
]
