import {ConnectKitProvider, getDefaultConfig} from 'connectkit'
import type {ReactNode} from 'react'
import {
  WagmiProvider,
  cookieStorage,
  cookieToInitialState,
  createConfig,
  createStorage,
} from 'wagmi'
import {type Chain, anvil, mainnet, sepolia} from 'wagmi/chains'

const chains: [Chain, ...Chain[]] = [mainnet]

if (
  process.env.VERCEL_ENV === 'preview' ||
  process.env.VERCEL_ENV === 'development' ||
  process.env.NODE_ENV === 'development'
) {
  chains.push(sepolia)
}

if (process.env.NODE_ENV === 'development') {
  chains.push(anvil)
}

const config = createConfig(
  getDefaultConfig({
    chains,
    walletConnectProjectId: process.env
      .NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
    appName: 'Phala App',
    appUrl: 'https://app.phala.network',
    appIcon: 'https://app.phala.network/apple-touch-icon.png',
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
