import {ethereumGraphEndpoint} from '@phala/app-config'
import {Provider as AppStoreProvider} from '@phala/app-store'
import {MobileToastContextProvider} from '@phala/react-components'
import {Provider as LibProvider} from '@phala/react-libs'
import {isProduction} from '@phala/utils'
import {BaseProvider} from 'baseui'
import {SnackbarProvider} from 'baseui/snackbar'
import {toaster, ToasterContainer} from 'baseui/toast'
import React, {StrictMode, useRef} from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {ThemeProvider} from 'styled-components'
import './fonts.css'
import useZendesk from './hooks/useZendesk'
import theme, {baseTheme} from './theme'

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

  useZendesk()

  return (
    <StrictMode>
      <div>
        <QueryClientProvider contextSharing={true} client={client.current}>
          <AppStoreProvider>
            <LibProvider {...productionConfig}>
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
            </LibProvider>
          </AppStoreProvider>
        </QueryClientProvider>
      </div>
    </StrictMode>
  )
}

export default WrapApp
