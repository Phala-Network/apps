import {Provider as AppStoreProvider} from '@phala/app-store'
import {getCMSLog} from '@phala/react-cms'
import {MobileToastContextProvider} from '@phala/react-components'
import {I18nextProvider} from '@phala/react-i18n'
import {Provider as LibProvider} from '@phala/react-libs'
import {isDev, isTest} from '@phala/utils'
import * as Sentry from '@sentry/react'
import React, {useLayoutEffect, useRef} from 'react'
import {Helmet} from 'react-helmet'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {ThemeProvider} from 'styled-components'
import './fonts.css'
import useCustomEndpoint from './hooks/useCustomEndpoint'
import theme from './theme'

const WrapApp: React.FC = ({children}) => {
  const customEndpoint = useCustomEndpoint()
  const client = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnMount: false,
          refetchOnWindowFocus: false,
        },
      },
    })
  )

  const defaultNetwork =
    process.env['GATSBY_DEFAULT_NETWORK'] ||
    (isDev() || isTest() ? 'khala-pc-test' : 'khala')

  // eslint-disable-next-line no-console
  console.info('defaultNetwork', defaultNetwork)

  const productionConfig = {
    defaultNetwork,
    substrateGraphEndpoint:
      'https://api.subquery.network/sq/Phala-Network/khala-chainbridge',
    ethereumGraphEndpoint:
      'https://gateway.thegraph.com/api/cfd0e529ce4d511c6ec482c97faafa99/subgraphs/id/0x7dc6f99be5cf16d605bedf237771413aaa3021b1-0',
    customEndpoint,
  }

  useLayoutEffect(() => {
    getCMSLog().catch((e) => Sentry.captureException(e))
  }, [])

  return (
    <I18nextProvider>
      <Helmet>
        <script
          type="text/javascript"
          src="https://api.map.baidu.com/getscript?v=2.0&ak=EOI79Ys8F8IN75wY5jfzRwKjGtQ5eKPz"
        />
      </Helmet>
      <LibProvider {...productionConfig}>
        <QueryClientProvider contextSharing={true} client={client.current}>
          <ThemeProvider theme={theme}>
            <MobileToastContextProvider>
              <AppStoreProvider>{children}</AppStoreProvider>
            </MobileToastContextProvider>
          </ThemeProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </LibProvider>
    </I18nextProvider>
  )
}

export default WrapApp
