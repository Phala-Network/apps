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
import {Provider as JotaiProvider} from 'jotai'
import {AppProps} from 'next/app'
import {FC} from 'react'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const App: FC<MyAppProps> = (props) => {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props

  return (
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
  )
}

export default App
