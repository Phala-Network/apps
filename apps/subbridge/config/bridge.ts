import Decimal from 'decimal.js'
import {AssetId} from './asset'
import {ChainId} from './chain'

export interface Bridge {
  fromChain: ChainId
  toChain: ChainId
  asset: AssetId
  estimatedTime: string
  destChainTransactionFee?: Decimal
  existentialDeposit?: Decimal
}

export const BRIDGES: Readonly<Bridge[]> = [
  {
    fromChain: 'ethereum',
    toChain: 'khala',
    asset: 'pha',
    estimatedTime: '< 1 min',
    destChainTransactionFee: new Decimal(0),
    existentialDeposit: new Decimal('0.01'),
  },
  {
    fromChain: 'khala',
    toChain: 'ethereum',
    asset: 'pha',
    estimatedTime: '~ 10 mins',
    destChainTransactionFee: new Decimal(0),
  },
  {
    fromChain: 'kovan',
    toChain: 'thala',
    asset: 'pha',
    estimatedTime: '< 1 min',
    destChainTransactionFee: new Decimal(0),
    existentialDeposit: new Decimal('0.01'),
  },
  {
    fromChain: 'thala',
    toChain: 'kovan',
    asset: 'pha',
    estimatedTime: '> 24 hrs',
    destChainTransactionFee: new Decimal(0),
  },
  {
    fromChain: 'karura',
    toChain: 'khala',
    asset: 'pha',
    estimatedTime: '< 1 min',
    destChainTransactionFee: new Decimal('0.064'),
    existentialDeposit: new Decimal('0.01'),
  },
  {
    fromChain: 'khala',
    toChain: 'karura',
    asset: 'pha',
    estimatedTime: '< 1 min',
    destChainTransactionFee: new Decimal('0.0512'),
    existentialDeposit: new Decimal('0.04'),
  },
  {
    fromChain: 'karura-test',
    toChain: 'thala',
    asset: 'pha',
    estimatedTime: '< 1 min',
    destChainTransactionFee: new Decimal('0.064'),
    existentialDeposit: new Decimal('0.01'),
  },
  {
    fromChain: 'thala',
    toChain: 'karura-test',
    asset: 'pha',
    estimatedTime: '< 1 min',
    destChainTransactionFee: new Decimal('0.0512'),
    existentialDeposit: new Decimal('0.04'),
  },
  {
    fromChain: 'moonriver',
    toChain: 'khala',
    asset: 'pha',
    estimatedTime: '< 1 min',
    destChainTransactionFee: new Decimal('0.064'),
    existentialDeposit: new Decimal(0.01),
  },
  {
    fromChain: 'khala',
    toChain: 'moonriver',
    asset: 'pha',
    estimatedTime: '< 1 min',
    destChainTransactionFee: new Decimal('0.05868512'),
    existentialDeposit: new Decimal(0),
  },
  {
    fromChain: 'moonriver',
    toChain: 'khala',
    asset: 'movr',
    estimatedTime: '< 1 min',
    destChainTransactionFee: new Decimal('0.000000000266666666'),
    existentialDeposit: new Decimal(0),
  },
  {
    fromChain: 'khala',
    toChain: 'moonriver',
    asset: 'movr',
    estimatedTime: '< 1 min',
    destChainTransactionFee: new Decimal('0.00008'),
    existentialDeposit: new Decimal(0),
  },
]

export const ALL_FROM_CHAINS = [
  ...new Set(BRIDGES.map((bridge) => bridge.fromChain)),
]
