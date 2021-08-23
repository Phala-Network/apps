import { Provider as AppStoreProvider } from '@phala/app-store'
import { MobileToastContextProvider } from '@phala/react-components'
import { Provider as LibProvider } from '@phala/react-libs'
import { isDev, isTest } from '@phala/utils'
import React, { useRef } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'styled-components'
import './fonts.css'
import './ReactToastify.css'
import theme from './theme'
import './tooltip.css'

const WrapApp: React.FC = ({ children }) => {
  const client = useRef(new QueryClient())

  const defaultNetwork =
    process.env['GATSBY_DEFAULT_NETWORK'] ||
    (isDev() || isTest() ? 'poc4-dev' : 'khala')

  // eslint-disable-next-line no-console
  console.info('defaultNetwork', defaultNetwork)

  return (
    <LibProvider
      substrateGraphEndpoint="https://chainbridge-substrate-graph-testing.phala.works/"
      defaultNetwork={defaultNetwork}
      ethereumGraphEndpoint={
        'https://graphs-api.phala.network/subgraphs/name/chainbridge'
      }>
      <ThemeProvider theme={theme}>
        <MobileToastContextProvider>
          <QueryClientProvider contextSharing={true} client={client.current}>
            <AppStoreProvider>{children}</AppStoreProvider>
          </QueryClientProvider>
        </MobileToastContextProvider>
      </ThemeProvider>
    </LibProvider>
  )
}

export default WrapApp
