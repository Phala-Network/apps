import { Provider as JotaiProvider } from 'jotai'
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
import { isDev } from './utils/isDev'
import { isTest } from './utils/isTest'

const WrapApp: React.FC = ({ children }) => {
  const client = useRef(new QueryClient())
  const defaultNetwork =
    process.env.GATSBY_DEFAULT_NETWORK ||
    (isDev() || isTest() ? 'poc4-dev' : 'khala')

  // eslint-disable-next-line no-console
  console.info('defaultNetwork', defaultNetwork)

  return (
    <ThemeProvider theme={theme}>
      <MobileToastContextProvider>
        <QueryClientProvider client={client.current}>
          <EthereumWeb3Provider>
            <JotaiProvider>
              <EthersProvider>
                <NetworkContextProvider defaultNetwork={defaultNetwork}>
                  <ApiPromiseProvider>
                    <PolkadotWeb3Provider originName="ChainBridge Operator">
                      {children}
                    </PolkadotWeb3Provider>
                  </ApiPromiseProvider>
                </NetworkContextProvider>
              </EthersProvider>
            </JotaiProvider>
          </EthereumWeb3Provider>
        </QueryClientProvider>
      </MobileToastContextProvider>
    </ThemeProvider>
  )
}

export default WrapApp
