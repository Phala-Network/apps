import getGeneralKey from '@/lib/getGeneralKey'
import acaIcon from '@phala/ui/icons/asset/aca.png'
import astrIcon from '@phala/ui/icons/asset/astr.png'
import ausdIcon from '@phala/ui/icons/asset/ausd.png'
import bncIcon from '@phala/ui/icons/asset/bnc.png'
import bsxIcon from '@phala/ui/icons/asset/bsx.png'
import glmrIcon from '@phala/ui/icons/asset/glmr.png'
import karIcon from '@phala/ui/icons/asset/kar.png'
import kmaIcon from '@phala/ui/icons/asset/kma.png'
import movrIcon from '@phala/ui/icons/asset/movr.png'
import phaIcon from '@phala/ui/icons/asset/pha.png'
import sdnIcon from '@phala/ui/icons/asset/sdn.png'
import turIcon from '@phala/ui/icons/asset/tur.png'
import Decimal from 'decimal.js'
import {
  CHAINS,
  type ChainId,
  type EvmChainId,
  type SubstrateChainId,
} from './chain'

export const nativeLocation = {parents: 0, interior: 'Here'}

export type AssetId =
  | 'pha'
  | 'movr'
  | 'aca'
  | 'kar'
  | 'bnc'
  | 'ausd'
  | 'bsx'
  | 'tur'
  | 'kma'
  | 'glmr'
  | 'sdn'
  | 'astr'
  | 'gpha'

export interface Asset {
  id: AssetId
  symbol: string
  icon: string
  decimals: Partial<Record<ChainId, number>> & {default: number}
  xc20Address?: Partial<Record<ChainId, `0x${string}`>>
  polkadotAssetId?: Partial<Record<SubstrateChainId, unknown>>
  erc20TokenContractAddress?: {
    [chainId in EvmChainId]?: `0x${string}`
  }
  reservedAddress?: {
    [chainId in ChainId]?: string
  }
  destChainTransactionFee: Partial<Record<ChainId, Decimal>>
  existentialDeposit: Partial<Record<ChainId, Decimal>>
  sygmaResourceId?: string
  location?: {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    polkadot?: any
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    kusama?: any
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    bifrost?: any
  }
}

