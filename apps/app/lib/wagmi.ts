'use client'

import type {Chain} from '@rainbow-me/rainbowkit'
import {getDefaultConfig} from '@rainbow-me/rainbowkit'
import {cookieStorage, createStorage, fallback, http} from 'wagmi'
import {mainnet} from 'wagmi/chains'

export const phalaNetwork = {
  id: 2035,
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
  iconUrl: 'https://phala.com/home/icon.svg',
  iconBackground: '#000',
} as const satisfies Chain

export const projectId = process.env
  .NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string

export const wagmiConfig = getDefaultConfig({
  appName: 'Phala App',
  projectId,
  chains: [mainnet, phalaNetwork],
  transports: {
    [mainnet.id]: fallback([
      http('https://ethereum-rpc.publicnode.com'),
      http('https://1rpc.io/eth'),
      http('https://eth.drpc.org'),
      http('https://rpc.ankr.com/eth'),
      http('https://eth.llamarpc.com'),
      http('https://cloudflare-eth.com'),
    ]),
    [phalaNetwork.id]: http('https://rpc.phala.network'),
  },
  ssr: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storage: createStorage({storage: cookieStorage}) as any,
})
