import {type AssetId} from './asset'
import {type ChainId} from './chain'

export type BridgeKind =
  | 'evmChainBridge'
  | 'evmXTokens'
  | 'polkadotXTokens'
  | 'phalaChainBridge'
  | 'phalaSygma'
  | 'polkadotXcm'
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

const khalaToKaruraAssets: AssetsConfig = [
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
  {assetId: 'kar', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
  // {assetId: 'ausd', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
]

const karuraToKhalaAssets: AssetsConfig = [
  {assetId: 'kar', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
  // {assetId: 'ausd', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
]

const khalaToMoonriverAssets: AssetsConfig = [
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
  {assetId: 'movr', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
  {assetId: 'zlk', estimatedTime: '~ 5 mins', kind: 'phalaChainBridge'},
]

const moonriverToKhalaAssets: AssetsConfig = [
  {assetId: 'movr', estimatedTime: '< 1 min', kind: 'evmXTokens'},
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'evmXTokens'},
  {assetId: 'zlk', estimatedTime: '< 3 mins', kind: 'evmChainBridge'},
]

const khalaToBifrostAssets: AssetsConfig = [
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
  {assetId: 'bnc', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
  {assetId: 'zlk', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
]

const bifrostToKhalaAssets: AssetsConfig = [
  {assetId: 'bnc', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
  {assetId: 'zlk', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
]

const moonriverToBifrostAssets: AssetsConfig = [
  {
    assetId: 'zlk',
    estimatedTime: '< 3 mins',
    kind: 'evmChainBridge',
    proxy: 'khala',
  },
]

const bifrostToMoonriverAssets: AssetsConfig = [
  {
    assetId: 'zlk',
    estimatedTime: '~ 5 mins',
    kind: 'polkadotXTokens',
    proxy: 'khala',
  },
]

export const BRIDGES: Readonly<Bridge[]> = [
  {
    fromChain: 'ethereum',
    toChains: [
      {
        id: 'phala',
        assets: [
          {assetId: 'pha', estimatedTime: '~ 5 mins', kind: 'evmChainBridge'},
        ],
      },
      {
        id: 'khala',
        assets: [
          {assetId: 'pha', estimatedTime: '~ 5 mins', kind: 'evmChainBridge'},
        ],
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
            kind: 'phalaChainBridge',
          },
        ],
      },
      {
        id: 'moonbeam',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
          {assetId: 'glmr', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
        ],
      },
      {
        id: 'parallel',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
          {assetId: 'para', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
        ],
      },
      {
        id: 'astar',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
          {assetId: 'astr', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
        ],
      },
      {
        id: 'acala',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
          {assetId: 'aca', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
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
          {
            assetId: 'pha',
            estimatedTime: '~ 10 mins',
            kind: 'phalaChainBridge',
          },
        ],
      },
      {id: 'karura', assets: khalaToKaruraAssets},
      {id: 'moonriver', assets: khalaToMoonriverAssets},
      {id: 'bifrost-kusama', assets: khalaToBifrostAssets},
      {
        id: 'parallel-heiko',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
          {assetId: 'hko', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
        ],
      },
      {
        id: 'basilisk',
        assets: [
          {assetId: 'bsx', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
        ],
      },
      {
        id: 'turing',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
          {assetId: 'tur', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
        ],
      },
      {
        id: 'calamari',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
          {assetId: 'kma', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
        ],
      },
      {
        id: 'crab',
        assets: [
          {assetId: 'crab', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
        ],
      },
      {
        id: 'shiden',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
          {assetId: 'sdn', estimatedTime: '< 1 min', kind: 'phalaChainBridge'},
        ],
      },
    ],
  },
  {
    fromChain: 'thala',
    toChains: [
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
      {id: 'khala', assets: moonriverToKhalaAssets},
      {id: 'bifrost-kusama', assets: moonriverToBifrostAssets},
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
    fromChain: 'bifrost-kusama',
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
  {
    fromChain: 'parallel',
    toChains: [
      {
        id: 'phala',
        assets: [
          {assetId: 'para', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
        ],
      },
    ],
  },
  {
    fromChain: 'parallel-heiko',
    toChains: [
      {
        id: 'khala',
        assets: [
          {assetId: 'hko', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
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
    fromChain: 'crab',
    toChains: [
      {
        id: 'khala',
        assets: [
          {assetId: 'crab', estimatedTime: '< 1 min', kind: 'polkadotXcm'},
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
          {assetId: 'astr', estimatedTime: '< 1 min', kind: 'polkadotXcm'},
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'polkadotXcm'},
        ],
      },
      {
        id: 'ethereum',
        assets: [
          {
            assetId: 'pha',
            estimatedTime: '~ 5 mins',
            kind: 'polkadotXcm',
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
