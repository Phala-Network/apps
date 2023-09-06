import {ASSETS} from '@phala/index'

export const evmChainIdMap: Record<string, number> = {
  Ethereum: 1,
  Moonbeam: 1284,
  AstarEvm: 592,
}

export interface Asset {
  id: string
  chainId: string
  location: string
  symbol: string
  decimals: number
}

export const assets: Asset[] = Object.entries(ASSETS)
  .map(([chainId, value]) => {
    return Object.entries(value).map(([symbol, location]) => {
      return {
        id: `${chainId}-${symbol}`,
        chainId,
        location,
        symbol,
        decimals: 18,
      }
    })
  })
  .flat()

export const assetMap = new Map<string, Asset>(
  assets.map((asset) => [asset.id, asset]),
)
