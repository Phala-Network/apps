import {ApiPromiseProvider} from '@phala/react-libs'
import {BaseProvider} from 'baseui'
import {SnackbarProvider} from 'baseui/snackbar'
import {toaster, ToasterContainer} from 'baseui/toast'
import React, {ReactNode, useState} from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {ThemeProvider} from 'styled-components'
import theme, {baseTheme} from './theme'
import {useCurrentNetworkNode} from './store/networkNode'

const WrapApp: React.FC<{children: ReactNode}> = ({children}) => {
  const [currentNetworkNode] = useCurrentNetworkNode()
  const [client] = useState(
    () =>
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

  return (
    <QueryClientProvider contextSharing={true} client={client}>
      <ApiPromiseProvider
        endpoint={currentNetworkNode.endpoint}
        registryTypes={currentNetworkNode.types}
      >
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
      </ApiPromiseProvider>
    </QueryClientProvider>
  )
}

export default WrapApp
