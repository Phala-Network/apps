import Decimal from 'decimal.js'
import {AssetId} from './asset'
import {ChainId} from './chain'

export interface Bridge {
  fromChain: ChainId
  toChain: ChainId
  asset: AssetId
  estimatedTime: string
  existentialDeposit?: Decimal
}

export const BRIDGES: Readonly<Bridge[]> = [
  {
    fromChain: 'ethereum',
    toChain: 'khala',
    asset: 'pha',
    estimatedTime: '< 1 min',
    existentialDeposit: new Decimal('0.01'),
  },
  {
    fromChain: 'khala',
    toChain: 'ethereum',
    asset: 'pha',
    estimatedTime: '~ 10 mins',
  },
  {
    fromChain: 'kovan',
    toChain: 'thala',
    asset: 'pha',
    estimatedTime: '< 1 min',
    existentialDeposit: new Decimal('0.01'),
  },
  {
    fromChain: 'thala',
    toChain: 'kovan',
    asset: 'pha',
    estimatedTime: '> 24 hrs',
  },
  {
    fromChain: 'karura',
    toChain: 'khala',
    asset: 'pha',
    estimatedTime: '< 1 min',
    existentialDeposit: new Decimal('0.01'),
  },
  {
    fromChain: 'khala',
    toChain: 'karura',
    asset: 'pha',
    estimatedTime: '< 1 min',
    existentialDeposit: new Decimal('0.04'),
  },
  {
    fromChain: 'karura-test',
    toChain: 'thala',
    asset: 'pha',
    estimatedTime: '< 1 min',
    existentialDeposit: new Decimal('0.01'),
  },
  {
    fromChain: 'thala',
    toChain: 'karura-test',
    asset: 'pha',
    estimatedTime: '< 1 min',
    existentialDeposit: new Decimal('0.04'),
  },
  {
    fromChain: 'moonriver',
    toChain: 'khala',
    asset: 'pha',
    estimatedTime: '< 1 min',
    existentialDeposit: new Decimal(0.01),
  },
  {
    fromChain: 'khala',
    toChain: 'moonriver',
    asset: 'pha',
    estimatedTime: '< 1 min',
  },
  {
    fromChain: 'moonriver',
    toChain: 'khala',
    asset: 'movr',
    estimatedTime: '< 1 min',
  },
  {
    fromChain: 'khala',
    toChain: 'moonriver',
    asset: 'movr',
    estimatedTime: '< 1 min',
  },
  {
    fromChain: 'khala',
    toChain: 'karura',
    asset: 'kar',
    estimatedTime: '< 1 min',
    existentialDeposit: new Decimal('0.1'),
  },
  {
    fromChain: 'thala',
    toChain: 'karura-test',
    asset: 'kar',
    estimatedTime: '< 1 min',
    existentialDeposit: new Decimal('0.1'),
  },
  {
    fromChain: 'karura',
    toChain: 'khala',
    asset: 'kar',
    estimatedTime: '< 1 min',
  },
  {
    fromChain: 'karura-test',
    toChain: 'thala',
    asset: 'kar',
    estimatedTime: '< 1 min',
  },
  {
    fromChain: 'bifrost',
    toChain: 'khala',
    asset: 'bnc',
    estimatedTime: '< 1 min',
  },
  {
    fromChain: 'khala',
    toChain: 'bifrost',
    asset: 'bnc',
    estimatedTime: '< 1 min',
    existentialDeposit: new Decimal('0.01'),
  },
  {
    fromChain: 'bifrost',
    toChain: 'khala',
    asset: 'pha',
    estimatedTime: '< 1 min',
  },
  {
    fromChain: 'khala',
    toChain: 'bifrost',
    asset: 'pha',
    estimatedTime: '< 1 min',
  },
  {
    fromChain: 'bifrost-test',
    toChain: 'thala',
    asset: 'bnc',
    estimatedTime: '< 1 min',
  },
  {
    fromChain: 'thala',
    toChain: 'bifrost-test',
    asset: 'bnc',
    estimatedTime: '< 1 min',
    existentialDeposit: new Decimal('0.01'),
  },
  {
    fromChain: 'bifrost-test',
    toChain: 'thala',
    asset: 'pha',
    estimatedTime: '< 1 min',
  },
  {
    fromChain: 'thala',
    toChain: 'bifrost-test',
    asset: 'pha',
    estimatedTime: '< 1 min',
  },
]

export const ALL_FROM_CHAINS = [
  ...new Set(BRIDGES.map((bridge) => bridge.fromChain)),
]
