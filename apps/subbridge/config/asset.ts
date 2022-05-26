import bncIcon from '@/assets/bnc_asset_icon.png'
import karIcon from '@/assets/kar_asset_icon.png'
import movrIcon from '@/assets/movr_asset_icon.png'
import phaIcon from '@/assets/pha_asset_icon.png'
import zlkIcon from '@/assets/zlk_asset_icon.png'
import Decimal from 'decimal.js'
import {StaticImageData} from 'next/image'
import {ChainId, EvmChainId} from './chain'

export type AssetId = 'pha' | 'movr' | 'kar' | 'zlk' | 'bnc'
export type OrmlToken = 'PHA' | 'KAR' | 'ZLK' | 'BNC'
export interface Asset {
  id: AssetId
  symbol: string
  icon: StaticImageData
  decimals: Partial<Record<ChainId, number>> & {default: number}
  xc20Address?: `0x${string}`
  khalaPalletAssetId?: number
  ormlToken?: OrmlToken
  erc20TokenContractAddress?: {
    [chainId in EvmChainId]?: `0x${string}`
  }
  chainBridgeResourceId?: `0x${string}`
  destChainTransactionFee: Partial<Record<ChainId, Decimal>>
  existentialDeposit: Partial<Record<ChainId, Decimal>>
}

export const ASSETS: Readonly<Record<AssetId, Asset>> = {
  pha: {
    id: 'pha',
    symbol: 'PHA',
    icon: phaIcon,
    ormlToken: 'PHA',
    xc20Address: '0xffffffff8e6b63d9e447b6d4c45bda8af9dc9603',
    erc20TokenContractAddress: {
      ethereum: '0x6c5bA91642F10282b576d91922Ae6448C9d52f4E',
      kovan: '0x512f7a3c14b6ee86c2015bc8ac1fe97e657f75f2',
      moonriver: '0xffFfFFff8E6b63d9e447B6d4C45BDA8AF9dc9603',
    },
    chainBridgeResourceId:
      '0x00e6dfb61a2fb903df487c401663825643bb825d41695e63df8af6162ab145a6',
    decimals: {ethereum: 18, kovan: 18, default: 12},
    destChainTransactionFee: {
      khala: new Decimal('0.064'),
      thala: new Decimal('0.064'),
      bifrost: new Decimal('0.0256'),
      'bifrost-test': new Decimal('0.0256'),
      karura: new Decimal('0.0512'),
      'karura-test': new Decimal('0.0512'),
      moonriver: new Decimal('0.05868512'),
      // heiko: new Decimal('0.0384'),
    },
    existentialDeposit: {
      khala: new Decimal('0.01'),
      thala: new Decimal('0.01'),
      karura: new Decimal('0.04'),
      'karura-test': new Decimal('0.04'),
      bifrost: new Decimal('0.04'),
      'bifrost-test': new Decimal('0.04'),
    },
  },
  movr: {
    id: 'movr',
    symbol: 'MOVR',
    icon: movrIcon,
    decimals: {default: 18},
    khalaPalletAssetId: 6,
    xc20Address: '0x0000000000000000000000000000000000000802',
    destChainTransactionFee: {
      moonriver: new Decimal('0.00008'),
      khala: new Decimal('0.000000000266666666'),
      thala: new Decimal('0.000000000266666666'),
    },
    existentialDeposit: {},
  },
  kar: {
    id: 'kar',
    symbol: 'KAR',
    icon: karIcon,
    ormlToken: 'KAR',
    decimals: {default: 12},
    khalaPalletAssetId: 1,
    destChainTransactionFee: {
      karura: new Decimal('0.0064'),
      'karura-test': new Decimal('0.0064'),
      khala: new Decimal('0.008'),
      thala: new Decimal('0.008'),
    },
    existentialDeposit: {
      karura: new Decimal('0.01'),
      'karura-test': new Decimal('0.01'),
      khala: new Decimal('0.01'),
      thala: new Decimal('0.01'),
    },
  },
  zlk: {
    id: 'zlk',
    symbol: 'ZLK',
    icon: zlkIcon,
    khalaPalletAssetId: 3,
    ormlToken: 'ZLK',
    destChainTransactionFee: {
      khala: new Decimal('0.000000016'),
      thala: new Decimal('0.000000016'),
      bifrost: new Decimal('0.0000000051'),
      'bifrost-test': new Decimal('0.0000000051'),
    },
    decimals: {default: 18},
    erc20TokenContractAddress: {
      moonriver: '0x0f47ba9d9Bde3442b42175e51d6A367928A1173B',
      'moonbase-alpha': '0xD8E0B625177f6A41260A36f9B88D574fBAc77a3A',
    },
    chainBridgeResourceId:
      '0x028da1efb56e124f659fa6d5d95b3cc541ce207cbfee2f4f066061cc92d37bae',
    existentialDeposit: {},
  },
  bnc: {
    id: 'bnc',
    symbol: 'BNC',
    icon: bncIcon,
    khalaPalletAssetId: 2,
    ormlToken: 'BNC',
    decimals: {default: 12},
    destChainTransactionFee: {
      bifrost: new Decimal('0.0051'),
      'bifrost-test': new Decimal('0.0051'),
      khala: new Decimal('0.016'),
      thala: new Decimal('0.016'),
    },
    existentialDeposit: {
      bifrost: new Decimal('0.01'),
      'bifrost-test': new Decimal('0.01'),
      khala: new Decimal('0.01'),
      thala: new Decimal('0.01'),
    },
  },
}
