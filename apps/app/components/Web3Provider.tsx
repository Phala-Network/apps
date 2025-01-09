import {ethChain} from '@/config'
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit'
import type {ReactNode} from 'react'
import type {Chain} from 'viem'
import {
  WagmiProvider,
  cookieStorage,
  cookieToInitialState,
  createStorage,
} from 'wagmi'
import '@rainbow-me/rainbowkit/styles.css'

const chains: [Chain, ...Chain[]] = [ethChain]

const config = getDefaultConfig({
  chains,
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
  appName: 'Phala App',
  appUrl: 'https://app.phala.network',
  appIcon: 'https://app.phala.network/apple-touch-icon.png',
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
})

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
      <RainbowKitProvider modalSize="compact" theme={darkTheme()}>
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  )
}
