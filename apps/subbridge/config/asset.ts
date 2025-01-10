import getGeneralKey from '@/lib/getGeneralKey'
import acaIcon from '@phala/ui/icons/asset/aca.png'
import astrIcon from '@phala/ui/icons/asset/astr.png'
import glmrIcon from '@phala/ui/icons/asset/glmr.png'
import phaIcon from '@phala/ui/icons/asset/pha.png'
import Decimal from 'decimal.js'
import {
  CHAINS,
  type ChainId,
  type EvmChainId,
  type SubstrateChainId,
} from './chain'

export const nativeLocation = {parents: 0, interior: 'Here'}

export type AssetId = 'pha' | 'aca' | 'astr' | 'glmr' | 'gpha'

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
    },
    erc20TokenContractAddress: {
      ethereum: '0x6c5bA91642F10282b576d91922Ae6448C9d52f4E',
      moonbeam: '0xFFFfFfFf63d24eCc8eB8a7b5D0803e900F7b6cED',
    },
    decimals: {ethereum: 18, goerli: 18, default: 12},
    destChainTransactionFee: {
      phala: new Decimal('0.092696'),
      acala: new Decimal('0.0512'),
      moonbeam: new Decimal('0.158722600511'),
      astar: new Decimal('0.000912'),
    },
    existentialDeposit: {
      phala: new Decimal('0.01'),
      acala: new Decimal('0.01'),
    },
    polkadotAssetId: {
      astar: '18446744073709551622',
      acala: {ForeignAsset: 9},
    },
    reservedAddress: {
      ethereum: '0xC832588193cd5ED2185daDA4A531e0B26eC5B830',
      phala: '5EYCAe5jLbHcAAMKvLFSXgCTbPrLgBJusvPwfKcaKzuf5X5e',
    },
    sygmaResourceId:
      '0x0000000000000000000000000000000000000000000000000000000000000001',
    location: {
      polkadot: {parents: 1, interior: {X1: {Parachain: CHAINS.phala.paraId}}},
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
