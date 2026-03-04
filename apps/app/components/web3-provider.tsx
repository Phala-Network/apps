'use client'

import '@rainbow-me/rainbowkit/styles.css'

import {darkTheme, RainbowKitProvider} from '@rainbow-me/rainbowkit'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {type ReactNode, useState} from 'react'
import {cookieToInitialState, WagmiProvider} from 'wagmi'

import {wagmiConfig} from '@/lib/wagmi'

export const Web3Provider = ({
  children,
  cookies,
}: {
  children: ReactNode
  cookies: string | null
}) => {
  const initialState = cookieToInitialState(wagmiConfig, cookies)

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
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
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
