import HydrateAtoms from '@/components/HydrateAtoms'
import Layout from '@/components/Layout'
import ZendeskWidget from '@/components/ZendeskWidget'
import {createEmotionCache} from '@/lib/createEmotionCache'
import {globalStyles} from '@/lib/styles'
import {theme} from '@/lib/theme'
import {chainAtom} from '@/store/common'
import {CacheProvider, type EmotionCache} from '@emotion/react'
import {
  Box,
  CssBaseline,
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import Decimal from 'decimal.js'
import {Provider as JotaiProvider} from 'jotai'
import {DevTools as JotaiDevTools} from 'jotai-devtools'
import {type AppProps} from 'next/app'
import {type FC} from 'react'
import {SWRConfig} from 'swr'

Decimal.set({toExpNeg: -9e15, toExpPos: 9e15, precision: 50})

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

const queryClient = new QueryClient({})

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const App: FC<MyAppProps> = (props) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    router,
  } = props

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
            <CacheProvider value={emotionCache}>
              <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles styles={[globalStyles]} />
                <Layout>
                  <Component {...pageProps} />
                  <ZendeskWidget />
                  {process.env.NODE_ENV === 'development' && (
                    <Box position="fixed" ml={1} mb={8} bottom={0} left={0}>
                      <JotaiDevTools />
                    </Box>
                  )}
                  <ReactQueryDevtools buttonPosition="bottom-left" />
                </Layout>
              </MuiThemeProvider>
            </CacheProvider>
          </HydrateAtoms>
        </JotaiProvider>
      </QueryClientProvider>
    </SWRConfig>
  )
}

export default App
