import {ApiPromiseProvider} from '@phala/react-libs'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {BaseProvider} from 'baseui'
import {SnackbarProvider} from 'baseui/snackbar'
import {toaster, ToasterContainer} from 'baseui/toast'
import React, {ReactNode, useState} from 'react'
import {ThemeProvider} from 'styled-components'
import {useCurrentNetworkNode} from './store/networkNode'
import theme, {baseTheme} from './theme'

const WrapApp: React.FC<{children: ReactNode}> = ({children}) => {
  const [currentNetworkNode] = useCurrentNetworkNode()
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
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

  return (
    <BaseProvider theme={baseTheme}>
      <QueryClientProvider contextSharing={true} client={client}>
        <ApiPromiseProvider
          endpoint={currentNetworkNode.endpoint}
          registryTypes={currentNetworkNode.types}
        >
          <ThemeProvider theme={theme}>
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
          </ThemeProvider>
          <ReactQueryDevtools />
        </ApiPromiseProvider>
      </QueryClientProvider>
    </BaseProvider>
  )
}

export default WrapApp
