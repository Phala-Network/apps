import HydrateAtoms from '@/components/HydrateAtoms'
import Layout from '@/components/Layout'
import ZendeskWidget from '@/components/ZendeskWidget'
import {globalStyles} from '@/lib/styles'
import {theme} from '@/lib/theme'
import {chainAtom} from '@/store/common'
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material'
import {AppCacheProvider} from '@mui/material-nextjs/v14-pagesRouter'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import Decimal from 'decimal.js'
import {Provider as JotaiProvider} from 'jotai'
import type {AppProps} from 'next/app'
import dynamic from 'next/dynamic'
import type {FC} from 'react'
import {SWRConfig} from 'swr'

Decimal.set({toExpNeg: -9e15, toExpPos: 9e15, precision: 50})

const queryClient = new QueryClient({})

const JotaiDevTools = dynamic(() =>
  import('@phala/lib').then((lib) => lib.JotaiDevTools),
)

const App: FC<AppProps> = (props) => {
  const {Component, pageProps, router} = props

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
          <HydrateAtoms
            initialValues={
              new Map(
                typeof router.query.chain === 'string'
                  ? [[chainAtom, router.query.chain]]
                  : [],
              )
            }
          >
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
          </HydrateAtoms>
        </JotaiProvider>
      </QueryClientProvider>
    </SWRConfig>
  )
}

export default App