export const ASSETS: Readonly<Record<AssetId, Asset>> = {
  pha: {
    id: 'pha',
    symbol: 'PHA',
    icon: phaIcon,
    xc20Address: {
      moonbeam: '0xffffffff63d24ecc8eb8a7b5d0803e900f7b6ced',
      moonriver: '0xffffffff8e6b63d9e447b6d4c45bda8af9dc9603',
    },
    erc20TokenContractAddress: {
      ethereum: '0x6c5bA91642F10282b576d91922Ae6448C9d52f4E',
      moonbeam: '0xFFFfFfFf63d24eCc8eB8a7b5D0803e900F7b6cED',
      moonriver: '0xffFfFFff8E6b63d9e447B6d4C45BDA8AF9dc9603',
    },
    decimals: {ethereum: 18, goerli: 18, default: 12},
    destChainTransactionFee: {
      phala: new Decimal('0.092696'),
      khala: new Decimal('0.092696'),
      'bifrost-kusama': new Decimal('0.0256'),
      acala: new Decimal('0.0512'),
      karura: new Decimal('0.0512'),
      moonbeam: new Decimal('0.158722600511'),
      moonriver: new Decimal('0.05868512'),
      turing: new Decimal('0.256'),
      calamari: new Decimal('0.9523809524'),
      shiden: new Decimal('0.024464'),
      astar: new Decimal('0.000912'),
    },
    existentialDeposit: {
      phala: new Decimal('0.01'),
      khala: new Decimal('0.01'),
      acala: new Decimal('0.01'),
      karura: new Decimal('0.04'),
      'bifrost-kusama': new Decimal('0.04'),
    },
    polkadotAssetId: {
      calamari: 13,
      shiden: '18446744073709551623',
      astar: '18446744073709551622',
      turing: 7,
      acala: {ForeignAsset: 9},
      karura: {Token: 'PHA'},
      'bifrost-kusama': {Token: 'PHA'},
    },
    reservedAddress: {
      ethereum: '0xC832588193cd5ED2185daDA4A531e0B26eC5B830',
      phala: '5EYCAe5jLbHcAAMKvLFSXgCTbPrLgBJusvPwfKcaKzuf5X5e',
      khala: '5EYCAe5jLbHcAAMKvLFSXgCTbPrLgBJusvPwfKcaKzuf5X5e',
    },
    sygmaResourceId:
      '0x0000000000000000000000000000000000000000000000000000000000000001',
    location: {
      polkadot: {parents: 1, interior: {X1: {Parachain: CHAINS.phala.paraId}}},
      kusama: {parents: 1, interior: {X1: {Parachain: CHAINS.khala.paraId}}},
    },
  },
  gpha: {
    id: 'gpha',
    symbol: 'GPHA',
    icon: phaIcon,
    erc20TokenContractAddress: {
      goerli: '0xB376b0Ee6d8202721838e76376e81eEc0e2FE864',
    },
    decimals: {goerli: 18, default: 12},
    sygmaResourceId:
      '0x0000000000000000000000000000000000000000000000000000000000001000',
    destChainTransactionFee: {},
    existentialDeposit: {},
  },
  movr: {
    id: 'movr',
    symbol: 'MOVR',
    icon: movrIcon,
    decimals: {default: 18},
    polkadotAssetId: {
      khala: 6,
    },
    xc20Address: {moonriver: '0x0000000000000000000000000000000000000802'},
    destChainTransactionFee: {
      moonriver: new Decimal('0.00008'),
      khala: new Decimal('0.000000000266666666'),
    },
    existentialDeposit: {},
    location: {
      kusama: {
        parents: 1,
        interior: {
          X2: [{Parachain: CHAINS.moonriver.paraId}, {PalletInstance: 10}],
        },
      },
    },
  },
  aca: {
    id: 'aca',
    symbol: 'ACA',
    icon: acaIcon,
    decimals: {default: 12},
    polkadotAssetId: {phala: 5},
    destChainTransactionFee: {
      acala: new Decimal('0.008083'),
    },
    existentialDeposit: {
      acala: new Decimal('0.01'),
      phala: new Decimal('0.01'),
    },
    location: {
      polkadot: {
        parents: 1,
        interior: {
          X2: [
            {
              Parachain: CHAINS.acala.paraId,
              GeneralKey: getGeneralKey('0x0003'),
            },
          ],
        },
      },
    },
  },
  kar: {
    id: 'kar',
    symbol: 'KAR',
    icon: karIcon,
    decimals: {default: 12},
    polkadotAssetId: {
      khala: 1,
    },
    destChainTransactionFee: {
      karura: new Decimal('0.0064'),
      khala: new Decimal('0.008'),
    },
    existentialDeposit: {
      karura: new Decimal('0.01'),
      khala: new Decimal('0.01'),
    },
    location: {
      kusama: {
        parents: 1,
        interior: {
          X2: [
            {Parachain: CHAINS.karura.paraId},
            {GeneralKey: getGeneralKey('0x0080')},
          ],
        },
      },
    },
  },
  bnc: {
    id: 'bnc',
    symbol: 'BNC',
    icon: bncIcon,
    polkadotAssetId: {
      khala: 2,
    },
    decimals: {default: 12},
    destChainTransactionFee: {
      'bifrost-kusama': new Decimal('0.0051'),
      khala: new Decimal('0.016'),
    },
    existentialDeposit: {
      'bifrost-kusama': new Decimal('0.01'),
      khala: new Decimal('0.01'),
    },
    location: {
      bifrost: {
        parents: 0,
        interior: {X1: {GeneralKey: getGeneralKey('0x0001')}},
      },
      kusama: {
        parents: 1,
        interior: {
          X2: [
            {Parachain: CHAINS['bifrost-kusama'].paraId},
            {GeneralKey: getGeneralKey('0x0001')},
          ],
        },
      },
    },
  },
  ausd: {
    id: 'ausd',
    symbol: 'aUSD',
    icon: ausdIcon,
    decimals: {default: 12},
    polkadotAssetId: {
      khala: 4,
      acala: {Token: 'AUSD'},
      karura: {Token: 'KUSD'},
    },
    destChainTransactionFee: {
      karura: new Decimal('0.003481902463'),
      khala: new Decimal('0.016'),
    },
    existentialDeposit: {
      karura: new Decimal('0.01'),
      khala: new Decimal('0.01'),
    },
    location: {
      kusama: {
        parents: 1,
        interior: {
          X2: [
            {Parachain: CHAINS.karura.paraId},
            {GeneralKey: getGeneralKey('0x0081')},
          ],
        },
      },
    },
  },
  bsx: {
    id: 'bsx',
    symbol: 'BSX',
    icon: bsxIcon,
    decimals: {default: 12},
    polkadotAssetId: {
      khala: 9,
      basilisk: 0,
    },
    destChainTransactionFee: {
      khala: new Decimal('0.064'),
      basilisk: new Decimal('22'),
    },
    existentialDeposit: {},
    location: {
      kusama: {
        parents: 1,
        interior: {
          X2: [{Parachain: CHAINS.basilisk.paraId}, {GeneralIndex: 0}],
        },
      },
    },
  },
  tur: {
    id: 'tur',
    symbol: 'TUR',
    icon: turIcon,
    decimals: {default: 10},
    polkadotAssetId: {
      khala: 10,
      turing: 0,
    },
    destChainTransactionFee: {
      khala: new Decimal('0.064'),
      turing: new Decimal('0.1664'),
    },
    existentialDeposit: {},
    location: {
      kusama: {parents: 1, interior: {X1: {Parachain: CHAINS.turing.paraId}}},
    },
  },
  kma: {
    id: 'kma',
    symbol: 'KMA',
    icon: kmaIcon,
    decimals: {default: 12},
    polkadotAssetId: {
      calamari: 1,
      khala: 8,
    },
    destChainTransactionFee: {
      khala: new Decimal('6.4'),
      calamari: new Decimal('0.000004'),
    },
    existentialDeposit: {},
    location: {
      kusama: {parents: 1, interior: {X1: {Parachain: CHAINS.calamari.paraId}}},
    },
  },
  glmr: {
    id: 'glmr',
    symbol: 'GLMR',
    icon: glmrIcon,
    decimals: {default: 18},
    polkadotAssetId: {phala: 1},
    xc20Address: {moonbeam: '0x0000000000000000000000000000000000000802'},
    destChainTransactionFee: {
      phala: new Decimal('0.008'),
      moonbeam: new Decimal('0.004'),
    },
    existentialDeposit: {
      moonbeam: new Decimal('0.01'),
    },
    location: {
      polkadot: {
        parents: 1,
        interior: {
          X2: [{Parachain: CHAINS.moonbeam.paraId}, {PalletInstance: 10}],
        },
      },
    },
  },
  sdn: {
    id: 'sdn',
    symbol: 'SDN',
    icon: sdnIcon,
    decimals: {default: 18},
    polkadotAssetId: {khala: 12},
    destChainTransactionFee: {
      shiden: new Decimal('0.004635101624603116'),
      khala: new Decimal('0.016'),
    },
    existentialDeposit: {},
    location: {
      kusama: {parents: 1, interior: {X1: {Parachain: CHAINS.shiden.paraId}}},
    },
  },
  astr: {
    id: 'astr',
    symbol: 'ASTR',
    icon: astrIcon,
    decimals: {default: 18},
    polkadotAssetId: {phala: '6'},
    destChainTransactionFee: {
      astar: new Decimal('0.004635101624597127'),
      phala: new Decimal('0.032'),
    },
    existentialDeposit: {},
    location: {
      polkadot: {parents: 1, interior: {X1: {Parachain: CHAINS.astar.paraId}}},
    },
  },
}
