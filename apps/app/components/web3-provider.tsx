'use client'

import '@rainbow-me/rainbowkit/styles.css'

import {darkTheme, RainbowKitProvider} from '@rainbow-me/rainbowkit'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {type ReactNode, useState} from 'react'
import {type Config, cookieToInitialState, WagmiProvider} from 'wagmi'

import {wagmiConfig} from '@/lib/wagmi'

// wagmi 3.x and rainbowkit 2.x have type incompatibility
const config = wagmiConfig as unknown as Config

export const Web3Provider = ({
  children,
  cookies,
}: {
  children: ReactNode
  cookies: string | null
}) => {
  const initialState = cookieToInitialState(config, cookies)

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            console.error(error)
          },
        }),
      }),
  )

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          initialChain={wagmiConfig.chains[0]}
          modalSize="compact"
          theme={darkTheme({
            accentColor: '#c5ff46',
            accentColorForeground: 'black',
            fontStack: 'system',
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
