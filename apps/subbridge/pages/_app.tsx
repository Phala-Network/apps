import GlobalStyles from '@/components/GlobalStyles'
import Layout from '@/components/Layout'
import MuiThemeProvider from '@/components/MuiThemeProvider'
import {CssBaseline} from '@mui/material'
import {AppCacheProvider} from '@mui/material-nextjs/v14-pagesRouter'
import Decimal from 'decimal.js'
import {Provider as JotaiProvider} from 'jotai'
import {DevTools as JotaiDevTools} from 'jotai-devtools'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import {SnackbarProvider} from 'notistack'
import type {FC} from 'react'
import {SWRConfig} from 'swr'

Decimal.set({toExpNeg: -9e15, toExpPos: 9e15, precision: 50})

const MyApp: FC<AppProps> = (props) => {
  const {Component, pageProps} = props

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>SubBridge</title>
        <meta
          name="description"
          content="Cross-chain Router, Bridging Parachain, EVM, and other chains."
        />
      </Head>

      <SWRConfig
        value={{
          onError: (error, key) => {
            if (process.env.NODE_ENV === 'development') {
              console.error(key, error)
            }
          },
        }}
      >
        <JotaiProvider>
          <AppCacheProvider {...props}>
            <MuiThemeProvider>
              <SnackbarProvider
                preventDuplicate
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
              >
                <CssBaseline enableColorScheme />
                <GlobalStyles />
                <Layout>
                  <Component {...pageProps} />
                  {process.env.NODE_ENV === 'development' && <JotaiDevTools />}
                </Layout>
              </SnackbarProvider>
            </MuiThemeProvider>
          </AppCacheProvider>
        </JotaiProvider>
      </SWRConfig>
    </>
  )
}

export default MyApp
