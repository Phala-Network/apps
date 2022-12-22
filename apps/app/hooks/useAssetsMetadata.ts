import {WPHA_ASSET_ID} from '@/config'
import type {ApiPromise} from '@polkadot/api'
import {hexToString} from '@polkadot/util'
import useSWRImmutable from 'swr/immutable'
import usePolkadotApi from './usePolkadotApi'

const iconMap: Record<string, string> = {
  PHA: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6841.png',
  // Khala
  KSM: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5034.png',
  SDN: 'https://s2.coinmarketcap.com/static/img/coins/64x64/11451.png',
  TUR: 'https://s2.coinmarketcap.com/static/img/coins/64x64/20340.png',
  aUSD: 'https://s2.coinmarketcap.com/static/img/coins/64x64/21406.png',
  CRAB: 'https://s2.coinmarketcap.com/static/img/coins/64x64/9243.png',
  MOVR: 'https://s2.coinmarketcap.com/static/img/coins/64x64/9285.png',
  BNC: 'https://s2.coinmarketcap.com/static/img/coins/64x64/8705.png',
  BSX: 'https://s2.coinmarketcap.com/static/img/coins/64x64/13672.png',
  HKO: 'https://s2.coinmarketcap.com/static/img/coins/64x64/10907.png',
  KMA: 'https://s2.coinmarketcap.com/static/img/coins/64x64/15305.png',
  KAR: 'https://s2.coinmarketcap.com/static/img/coins/64x64/10042.png',
  ZLK: 'https://s2.coinmarketcap.com/static/img/coins/64x64/15419.png',
  BIT: 'https://s2.coinmarketcap.com/static/img/coins/64x64/21974.png',
  NEER: 'https://s2.coinmarketcap.com/static/img/coins/64x64/14294.png',

  // Phala
  GLMR: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6836.png',
  ASTR: 'https://s2.coinmarketcap.com/static/img/coins/64x64/12885.png',
  DOT: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png',
  PARA: 'https://s2.coinmarketcap.com/static/img/coins/64x64/12887.png',
  AUSD: 'https://s2.coinmarketcap.com/static/img/coins/64x64/20411.png',
  ACA: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6756.png',
  RING: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5798.png',
  LDOT: 'https://s2.coinmarketcap.com/static/img/coins/64x64/20725.png',
}

export type AssetMetadata = {
  assetId: number
  name: string
  symbol: string
  decimals: number
  iconSrc?: string
}

export const phaMetadata: AssetMetadata = {
  assetId: -1,
  name: 'Phala Network',
  symbol: 'PHA',
  decimals: 12,
  iconSrc: iconMap['PHA'],
}

const assetsMetadataFetcher = async ([api]: [ApiPromise]) => {
  const entries = await api.query.assets.metadata.entries()
  const assetsMetadata: Record<number, AssetMetadata> = {}
  for (const [key, value] of entries) {
    const assetId = key.args[0].toNumber()
    const name = hexToString(value.name.toHex())
    const symbol = hexToString(value.symbol.toHex())
    const decimals = value.decimals.toNumber()
    const iconSrc = iconMap[symbol]
    if (assetId !== WPHA_ASSET_ID) {
      assetsMetadata[assetId] = {
        assetId,
        name,
        symbol,
        decimals,
        iconSrc,
      }
    }
  }
  return assetsMetadata
}

const useAssetsMetadata = () => {
  const api = usePolkadotApi()
  const {data} = useSWRImmutable(
    api ? [api, 'assetsMetadata'] : null,
    assetsMetadataFetcher
  )
  return data
}

export default useAssetsMetadata
