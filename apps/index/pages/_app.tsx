import GlobalStyles from '@/components/GlobalStyles'
import Layout from '@/components/Layout'
import MuiThemeProvider from '@/components/MuiThemeProvider'
import {createEmotionCache} from '@/lib/createEmotionCache'
import {CacheProvider, type EmotionCache} from '@emotion/react'
import {CssBaseline} from '@mui/material'
import {DevTools as JotaiDevTools} from 'jotai-devtools'
import {type AppProps} from 'next/app'
import Head from 'next/head'
import {SnackbarProvider} from 'notistack'
import {type FC} from 'react'
import {SWRConfig} from 'swr'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp: FC<MyAppProps> = (props) => {
  const {
    Component,
    router,
    emotionCache = clientSideEmotionCache,
    pageProps,
  } = props

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>inDEX</title>
      </Head>

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
        {/* <JotaiProvider> */}
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
              {router.pathname === '/_error' ? (
                <Component {...pageProps} />
              ) : (
                <Layout>
                  <Component {...pageProps} />
                  {process.env.NODE_ENV === 'development' && <JotaiDevTools />}
                </Layout>
              )}
            </SnackbarProvider>
          </MuiThemeProvider>
        </CacheProvider>
        {/* </JotaiProvider> */}
      </SWRConfig>
    </>
  )
}

export default MyApp
