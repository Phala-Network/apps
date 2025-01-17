import {ethChain} from '@/config'
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit'
import type {ReactNode} from 'react'
import type {Chain} from 'viem'
import {WagmiProvider} from 'wagmi'
import '@rainbow-me/rainbowkit/styles.css'

const chains: [Chain, ...Chain[]] = [ethChain]

const config = getDefaultConfig({
  chains,
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
  appName: 'Phala App',
  appUrl: 'https://app.phala.network',
  appIcon: 'https://app.phala.network/apple-touch-icon.png',
  ssr: true,
})

export const Web3Provider = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider
        locale="en-US"
        modalSize="compact"
        theme={darkTheme({
          borderRadius: 'medium',
          accentColor: '#c5ff46',
          accentColorForeground: '#333',
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  )
}
