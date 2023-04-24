import {keyBy} from 'lodash-es'

export enum ChainType {
  EVM = 1,
  Substrate = 2,
}

export interface Chain {
  id: number
  name: string
  endpoint: string
  chainType: ChainType
  nativeAsset: number
  foreignAssetType: number
  handlerContract: string
  txIndexer: string
  evmChainId?: number
  wsEndpoint?: string
}

export interface Asset {
  id: number
  symbol: string
  name: string
  location: string
  decimals: number
  chainId: number
}

export interface Config {
  chains: Chain[]
  assets: Asset[]
  chainMap: Record<number, Chain>
  assetMap: Record<number, Asset>
}

const evmChainIdMap = {
  Ethereum: 1,
  Moonbeam: 1284,
  Astar: 592,
}

const wsEndpointMap = {
  Phala: 'wss://api.phala.network/ws',
  Khala: 'wss://khala-api.phala.network/ws',
  Acala: 'wss://acala-rpc.dwellir.com',
}

export const fetchConfig = async (): Promise<Config> => {
  const res = await fetch('https://exprmt.site/assets')
  const config = await res.json()

  for (const chain of config.graph.chains) {
    if (chain.chainType === ChainType.EVM) {
      if (Object.hasOwn(evmChainIdMap, chain.name)) {
        chain.evmChainId =
          evmChainIdMap[chain.name as keyof typeof evmChainIdMap]
      }
    }

    if (
      chain.chainType === ChainType.Substrate &&
      Object.hasOwn(wsEndpointMap, chain.name)
    ) {
      chain.wsEndpoint = wsEndpointMap[chain.name as keyof typeof wsEndpointMap]
    }
  }

  return {
    chains: config.graph.chains,
    assets: config.graph.assets,
    chainMap: keyBy(config.graph.chains, 'id'),
    assetMap: keyBy(config.graph.assets, 'id'),
  }
}
