'use client'

import Layout from '@/components/Layout'
import SnackbarProvider from '@/components/SnackbarProvider'
import {Web3Provider} from '@/components/Web3Provider'
import {globalStyles} from '@/lib/styles'
import {theme} from '@/lib/theme'
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material'
import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import Decimal from 'decimal.js'
import {Provider as JotaiProvider} from 'jotai'
import type {ReactNode} from 'react'
import {useState} from 'react'
import {SWRConfig} from 'swr'

Decimal.set({toExpNeg: -9e15, toExpPos: 9e15, precision: 50})

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString()
}

export default function Providers({children}: {children: ReactNode}) {
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
    <SWRConfig
      value={{
        onError: (error, key) => {
          if (process.env.NODE_ENV === 'development') {
            console.error(key, error)
          }
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <JotaiProvider>
          <AppRouterCacheProvider>
            <MuiThemeProvider theme={theme}>
              <Web3Provider>
                <CssBaseline />
                <GlobalStyles styles={[globalStyles]} />

                <SnackbarProvider>
                  <Layout>
                    {children}
                    <ReactQueryDevtools buttonPosition="bottom-left" />
                  </Layout>
                </SnackbarProvider>
              </Web3Provider>
            </MuiThemeProvider>
          </AppRouterCacheProvider>
        </JotaiProvider>
      </QueryClientProvider>
    </SWRConfig>
  )
}
