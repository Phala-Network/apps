import {useCallback} from 'react'
import {SubstrateNetworkOptions, substrates} from '@phala/app-config'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

interface INetworkContext {
  /**
   * id of currently currently connected network
   */
  network?: string

  /**
   * network options of currently connected network
   */
  options?: SubstrateNetworkOptions

  /**
   * switch to network {id}
   */
  setNetwork: (id: string) => void
}

const NetworkContext = createContext<INetworkContext>({setNetwork: () => null})

export const NetworkContextProvider = ({
  children,
  defaultNetwork,
  customEndpoint,
}: PropsWithChildren<{
  defaultNetwork: string
  customEndpoint?: string
}>): JSX.Element => {
  const [network, setNetwork] = useState<string>(defaultNetwork)

  if (substrates[defaultNetwork] === undefined) {
    throw new Error(`Default network ${defaultNetwork} is not configured`)
  }

  const handleSetNetwork = useCallback((id: string) => {
    if (substrates[id] === undefined) {
      throw new Error(`Network ${id} is not configured`)
    }

    setNetwork(id)
  }, [])

  useEffect(() => {
    setNetwork(defaultNetwork)
  }, [defaultNetwork])

  const options = substrates[network] as SubstrateNetworkOptions
  if (customEndpoint) {
    options.endpoint = customEndpoint
  }

  const value = {
    network,
    options,
    setNetwork: handleSetNetwork,
  }

  return (
    <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
  )
}

export const useNetworkContext = (): INetworkContext =>
  useContext(NetworkContext)
