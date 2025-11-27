'use client'

import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material'
import {AppRouterCacheProvider} from '@mui/material-nextjs/v16-appRouter'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import Decimal from 'decimal.js'
import {Provider as JotaiProvider} from 'jotai'
import {NuqsAdapter} from 'nuqs/adapters/next/app'
import type {ReactNode} from 'react'

import Layout from '@/components/layout'
import SnackbarProvider from '@/components/snackbar-provider'
import {Web3Provider} from '@/components/web3-provider'
import {globalStyles} from '@/lib/styles'
import {theme} from '@/lib/theme'

Decimal.set({toExpNeg: -9e15, toExpPos: 9e15, precision: 50})

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString()
}

export default function Providers({
  children,
  cookies,
}: {
  children: ReactNode
  cookies: string | null
}) {
  return (
    <NuqsAdapter>
      <JotaiProvider>
        <AppRouterCacheProvider>
          <MuiThemeProvider theme={theme}>
            <Web3Provider cookies={cookies}>
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
    </NuqsAdapter>
  )
}
