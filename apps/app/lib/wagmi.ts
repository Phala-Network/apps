import {mainnet} from '@reown/appkit/networks'
import {WagmiAdapter} from '@reown/appkit-adapter-wagmi'
import type {Address} from 'viem'
import {defineChain, isAddress} from 'viem'
import {cookieStorage, createStorage} from 'wagmi'

export function toAddress(value: string | undefined): Address | undefined {
  return value && isAddress(value) ? value : undefined
}

export const phalaNetwork = defineChain({
  id: 2035,
  name: 'Phala Network',
  nativeCurrency: {
    name: 'PHA',
    symbol: 'PHA',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.phala.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Phala Explorer',
      url: 'https://phala.subscan.io',
    },
  },
})

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string

export const networks = [mainnet, phalaNetwork]

export const wagmiAdapter = new WagmiAdapter({
  networks: networks,
  projectId,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
})

export const wagmiConfig = wagmiAdapter.wagmiConfig
