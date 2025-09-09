import acalaIcon from '@phala/ui/icons/chain/acala.png'
import astarIcon from '@phala/ui/icons/chain/astar.png'
import baseIcon from '@phala/ui/icons/chain/base.png'
import ethereumIcon from '@phala/ui/icons/chain/ethereum.png'
import moonbeamIcon from '@phala/ui/icons/chain/moonbeam.png'
import phalaIcon from '@phala/ui/icons/chain/phala.png'
import type {AssetId} from './asset'

export type EvmChainId = 'ethereum' | 'moonbeam' | 'goerli' | 'base'
export type SubstrateChainId = 'phala' | 'acala' | 'rhala' | 'astar'
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
    icon: phalaIcon.src,
    kind: 'substrate',
    endpoint: [
      'wss://phala-rpc.n.dwellir.com',
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
  acala: {
    id: 'acala',
    name: 'Acala',
    icon: acalaIcon.src,
    kind: 'substrate',
    endpoint: [
      'wss://acala-rpc-0.aca-api.network',
      'wss://acala-rpc-1.aca-api.network',
      'wss://acala-rpc-3.aca-api.network/ws',
      'wss://acala-rpc.n.dwellir.com',
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
  ethereum: {
    id: 'ethereum',
    name: 'Ethereum',
    icon: ethereumIcon.src,
    kind: 'evm',
    evmChainId: 1,
    currencySymbol: 'ETH',
    generalIndex: 1,
    explorerURL: 'https://etherscan.io/',
    sygmaChainId: 1,
    sygmaHandler: '0xC832588193cd5ED2185daDA4A531e0B26eC5B830',
  },
  base: {
    id: 'base',
    name: 'Base',
    icon: baseIcon.src,
    kind: 'evm',
    evmChainId: 8453,
    currencySymbol: 'ETH',
  },
  goerli: {
    id: 'goerli',
    name: 'Goerli',
    icon: ethereumIcon.src,
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
    icon: phalaIcon.src,
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
    icon: moonbeamIcon.src,
    kind: 'evm',
    evmChainId: 1284,
    currencySymbol: 'GLMR',
    paraId: 2004,
    nativeAsset: 'glmr',
    xTokensContractAddress: '0x0000000000000000000000000000000000000804',
    explorerURL: 'https://moonbeam.moonscan.io/',
  },
  astar: {
    id: 'astar',
    name: 'Astar',
    icon: astarIcon.src,
    kind: 'substrate',
    paraId: 2006,
    endpoint: [
      'wss://rpc.astar.network',
      'wss://astar.public.blastapi.io',
      'wss://astar-rpc.n.dwellir.com',
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
