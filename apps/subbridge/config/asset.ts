import bncIcon from '@/assets/bnc_asset_icon.png'
import karIcon from '@/assets/kar_asset_icon.png'
import moonriverXtokensAbi from '@/assets/moonriver_xtokens_abi.json'
import movrIcon from '@/assets/movr_asset_icon.png'
import phaIcon from '@/assets/pha_asset_icon.png'
import phaEthereumBridgeAbi from '@/assets/pha_ethereum_bridge_abi.json'
import tokenStandardAbi from '@/assets/token_standard_abi.json'
import zlkIcon from '@/assets/zlk_asset_icon.png'
import Decimal from 'decimal.js'
import type {ethers} from 'ethers'
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
  assetContract?: {
    [chainId in EvmChainId]?: {
      address: `0x${string}`
      abi: ethers.ContractInterface
      spender?: `0x${string}`
    }
  }
  bridgeContract?: {
    [chainId in EvmChainId]?: {
      address: `0x${string}`
      resourceId?: `0x${string}`
      abi: ethers.ContractInterface
    }
  }
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
    assetContract: {
      ethereum: {
        address: '0x6c5bA91642F10282b576d91922Ae6448C9d52f4E',
        abi: tokenStandardAbi,
        spender: '0xEEc0fb4913119567cDfC0c5fc2Bf8f9F9B226c2d',
      },
      kovan: {
        address: '0x512f7a3c14b6ee86c2015bc8ac1fe97e657f75f2',
        abi: tokenStandardAbi,
        spender: '0xF69b08D649B744A4d4781CB1B86E30Cc9Ac9991b',
      },
      moonriver: {
        address: '0xffFfFFff8E6b63d9e447B6d4C45BDA8AF9dc9603',
        abi: tokenStandardAbi,
      },
    },
    bridgeContract: {
      ethereum: {
        address: '0x8F92e7353b180937895E0C5937d616E8ea1A2Bb9',
        resourceId:
          '0x00e6dfb61a2fb903df487c401663825643bb825d41695e63df8af6162ab145a6',
        abi: phaEthereumBridgeAbi,
      },
      kovan: {
        address: '0x82db1f1717487cADEAf6F0C74825495d6D89E08e',
        resourceId:
          '0x00e6dfb61a2fb903df487c401663825643bb825d41695e63df8af6162ab145a6',
        abi: phaEthereumBridgeAbi,
      },
      moonriver: {
        address: '0x0000000000000000000000000000000000000804',
        abi: moonriverXtokensAbi,
      },
    },
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
    bridgeContract: {
      moonriver: {
        address: '0x0000000000000000000000000000000000000804',
        abi: moonriverXtokensAbi,
      },
    },
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
    assetContract: {
      moonriver: {
        address: '0x0f47ba9d9Bde3442b42175e51d6A367928A1173B',
        abi: tokenStandardAbi,
      },
      'moonbase-alpha': {
        address: '0xD8E0B625177f6A41260A36f9B88D574fBAc77a3A',
        abi: tokenStandardAbi,
      },
    },
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
