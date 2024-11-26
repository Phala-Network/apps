import {ConnectKitProvider, getDefaultConfig} from 'connectkit'
import type {ReactNode} from 'react'
import {
  WagmiProvider,
  cookieStorage,
  cookieToInitialState,
  createConfig,
  createStorage,
} from 'wagmi'
import {type Chain, sepolia} from 'wagmi/chains'

const chains: [Chain, ...Chain[]] = [sepolia]

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains,
    // transports: {
    //   // RPC URL for each chain
    //   [mainnet.id]: http(
    //     `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
    //   ),
    // },

    // Required API Keys
    walletConnectProjectId: process.env
      .NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,

    // Required App Info
    appName: 'Phala App',

    // Optional App Info
    appUrl: 'https://app.phala.network', // your app's url
    appIcon: 'https://app.phala.network/apple-touch-icon.png', // your app's icon, no bigger than 1024x1024px (max. 1MB)

    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
  }),
)

export const Web3Provider = ({
  children,
  cookie,
}: {
  children: ReactNode
  cookie?: string
}) => {
  const initialState = cookieToInitialState(config, cookie)
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <ConnectKitProvider theme="midnight">{children}</ConnectKitProvider>
    </WagmiProvider>
  )
}
