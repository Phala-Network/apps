import {ethereumGraphEndpoint} from '@phala/app-config'
import {Provider as AppStoreProvider} from '@phala/app-store'
import {getCMSLog} from '@phala/react-cms'
import {MobileToastContextProvider} from '@phala/react-components'
import {Provider as LibProvider} from '@phala/react-libs'
import {isProduction} from '@phala/utils'
import * as Sentry from '@sentry/react'
import React, {StrictMode, useLayoutEffect, useRef} from 'react'
import {Helmet} from 'react-helmet'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {ThemeProvider} from 'styled-components'
import {BaseProvider} from 'baseui'
import './fonts.css'
import theme, {baseTheme} from './theme'
import {SnackbarProvider} from 'baseui/snackbar'
import {toaster, ToasterContainer} from 'baseui/toast'

const WrapApp: React.FC = ({children}) => {
  const client = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnMount: false,
          refetchOnWindowFocus: false,
          onError: () => {
            toaster.negative(
              'Something went wrong. Please try again later.',
              {}
            )
          },
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
  }

  useLayoutEffect(() => {
    getCMSLog().catch((e) => Sentry.captureException(e))

    // re-position the Web Widget (Classic)
    // https://developer.zendesk.com/api-reference/widget/settings/?_ga=2.264317322.488128662.1641529242-1063742040.1641529242#offset
    if (window) {
      window.zESettings = {
        webWidget: {
          offset: {
            mobile: {
              vertical: '70px',
            },
          },
        },
      }
    }
  }, [])

  return (
    <StrictMode>
      <div>
        <Helmet>
          <script
            id="ze-snippet"
            src="https://static.zdassets.com/ekr/snippet.js?key=fca22f47-80b0-47a4-8cde-80ca1fe206d2"
          />
        </Helmet>
        <AppStoreProvider>
          <LibProvider {...productionConfig}>
            <QueryClientProvider contextSharing={true} client={client.current}>
              <ThemeProvider theme={theme}>
                <MobileToastContextProvider>
                  <BaseProvider theme={baseTheme}>
                    <SnackbarProvider>{children}</SnackbarProvider>
                    <ToasterContainer
                      autoHideDuration={3000}
                      overrides={{
                        ToastBody: {
                          style: {
                            maxWidth: '100%',
                            width: '400px',
                          },
                        },
                      }}
                    />
                  </BaseProvider>
                </MobileToastContextProvider>
              </ThemeProvider>
              <ReactQueryDevtools />
            </QueryClientProvider>
          </LibProvider>
        </AppStoreProvider>
      </div>
    </StrictMode>
  )
}

export default WrapApp
