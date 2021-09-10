import {FC, useRef} from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {EthersProvider} from './ethereum/contexts/useEthers'
import {Web3Provider as EthereumWeb3Provider} from './ethereum/contexts/useWeb3'
import {EthereumGraphQLProvider} from './ethereum/GraphQLClientContext'
import {SubstrateGraphQLProvider} from './polkadot/GraphQLClientContext'
import {ApiPromiseProvider} from './polkadot/hooks/useApiPromise'
import {NetworkContextProvider} from './polkadot/hooks/useSubstrateNetwork'
import {Web3Provider as PolkadotWeb3Provider} from './polkadot/hooks/useWeb3'

export interface ProviderProps {
  ethereumGraphEndpoint: string
  substrateGraphEndpoint: string
  defaultNetwork?: string
  customEndpoint?: string
}

export const Provider: FC<ProviderProps> = (props) => {
  const {
    ethereumGraphEndpoint = '',
    substrateGraphEndpoint = '',
    defaultNetwork = 'khala',
    customEndpoint,
    children,
  } = props
  const client = useRef(new QueryClient())

  return (
    <QueryClientProvider contextSharing={true} client={client.current}>
      <SubstrateGraphQLProvider endpoint={substrateGraphEndpoint}>
        <EthereumGraphQLProvider endpoint={ethereumGraphEndpoint}>
          <EthereumWeb3Provider>
            <EthersProvider>
              <NetworkContextProvider
                defaultNetwork={defaultNetwork}
                customEndpoint={customEndpoint}
              >
                <ApiPromiseProvider>
                  <PolkadotWeb3Provider originName="ChainBridge Operator">
                    {children}
                  </PolkadotWeb3Provider>
                </ApiPromiseProvider>
              </NetworkContextProvider>
            </EthersProvider>
          </EthereumWeb3Provider>
        </EthereumGraphQLProvider>
      </SubstrateGraphQLProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
