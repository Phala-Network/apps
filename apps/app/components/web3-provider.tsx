'use client'

import type {AppKitNetwork} from '@reown/appkit/networks'
import {createAppKit} from '@reown/appkit/react'
import type {QueryClient} from '@tanstack/react-query'
import {QueryClientProvider} from '@tanstack/react-query'
import type {ReactNode} from 'react'
import {cookieToInitialState, WagmiProvider} from 'wagmi'

import {networks, wagmiAdapter} from '@/lib/wagmi'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string

const metadata = {
  name: 'Phala App',
  description: 'Phala Network App - Staking, GPU Mining',
  url: 'https://app.phala.network',
  icons: ['https://app.phala.network/apple-touch-icon.png'],
}

// Create modal - must be outside component to prevent re-renders
createAppKit({
  adapters: [wagmiAdapter],
  networks: networks as unknown as [AppKitNetwork, ...AppKitNetwork[]],
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
    // '--apkt-color-mix': '#1f222e',
    // '--apkt-color-mix-strength': 40,
    // '--apkt-border-radius-master': '4px',
    '--apkt-font-family': 'Montserrat, Helvetica, Arial, sans-serif',
  },
})

export const Web3Provider = ({
  children,
  queryClient,
  cookies,
}: {
  children: ReactNode
  queryClient: QueryClient
  cookies: string | null
}) => {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies)

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
