import {AppKitNetwork, defineChain, mainnet} from '@reown/appkit/networks'
import {AppKit, createAppKit} from '@reown/appkit/react'
import {WagmiAdapter} from '@reown/appkit-adapter-wagmi'
import type {Address} from 'viem'
import {isAddress} from 'viem'
import {cookieStorage, createStorage} from 'wagmi'

export function toAddress(value: string | undefined): Address | undefined {
  return value && isAddress(value) ? value : undefined
}

export const phalaNetwork = defineChain({
  id: 2035,
  caipNetworkId: 'eip155:2035',
  chainNamespace: 'eip155',
  name: 'Phala',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
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

export const projectId = process.env
  .NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [
  mainnet,
  phalaNetwork,
]

export const metadata = {
  name: 'Phala App',
  description: 'Phala Network App - Staking, GPU Mining',
  url: 'https://app.phala.network',
  icons: ['https://app.phala.network/apple-touch-icon.png'],
}

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
})

export const wagmiConfig = wagmiAdapter.wagmiConfig

// Initialize AppKit - must be called once at module level
export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  defaultNetwork: networks[0],
  projectId,
  metadata,
  features: {
    analytics: false,
    email: false,
    socials: false,
  },
  themeMode: 'dark',
  themeVariables: {
    '--apkt-accent': '#c5ff46',
    '--apkt-font-family': 'Montserrat, Helvetica, Arial, sans-serif',
  },
  chainImages: {
    [phalaNetwork.id]: 'https://phala.com/home/icon.svg',
  },
  allowUnsupportedChain: true,
})
