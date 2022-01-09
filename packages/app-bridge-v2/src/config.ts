export const khalaChainId = 1
export const khalaParaId = 2004
export const karuraParaId = 2000

export const keyringType = 'sr25519'

export const blockchainTypes = {
  ethereum: 'ethereum',
  polkadot: 'polkadot',
}

export const networks = [
  {
    label: 'Khala',
    name: 'Khala',
    id: 'Khala',
    blockchainTypes: blockchainTypes.polkadot,
  },
  {
    label: 'Karura',
    name: 'Karura',
    id: 'Karura',
    blockchainTypes: blockchainTypes.polkadot,
  },
  {
    label: 'Evm',
    name: 'Evm',
    id: 'Evm',
    blockchainTypes: blockchainTypes.ethereum,
  },
  {
    label: 'Ethereum',
    name: 'Ethereum',
    id: 'Ethereum',
    ethereum: 'ethereum',
    blockchainTypes: blockchainTypes.ethereum,
  },
] as const

export const coins = [
  {
    label: 'PHA',
    name: 'PHA',
    id: 'PHA',
  },
  {
    label: 'KHR',
    name: 'KHR',
    id: 'KHR',
  },
  {
    label: 'ETH',
    name: 'ETH',
    id: 'ETH',
  },
] as const

export enum Transfers {
  transferPHAFromKhalaToKarura = 'transferPHAFromKhalaToKarura',
  transferPHAFromKaruraToKhala = 'transferPHAFromKaruraToKhala',
  transferKARFromKaruraToKhala = 'transferKARFromKaruraToKhala',
  transferKARFromKhalaToKarura = 'transferKARFromKhalaToKarura',
  transferAssetsKhalaAccounts = 'transferAssetsKhalaAccounts',
  transferPhaFromEvmToKhala = 'transferPhaFromEvmToKhala',
  transferPhaFromEvmToKarura = 'transferPhaFromEvmToKarura',
}
