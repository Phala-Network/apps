export const khalaChainId = 1
export const khalaParaId = 2004
export const karuraParaId = 2000

export const keyringType = 'sr25519'

export const networks = [
  {
    label: 'Khala',
    name: 'Khala',
    id: 'Khala',
  },
  {
    label: 'Karura',
    name: 'Karura',
    id: 'Karura',
  },
  {
    label: 'Evm',
    name: 'Evm',
    id: 'Evm',
  },
  {
    label: 'Ethereum',
    name: 'Ethereum',
    id: 'Ethereum',
  },
]

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
]

export enum Transfers {
  transferPHAFromKhalaToKarura = 'transferPHAFromKhalaToKarura',
  transferPHAFromKaruraToKhala = 'transferPHAFromKaruraToKhala',
  transferKARFromKaruraToKhala = 'transferKARFromKaruraToKhala',
  transferKARFromKhalaToKarura = 'transferKARFromKhalaToKarura',
  transferAssetsKhalaAccounts = 'transferAssetsKhalaAccounts',
  transferPhaFromEvmToKhala = 'transferPhaFromEvmToKhala',
  transferPhaFromEvmToKarura = 'transferPhaFromEvmToKarura',
}
