'use client'

import type {Chain} from '@rainbow-me/rainbowkit'
import {getDefaultConfig} from '@rainbow-me/rainbowkit'
import {cookieStorage, createStorage} from 'wagmi'
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
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
})
