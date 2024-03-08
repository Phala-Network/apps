import type {AssetId} from './asset'
import type {ChainId} from './chain'

export type BridgeKind =
  | 'evmXTokens'
  | 'polkadotXTokens'
  | 'phalaXTransfer'
  | 'phalaSygma'
  | 'evmSygma'

type AssetsConfig = Array<{
  assetId: AssetId
  estimatedTime: string
  kind: BridgeKind
  proxy?: ChainId
  disabled?: boolean
}>

export interface Bridge {
  fromChain: ChainId
  toChains: Array<{
    id: ChainId
    assets: AssetsConfig
    disabled?: boolean
  }>
}

export const BRIDGES: Readonly<Bridge[]> = [
  {
    fromChain: 'ethereum',
    toChains: [
      {
        id: 'phala',
        assets: [{assetId: 'pha', estimatedTime: '~ 5 mins', kind: 'evmSygma'}],
      },
      {
        id: 'khala',
        assets: [{assetId: 'pha', estimatedTime: '~ 5 mins', kind: 'evmSygma'}],
      },
      {
        id: 'astar',
        assets: [
          {
            assetId: 'pha',
            estimatedTime: '~ 5 mins',
            kind: 'evmSygma',
            proxy: 'phala',
          },
        ],
      },
    ],
  },
  {
    fromChain: 'phala',
    toChains: [
      {
        id: 'ethereum',
        assets: [
          {
            assetId: 'pha',
            estimatedTime: '~ 10 mins',
            kind: 'phalaSygma',
          },
        ],
      },
      {
        id: 'moonbeam',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'phalaXTransfer'},
          {assetId: 'glmr', estimatedTime: '< 1 min', kind: 'phalaXTransfer'},
        ],
      },
      {
        id: 'astar',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'phalaXTransfer'},
          {assetId: 'astr', estimatedTime: '< 1 min', kind: 'phalaXTransfer'},
        ],
      },
      {
        id: 'acala',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'phalaXTransfer'},
          {assetId: 'aca', estimatedTime: '< 1 min', kind: 'phalaXTransfer'},
        ],
      },
    ],
  },
  {
    fromChain: 'khala',
    toChains: [
      {
        id: 'ethereum',
        assets: [
          {assetId: 'pha', estimatedTime: '~ 10 mins', kind: 'phalaSygma'},
        ],
      },
      {
        id: 'karura',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'phalaXTransfer'},
          {assetId: 'kar', estimatedTime: '< 1 min', kind: 'phalaXTransfer'},
          // {assetId: 'ausd', estimatedTime: '< 1 min', kind: 'phalaXTransfer'},
        ],
      },
      {
        id: 'moonriver',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'phalaXTransfer'},
          {assetId: 'movr', estimatedTime: '< 1 min', kind: 'phalaXTransfer'},
        ],
      },
      {
        id: 'bifrost-kusama',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'phalaXTransfer'},
          {assetId: 'bnc', estimatedTime: '< 1 min', kind: 'phalaXTransfer'},
        ],
      },
      {
        id: 'basilisk',
        assets: [
          {assetId: 'bsx', estimatedTime: '< 1 min', kind: 'phalaXTransfer'},
        ],
      },
      {
        id: 'turing',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'phalaXTransfer'},
          {assetId: 'tur', estimatedTime: '< 1 min', kind: 'phalaXTransfer'},
        ],
      },
      {
        id: 'calamari',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'phalaXTransfer'},
          {assetId: 'kma', estimatedTime: '< 1 min', kind: 'phalaXTransfer'},
        ],
      },
      {
        id: 'shiden',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'phalaXTransfer'},
          {assetId: 'sdn', estimatedTime: '< 1 min', kind: 'phalaXTransfer'},
        ],
      },
    ],
  },
  {
    fromChain: 'acala',
    toChains: [
      {
        id: 'phala',
        assets: [
          {assetId: 'aca', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
          // {assetId: 'ausd', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
        ],
      },
    ],
  },
  {
    fromChain: 'karura',
    toChains: [
      {
        id: 'khala',
        assets: [
          {assetId: 'kar', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
          // {assetId: 'ausd', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
        ],
      },
    ],
  },
  {
    fromChain: 'moonbeam',
    toChains: [
      {
        id: 'phala',
        assets: [
          {assetId: 'glmr', estimatedTime: '< 1 min', kind: 'evmXTokens'},
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'evmXTokens'},
        ],
      },
    ],
  },
  {
    fromChain: 'moonriver',
    toChains: [
      {
        id: 'khala',
        assets: [
          {assetId: 'movr', estimatedTime: '< 1 min', kind: 'evmXTokens'},
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'evmXTokens'},
        ],
      },
    ],
  },
  {
    fromChain: 'bifrost-kusama',
    toChains: [
      {
        id: 'khala',
        assets: [
          {assetId: 'bnc', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
        ],
      },
    ],
  },
  {
    fromChain: 'basilisk',
    toChains: [
      {
        id: 'khala',
        assets: [
          {assetId: 'bsx', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
        ],
      },
    ],
  },
  {
    fromChain: 'turing',
    toChains: [
      {
        id: 'khala',
        assets: [
          {assetId: 'tur', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
        ],
      },
    ],
  },
  {
    fromChain: 'calamari',
    toChains: [
      {
        id: 'khala',
        assets: [
          {assetId: 'kma', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
        ],
      },
    ],
  },
  {
    fromChain: 'shiden',
    toChains: [
      {
        id: 'khala',
        assets: [
          {assetId: 'sdn', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
        ],
      },
    ],
  },
  {
    fromChain: 'astar',
    toChains: [
      {
        id: 'phala',
        assets: [
          {assetId: 'astr', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
        ],
      },
      {
        id: 'ethereum',
        assets: [
          {
            assetId: 'pha',
            estimatedTime: '~ 5 mins',
            kind: 'polkadotXTokens',
            proxy: 'phala',
          },
        ],
      },
    ],
  },
  {
    fromChain: 'rhala',
    toChains: [
      {
        id: 'goerli',
        assets: [{assetId: 'pha', estimatedTime: '', kind: 'phalaSygma'}],
      },
    ],
  },
  {
    fromChain: 'goerli',
    toChains: [
      {
        id: 'rhala',
        assets: [{assetId: 'gpha', estimatedTime: '', kind: 'evmSygma'}],
      },
    ],
  },
]

export const ALL_FROM_CHAINS = BRIDGES.filter((bridge) =>
  bridge.toChains.some((x) => x.assets.length > 0),
).map((bridge) => bridge.fromChain)
