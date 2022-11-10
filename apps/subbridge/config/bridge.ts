import {AssetId} from './asset'
import {ChainId} from './chain'

export type BridgeKind =
  | 'evmChainBridge'
  | 'evmXTokens'
  | 'polkadotXTokens'
  | 'khalaXTransfer'
  | 'polkadotXcm'

type AssetsConfig = {
  assetId: AssetId
  estimatedTime: string
  kind: BridgeKind
  isThroughKhala?: boolean
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
  // {assetId: 'ausd', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
]

const karuraToKhalaAssets: AssetsConfig = [
  {assetId: 'kar', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
  // {assetId: 'ausd', estimatedTime: '< 1 min', kind: 'polkadotXTokens'},
]

const khalaToMoonriverAssets: AssetsConfig = [
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
  {assetId: 'movr', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
  {assetId: 'zlk', estimatedTime: '~ 5 mins', kind: 'khalaXTransfer'},
]

const moonriverToKhalaAssets: AssetsConfig = [
  {assetId: 'movr', estimatedTime: '< 1 min', kind: 'evmXTokens'},
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'evmXTokens'},
  {assetId: 'zlk', estimatedTime: '< 3 mins', kind: 'evmChainBridge'},
]

const khalaToBifrostAssets: AssetsConfig = [
  {assetId: 'pha', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
  {assetId: 'bnc', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
  {assetId: 'zlk', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
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
    isThroughKhala: true,
  },
]

const bifrostToMoonriverAssets: AssetsConfig = [
  {
    assetId: 'zlk',
    estimatedTime: '~ 5 mins',
    kind: 'polkadotXTokens',
    isThroughKhala: true,
  },
]

export const BRIDGES: Readonly<Bridge[]> = [
  {
    fromChain: 'ethereum',
    toChains: [
      {
        id: 'phala',
        assets: [
          {
            assetId: 'pha',
            estimatedTime: '< 1 min',
            kind: 'evmChainBridge',
          },
        ],
      },
      {id: 'khala', assets: ethereumToKhalaAssets},
    ],
  },
  {
    fromChain: 'kovan',
    toChains: [{id: 'thala', assets: ethereumToKhalaAssets}],
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
            kind: 'khalaXTransfer',
          },
        ],
      },
      {
        id: 'moonbeam',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
          {assetId: 'glmr', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
        ],
      },
      {
        id: 'parallel',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
          {assetId: 'para', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
        ],
      },
      {
        id: 'astar',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
          {assetId: 'astr', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
        ],
      },
    ],
  },
  {
    fromChain: 'khala',
    toChains: [
      {id: 'ethereum', assets: khalaToEthereumAssets},
      {id: 'karura', assets: khalaToKaruraAssets},
      {id: 'moonriver', assets: khalaToMoonriverAssets},
      {id: 'bifrost', assets: khalaToBifrostAssets},
      {
        id: 'parallel-heiko',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
          {assetId: 'hko', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
        ],
      },
      {
        id: 'basilisk',
        assets: [
          {assetId: 'bsx', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
        ],
      },
      {
        id: 'turing',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
          {assetId: 'tur', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
        ],
      },
      {
        id: 'calamari',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
          {assetId: 'kma', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
        ],
      },
      {
        id: 'crab',
        assets: [
          {assetId: 'crab', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
        ],
      },
      {
        id: 'shiden',
        assets: [
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
          {assetId: 'sdn', estimatedTime: '< 1 min', kind: 'khalaXTransfer'},
        ],
      },
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
          {assetId: 'sdn', estimatedTime: '< 1 min', kind: 'polkadotXcm'},
          {assetId: 'pha', estimatedTime: '< 1 min', kind: 'polkadotXcm'},
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
    ],
  },
]

export const ALL_FROM_CHAINS = BRIDGES.filter((bridge) =>
  bridge.toChains.some((x) => x.assets.length > 0)
).map((bridge) => bridge.fromChain)
