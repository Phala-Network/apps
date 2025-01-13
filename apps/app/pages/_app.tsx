import Layout from '@/components/Layout'
import {Web3Provider} from '@/components/Web3Provider'
import ZendeskWidget from '@/components/ZendeskWidget'
import {globalStyles} from '@/lib/styles'
import {theme} from '@/lib/theme'
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material'
import {AppCacheProvider} from '@mui/material-nextjs/v14-pagesRouter'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import Decimal from 'decimal.js'
import {Provider as JotaiProvider} from 'jotai'
import type {AppProps} from 'next/app'
import dynamic from 'next/dynamic'
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

const JotaiDevTools = dynamic(() =>
  import('@phala/lib').then((lib) => lib.JotaiDevTools),
)

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
          <Web3Provider>
            <AppCacheProvider {...props}>
              <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles styles={[globalStyles]} />

                <Layout>
                  <Component {...pageProps} />
                  <ZendeskWidget />
                  {process.env.NODE_ENV === 'development' && <JotaiDevTools />}
                  <ReactQueryDevtools buttonPosition="bottom-left" />
                </Layout>
              </MuiThemeProvider>
            </AppCacheProvider>
          </Web3Provider>
        </JotaiProvider>
      </QueryClientProvider>
    </SWRConfig>
  )
}

export default MyApp
