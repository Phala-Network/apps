import { Provider as AppStoreProvider } from '@phala/app-store'
import { isDev, isTest } from '@phala/utils'
import React, { useRef } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'styled-components'
import MobileToastContextProvider from './components/MobileToast/MobileToastContextProvider'
import './fonts.css'
import { EthersProvider } from './libs/ethereum/contexts/useEthers'
import { Web3Provider as EthereumWeb3Provider } from './libs/ethereum/contexts/useWeb3'
import { ApiPromiseProvider } from './libs/polkadot/hooks/useApiPromise'
import { NetworkContextProvider } from './libs/polkadot/hooks/useSubstrateNetwork'
import { Web3Provider as PolkadotWeb3Provider } from './libs/polkadot/hooks/useWeb3'
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
    <ThemeProvider theme={theme}>
      <MobileToastContextProvider>
        <QueryClientProvider client={client.current}>
          <EthereumWeb3Provider>
            <AppStoreProvider>
              <EthersProvider>
                <NetworkContextProvider defaultNetwork={defaultNetwork}>
                  <ApiPromiseProvider>
                    <PolkadotWeb3Provider originName="ChainBridge Operator">
                      {children}
                    </PolkadotWeb3Provider>
                  </ApiPromiseProvider>
                </NetworkContextProvider>
              </EthersProvider>
            </AppStoreProvider>
          </EthereumWeb3Provider>
        </QueryClientProvider>
      </MobileToastContextProvider>
    </ThemeProvider>
  )
}

export default WrapApp
