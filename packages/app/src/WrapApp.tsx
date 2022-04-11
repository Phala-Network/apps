import {ethereumGraphEndpoint} from '@phala/app-config'
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
import {useSubscribeWalletAccounts} from './hooks/useSubscribeWalletAccounts'
import useZendesk from './hooks/useZendesk'
import theme, {baseTheme} from './theme'
import {useAtomsDevtools} from 'jotai/devtools'
import {useAutoConnectWallet} from './hooks/useAutoConnectWallet'

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

  const productionConfig = {
    defaultNetwork,
    substrateGraphEndpoint:
      'https://api.subquery.network/sq/Phala-Network/khala-chainbridge',
    ethereumGraphEndpoint: isProduction()
      ? ethereumGraphEndpoint.production
      : ethereumGraphEndpoint.development,
  }

  useZendesk()
  useAutoConnectWallet()
  useSubscribeWalletAccounts()
  useAtomsDevtools('Phala App')

  return (
    <StrictMode>
      <div>
        <QueryClientProvider contextSharing={true} client={client.current}>
          <LibProvider {...productionConfig}>
            <ThemeProvider theme={theme}>
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
            </ThemeProvider>
            <ReactQueryDevtools />
          </LibProvider>
        </QueryClientProvider>
      </div>
    </StrictMode>
  )
}

export default WrapApp
