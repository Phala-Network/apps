import ausdIcon from '@/assets/ausd_asset_icon.png'
import bncIcon from '@/assets/bnc_asset_icon.png'
import bsxIcon from '@/assets/bsx_asset_icon.png'
import crabIcon from '@/assets/crab_asset_icon.png'
import glmrIcon from '@/assets/glmr_asset_icon.png'
import hkoIcon from '@/assets/hko_asset_icon.svg'
import karIcon from '@/assets/kar_asset_icon.png'
import kmaIcon from '@/assets/kma_asset_icon.png'
import movrIcon from '@/assets/movr_asset_icon.png'
import paraIcon from '@/assets/para_asset_icon.png'
import phaIcon from '@/assets/pha_asset_icon.png'
import turIcon from '@/assets/tur_asset_icon.png'
import zlkIcon from '@/assets/zlk_asset_icon.png'
import Decimal from 'decimal.js'
import {ChainId, EvmChainId} from './chain'

export type AssetId =
  | 'pha'
  | 'movr'
  | 'kar'
  | 'zlk'
  | 'bnc'
  | 'ausd'
  | 'para'
  | 'hko'
  | 'bsx'
  | 'tur'
  | 'kma'
  | 'crab'
  | 'glmr'

export type OrmlToken = 'PHA' | 'KAR' | 'ZLK' | 'BNC' | 'KUSD' | 'TUR'
export interface Asset {
  id: AssetId
  symbol: string
  icon: string
  decimals: Partial<Record<ChainId, number>> & {default: number}
  xc20Address?: Partial<Record<ChainId, `0x${string}`>>
  ormlToken?: OrmlToken
  palletAssetId?: Partial<Record<ChainId, number>>
  erc20TokenContractAddress?: {
    [chainId in EvmChainId]?: `0x${string}`
  }
  chainBridgeResourceId?:
    | `0x${string}`
    | {
        [toChainId in ChainId]?: `0x${string}`
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
    xc20Address: {
      moonbeam: '0xffffffff63d24ecc8eb8a7b5d0803e900f7b6ced',
      moonriver: '0xffffffff8e6b63d9e447b6d4c45bda8af9dc9603',
    },
    erc20TokenContractAddress: {
      ethereum: '0x6c5bA91642F10282b576d91922Ae6448C9d52f4E',
      kovan: '0x512f7a3c14b6ee86c2015bc8ac1fe97e657f75f2',
      moonbeam: '0xFFFfFfFf63d24eCc8eB8a7b5D0803e900F7b6cED',
      moonriver: '0xffFfFFff8E6b63d9e447B6d4C45BDA8AF9dc9603',
    },
    chainBridgeResourceId: {
      phala:
        '0x00b14e071ddad0b12be5aca6dffc5f2584ea158d9b0ce73e1437115e97a32a3e',
      khala:
        '0x00e6dfb61a2fb903df487c401663825643bb825d41695e63df8af6162ab145a6',
    },
    decimals: {ethereum: 18, kovan: 18, default: 12},
    destChainTransactionFee: {
      phala: new Decimal('0.092696'),
      khala: new Decimal('0.09324'),
      thala: new Decimal('0.09324'),
      bifrost: new Decimal('0.0256'),
      'bifrost-test': new Decimal('0.0256'),
      karura: new Decimal('0.0512'),
      'karura-test': new Decimal('0.0512'),
      moonbeam: new Decimal('0.158722600511'),
      moonriver: new Decimal('0.05868512'),
      parallel: new Decimal('0.0556176'),
      'parallel-heiko': new Decimal('0.0384'),
      turing: new Decimal('0.256'),
      calamari: new Decimal('0.9523809524'),
    },
    existentialDeposit: {
      phala: new Decimal('0.01'),
      khala: new Decimal('0.01'),
      thala: new Decimal('0.01'),
      karura: new Decimal('0.04'),
      'karura-test': new Decimal('0.04'),
      bifrost: new Decimal('0.04'),
      'bifrost-test': new Decimal('0.04'),
    },
    palletAssetId: {
      parallel: 115,
      'parallel-heiko': 115,
      calamari: 13,
    },
  },
  movr: {
    id: 'movr',
    symbol: 'MOVR',
    icon: movrIcon,
    decimals: {default: 18},
    palletAssetId: {
      khala: 6,
      thala: 6,
    },
    xc20Address: {moonriver: '0x0000000000000000000000000000000000000802'},
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
    palletAssetId: {
      khala: 1,
      thala: 1,
    },
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
    palletAssetId: {
      khala: 3,
      thala: 3,
    },
    ormlToken: 'ZLK',
    destChainTransactionFee: {
      khala: new Decimal('0.000000016'),
      thala: new Decimal('0.000000016'),
      bifrost: new Decimal('0.0096'),
      'bifrost-test': new Decimal('0.0096'),
    },
    decimals: {default: 18},
    erc20TokenContractAddress: {
      moonriver: '0x0f47ba9d9Bde3442b42175e51d6A367928A1173B',
      'moonbase-alpha': '0xD8E0B625177f6A41260A36f9B88D574fBAc77a3A',
    },
    chainBridgeResourceId:
      '0x028da1efb56e124f659fa6d5d95b3cc541ce207cbfee2f4f066061cc92d37bae',
    existentialDeposit: {
      bifrost: new Decimal('0.01'),
      'bifrost-test': new Decimal('0.01'),
    },
  },
  bnc: {
    id: 'bnc',
    symbol: 'BNC',
    icon: bncIcon,
    palletAssetId: {
      khala: 2,
      thala: 2,
    },
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
  ausd: {
    id: 'ausd',
    symbol: 'aUSD',
    icon: ausdIcon,
    ormlToken: 'KUSD', // TODO: change this to AUSD when karura finished migration
    decimals: {default: 12},
    palletAssetId: {
      khala: 4,
      thala: 4,
    },
    destChainTransactionFee: {
      karura: new Decimal('0.003481902463'),
      'karura-test': new Decimal('0.003481902463'),
      khala: new Decimal('0.016'),
      thala: new Decimal('0.016'),
    },
    existentialDeposit: {
      karura: new Decimal('0.01'),
      'karura-test': new Decimal('0.01'),
      khala: new Decimal('0.01'),
      thala: new Decimal('0.01'),
    },
  },
  para: {
    id: 'para',
    symbol: 'PARA',
    icon: paraIcon,
    decimals: {default: 12},
    palletAssetId: {
      parallel: 1,
      phala: 2,
    },
    destChainTransactionFee: {
      phala: new Decimal('0.064'),
      parallel: new Decimal('0.0139044'),
    },
    existentialDeposit: {parallel: new Decimal('0.01')},
  },
  hko: {
    id: 'hko',
    symbol: 'HKO',
    icon: hkoIcon,
    decimals: {default: 12},
    palletAssetId: {
      khala: 7,
      thala: 7,
      'parallel-heiko': 0,
    },
    destChainTransactionFee: {
      'parallel-heiko': new Decimal('0.0029'),
      khala: new Decimal('0.064'),
      thala: new Decimal('0.064'),
    },
    existentialDeposit: {
      'parallel-heiko': new Decimal('0.01'),
    },
  },
  bsx: {
    id: 'bsx',
    symbol: 'BSX',
    icon: bsxIcon,
    decimals: {default: 12},
    palletAssetId: {
      khala: 9,
      thala: 9,
      basilisk: 0,
    },
    destChainTransactionFee: {
      khala: new Decimal('0.064'),
      thala: new Decimal('0.064'),
      basilisk: new Decimal('22'),
    },
    existentialDeposit: {},
  },
  tur: {
    id: 'tur',
    symbol: 'TUR',
    icon: turIcon,
    decimals: {default: 10},
    palletAssetId: {
      khala: 10,
      thala: 10,
    },
    ormlToken: 'TUR',
    destChainTransactionFee: {
      khala: new Decimal('0.064'),
      thala: new Decimal('0.064'),
      turing: new Decimal('0.1664'),
    },
    existentialDeposit: {},
  },
  kma: {
    id: 'kma',
    symbol: 'KMA',
    icon: kmaIcon,
    decimals: {default: 12},
    palletAssetId: {
      calamari: 1,
      khala: 8,
      thala: 8,
    },
    destChainTransactionFee: {
      khala: new Decimal('6.4'),
      thala: new Decimal('6.4'),
      calamari: new Decimal('0.000004'),
    },
    existentialDeposit: {},
  },
  crab: {
    id: 'crab',
    symbol: 'CRAB',
    icon: crabIcon,
    decimals: {default: 18},
    palletAssetId: {khala: 11, thala: 11},
    destChainTransactionFee: {
      crab: new Decimal('3.2'),
      khala: new Decimal('0.064'),
    },
    existentialDeposit: {},
  },
  glmr: {
    id: 'glmr',
    symbol: 'GLMR',
    icon: glmrIcon,
    decimals: {default: 18},
    palletAssetId: {phala: 1},
    xc20Address: {moonbeam: '0x0000000000000000000000000000000000000802'},
    destChainTransactionFee: {
      phala: new Decimal('0.008'),
      moonbeam: new Decimal('0.004'),
    },
    existentialDeposit: {
      moonbeam: new Decimal('0.01'),
    },
  },
}
