import {AssetId} from './asset'
import {ChainId} from './chain'

type AssetConfig = {assetId: AssetId; estimatedTime: string}[]
export interface Bridge {
  fromChain: ChainId
  toChain: ChainId
  assets: AssetConfig
}

const ethereumToKhalaAssets: AssetConfig = [
  {
    assetId: 'pha',
    estimatedTime: '< 1 min',
  },
]

const khalaToEthereumAssets: AssetConfig = [
  {
    assetId: 'pha',
    estimatedTime: '~ 10 mins',
  },
]

const khalaToKaruraAssets: AssetConfig = [
  {
    assetId: 'pha',
    estimatedTime: '< 1 min',
  },
  {
    assetId: 'kar',
    estimatedTime: '< 1 min',
  },
]

const karuraToKhalaAssets = khalaToKaruraAssets

const khalaToMoonriverAssets: AssetConfig = [
  {
    assetId: 'pha',
    estimatedTime: '< 1 min',
  },
  {
    assetId: 'movr',
    estimatedTime: '< 1 min',
  },
]

const moonriverToKhalaAssets = khalaToMoonriverAssets

const khalaToBifrostAssets: AssetConfig = [
  {
    assetId: 'pha',
    estimatedTime: '< 1 min',
  },
  {
    assetId: 'bnc',
    estimatedTime: '< 1 min',
  },
]

const bifrostToKhalaAssets = khalaToBifrostAssets

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
]

export const ALL_FROM_CHAINS = [
  ...new Set(BRIDGES.map((bridge) => bridge.fromChain)),
]
