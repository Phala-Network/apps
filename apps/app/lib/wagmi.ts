import {WagmiAdapter} from '@reown/appkit-adapter-wagmi'
import {mainnet} from '@reown/appkit/networks'
import {cookieStorage, createStorage} from 'wagmi'

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
