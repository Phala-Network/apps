import type {AssetId} from './asset'
import type {ChainId} from './chain'

export type BridgeKind =
  | 'evmXTokens'
  | 'polkadotXTokens'
  | 'phalaXTransfer'
  | 'phalaSygma'
  | 'evmSygma'
  | 'placeholder' // use as a placeholder, bridge feature is not supported

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
        assets: [
          {
            assetId: 'pha',
            estimatedTime: '~ 5 mins',
            kind: 'evmSygma',
          },
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
      {
        id: 'base',
        assets: [{assetId: 'pha', estimatedTime: '', kind: 'placeholder'}],
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
