import { isDev, isTest } from '@phala/utils'
import { FC, useRef } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { EthersProvider } from './ethereum/contexts/useEthers'
import { Web3Provider as EthereumWeb3Provider } from './ethereum/contexts/useWeb3'
import { EthereumGraphQLProvider } from './ethereum/GraphQLClientContext'
import { ApiPromiseProvider } from './polkadot/hooks/useApiPromise'
import { NetworkContextProvider } from './polkadot/hooks/useSubstrateNetwork'
import { Web3Provider as PolkadotWeb3Provider } from './polkadot/hooks/useWeb3'

export interface ProviderProps {
  ethereumGraphEndpoint: string
}

export const Provider: FC<ProviderProps> = (props) => {
  const { ethereumGraphEndpoint = '', children } = props
  const client = useRef(new QueryClient())

  const defaultNetwork =
    process.env['GATSBY_DEFAULT_NETWORK'] ||
    (isDev() || isTest() ? 'poc4-dev' : 'khala')

  // eslint-disable-next-line no-console
  console.info('defaultNetwork', defaultNetwork)

  return (
    <QueryClientProvider contextSharing={true} client={client.current}>
      <EthereumGraphQLProvider endpoint={ethereumGraphEndpoint}>
        <EthereumWeb3Provider>
          <EthersProvider>
            <NetworkContextProvider defaultNetwork={defaultNetwork}>
              <ApiPromiseProvider>
                <PolkadotWeb3Provider originName="ChainBridge Operator">
                  {children}
                </PolkadotWeb3Provider>
              </ApiPromiseProvider>
            </NetworkContextProvider>
          </EthersProvider>
        </EthereumWeb3Provider>
      </EthereumGraphQLProvider>
    </QueryClientProvider>
  )
}
