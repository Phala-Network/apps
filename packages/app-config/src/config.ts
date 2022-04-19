import {khala, khalaDev} from '@phala/typedefs'
import {EthereumNetworkOptions, SubstrateNetworkOptions} from './configuration'

export const ethereumGraphEndpoint = {
  production:
    'https://gateway.thegraph.com/api/3c7a8c45fdffab6d5280be3602571790/subgraphs/id/0x7dc6f99be5cf16d605bedf237771413aaa3021b1-0',
  development:
    'https://gateway.thegraph.com/api/cfd0e529ce4d511c6ec482c97faafa99/subgraphs/id/0x7dc6f99be5cf16d605bedf237771413aaa3021b1-0',
}

export const ethereums: Record<string, EthereumNetworkOptions> = {
  // Rinkeby
  4: {
    bridge: '0x0712Cf53B9fA1A33018d180a4AbcC7f1803F55f4',
    erc20: '0xd06F0F098948cBdFcB9ED8d85688637478724855',
    erc20AssetHandler: '0x30f8549A46afa69f3F9b46e3C28F456796E6Cf37',
    erc20ResourceId:
      '0x00e6dfb61a2fb903df487c401663825643bb825d41695e63df8af6162ab145a6',
    peerChainIds: {
      khala: 1, // TODO: add thala testnet
    },
    graph: {
      endpoint: '',
    },
  },

  42: {
    bridge: '0xe5F54e020f3E4964Ba11D269Cdda602A78d09917',
    erc20: '0x512f7a3c14b6ee86c2015bc8ac1fe97e657f75f2',
    erc20AssetHandler: '0xDf2E83f33dB8A9CcF3a00FCe18C3F509b974353D',
    erc20ResourceId:
      '0x00000000000000000000000000000063a7e2be78898ba83824b0c0cc8dfb6001',
    peerChainIds: {
      'khala-pc-test': 0,
    },
    graph: {
      endpoint:
        'https://explorer.subquery.network/subquery/Phala-Network/khala-chainbridge',
    },
  },

  // Mainnet
  1: {
    bridge: '0x8F92e7353b180937895E0C5937d616E8ea1A2Bb9',
    erc20: '0x6c5ba91642f10282b576d91922ae6448c9d52f4e',
    erc20AssetHandler: '0xEEc0fb4913119567cDfC0c5fc2Bf8f9F9B226c2d',
    erc20ResourceId:
      '0x00e6dfb61a2fb903df487c401663825643bb825d41695e63df8af6162ab145a6',
    peerChainIds: {
      khala: 1,
    },
    graph: {
      endpoint:
        'https://explorer.subquery.network/subquery/Phala-Network/khala-chainbridge',
    },
  },
}

export const substrates: Record<string, SubstrateNetworkOptions> = {
  'poc4-dev': {
    endpoint:
      process.env['PHALA_ENDPOINT'] ?? 'wss://poc4-dev.phala.network/ws',
    peerChainIds: {
      42: 0,
    },
    typedefs: khalaDev,
  },
  khala: {
    endpoint:
      process.env['PHALA_ENDPOINT'] ?? 'wss://khala-api.phala.network/ws',
    peerChainIds: {
      1: 0,
    },
    typedefs: khala,
  },
  'khala-pc-test': {
    // chainId: 1,
    graph: {
      endpoint: 'https://chainbridge-substrate-graph-testing.phala.works/',
    },
    peerChainIds: {
      42: 0,
    },
    endpoint: 'wss://khala-api.phala.network/ws',
    typedefs: khalaDev,
  },
  para2: {
    endpoint: 'wss://para2-api.phala.network/ws/',
    peerChainIds: {1: 0},
    typedefs: khalaDev,
  },
}
