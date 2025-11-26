import {mainnet} from '@reown/appkit/networks'
import {WagmiAdapter} from '@reown/appkit-adapter-wagmi'
import type {Address} from 'viem'
import {isAddress} from 'viem'
import {cookieStorage, createStorage} from 'wagmi'

export function toAddress(value: string | undefined): Address | undefined {
  return value && isAddress(value) ? value : undefined
}

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string

export const networks = [mainnet]

export const wagmiAdapter = new WagmiAdapter({
  networks: networks,
  projectId,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
})

export const wagmiConfig = wagmiAdapter.wagmiConfig
