import Layout from '@/components/Layout'
import SnackbarProvider from '@/components/SnackbarProvider'
import {Web3Provider} from '@/components/Web3Provider'
import ZendeskWidget from '@/components/ZendeskWidget'
import {globalStyles} from '@/lib/styles'
import {theme} from '@/lib/theme'
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material'
import {AppCacheProvider} from '@mui/material-nextjs/v15-pagesRouter'
import {GoogleAnalytics} from '@next/third-parties/google'
// import {JotaiDevTools} from '@phala/lib'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import Decimal from 'decimal.js'
import {Provider as JotaiProvider} from 'jotai'
import type {AppProps} from 'next/app'
import {SWRConfig} from 'swr'

Decimal.set({toExpNeg: -9e15, toExpPos: 9e15, precision: 50})

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString()
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.error(error)
    },
  }),
})

const MyApp = (props: AppProps) => {
  const {Component, pageProps} = props

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
          <AppCacheProvider {...props}>
            <MuiThemeProvider theme={theme}>
              <Web3Provider>
                <CssBaseline />
                <GlobalStyles styles={[globalStyles]} />

                <SnackbarProvider>
                  <Layout>
                    <Component {...pageProps} />
                    <ZendeskWidget />
                    {/* <JotaiDevTools /> */}
                    <ReactQueryDevtools buttonPosition="bottom-left" />
                    <GoogleAnalytics gaId="G-E0PDMEJQ0T" />
                  </Layout>
                </SnackbarProvider>
              </Web3Provider>
            </MuiThemeProvider>
          </AppCacheProvider>
        </JotaiProvider>
      </QueryClientProvider>
    </SWRConfig>
  )
}

export default MyApp
