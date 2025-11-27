'use client'

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {type ReactNode, useState} from 'react'
import {cookieToInitialState, WagmiProvider} from 'wagmi'

// Import to ensure AppKit is initialized
import {wagmiAdapter} from '@/lib/wagmi'

export const Web3Provider = ({
  children,
  cookies,
}: {
  children: ReactNode
  cookies: string | null
}) => {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies)

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
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
