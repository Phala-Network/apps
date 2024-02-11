import GlobalStyles from '@/components/GlobalStyles'
import GtagScript from '@/components/GtagScript'
import Layout from '@/components/Layout'
import MuiThemeProvider from '@/components/MuiThemeProvider'
import {createEmotionCache} from '@/lib/createEmotionCache'
import {CacheProvider, type EmotionCache} from '@emotion/react'
import {CssBaseline} from '@mui/material'
import Decimal from 'decimal.js'
import {Provider as JotaiProvider} from 'jotai'
import {DevTools as JotaiDevTools} from 'jotai-devtools'
import {type AppProps} from 'next/app'
import Head from 'next/head'
import {SnackbarProvider} from 'notistack'
import {type FC} from 'react'
import {SWRConfig} from 'swr'

Decimal.set({toExpNeg: -9e15, toExpPos: 9e15, precision: 50})

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp: FC<MyAppProps> = (props) => {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props

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

      <GtagScript />

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
          <CacheProvider value={emotionCache}>
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
          </CacheProvider>
        </JotaiProvider>
      </SWRConfig>
    </>
  )
}

export default MyApp
