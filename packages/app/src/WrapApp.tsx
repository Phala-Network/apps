import {ethereumGraphEndpoint} from '@phala/app-config'
import {Provider as AppStoreProvider} from '@phala/app-store'
import {getCMSLog} from '@phala/react-cms'
import {MobileToastContextProvider} from '@phala/react-components'
import {Provider as LibProvider} from '@phala/react-libs'
import {isProduction} from '@phala/utils'
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

  const defaultNetwork = 'khala'

  // eslint-disable-next-line no-console
  console.info('defaultNetwork', defaultNetwork)

  const productionConfig = {
    defaultNetwork,
    substrateGraphEndpoint:
      'https://api.subquery.network/sq/Phala-Network/khala-chainbridge',
    ethereumGraphEndpoint: isProduction()
      ? ethereumGraphEndpoint.production
      : ethereumGraphEndpoint.development,

    customEndpoint,
  }

  useLayoutEffect(() => {
    getCMSLog().catch((e) => Sentry.captureException(e))
  }, [])

  return (
    <div>
      <Helmet>
        <script
          id="ze-snippet"
          src="https://static.zdassets.com/ekr/snippet.js?key=fca22f47-80b0-47a4-8cde-80ca1fe206d2"
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
    </div>
  )
}

export default WrapApp
