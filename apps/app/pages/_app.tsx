import Layout from '@/components/Layout'
import {createEmotionCache} from '@/lib/createEmotionCache'
import {globalStyles} from '@/lib/styles'
import {theme} from '@/lib/theme'
import {CacheProvider, css, EmotionCache} from '@emotion/react'
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {Provider as JotaiProvider} from 'jotai'
import {AppProps} from 'next/app'
import {FC} from 'react'
import {SWRConfig} from 'swr'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

const queryClient = new QueryClient({})

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const App: FC<MyAppProps> = (props) => {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props

  return (
    <SWRConfig
      value={{
        onError: (error, key) => {
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.error(key, error)
          }
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <JotaiProvider>
          <CacheProvider value={emotionCache}>
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <GlobalStyles styles={css([globalStyles])} />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </MuiThemeProvider>
          </CacheProvider>
        </JotaiProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SWRConfig>
  )
}

export default App
