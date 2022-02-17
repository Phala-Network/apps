import {ApiPromise, WsProvider} from '@polkadot/api'
import {RegistryTypes} from '@polkadot/types/types'
import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react'
import {useCustomEndpointAtom} from '@phala/app-store'
import {useNetworkContext} from './useSubstrateNetwork'

type Readystate = 'unavailable' | 'init' | 'ready' | 'failed'

interface IApiPromiseContext {
  api?: ApiPromise
  readystate: Readystate
  initialized: boolean
  endpoint?: string
}

const ApiPromiseContext = createContext<IApiPromiseContext>({
  readystate: 'unavailable',
  initialized: false,
})

// eslint-disable-next-line no-console
const logDebug = console.debug.bind(console, '[ApiPromiseContext]')
const logError = console.error.bind(console, '[ApiPromiseContext]')

const enableApiPromise = async (
  endpoint: string,
  types: RegistryTypes
): Promise<ApiPromise> => {
  const {cryptoWaitReady} = await import('@polkadot/util-crypto')
  await cryptoWaitReady()
  logDebug('Polkadot crypto is ready')

  const {ApiPromise} = await import('@polkadot/api')
  const api = await ApiPromise.create({
    provider: new WsProvider(endpoint),
    types,
  })
  logDebug('WebSocket API is ready:', api.runtimeVersion)

  await api.isReady

  return api
}

export const ApiPromiseProvider = ({
  children,
}: PropsWithChildren<unknown>): ReactElement => {
  const waitEnable = useRef<Promise<ApiPromise | void>>()
  const [api, setApi] = useState<ApiPromise>()
  const [readystate, setState] = useState<Readystate>('unavailable')
  const {options} = useNetworkContext()
  const [customEndpoint] = useCustomEndpointAtom()
  const endpoint = customEndpoint || options?.endpoint
  const registryTypes = options?.typedefs
  const [activeEndpoint, setActiveEndpoint] = useState<string | undefined>()

  useEffect(() => {
    if (endpoint === undefined || registryTypes === undefined) {
      // do nothing while no network is selected
      return
    }

    setApi(undefined)
    setState('init')

    const updateApi = async () => {
      if (waitEnable.current) {
        const prevApi = await waitEnable.current
        prevApi?.disconnect()
      }
      waitEnable.current = enableApiPromise(endpoint, registryTypes)
        .then((api) => {
          setApi(api)
          setActiveEndpoint(endpoint)
          setState('ready')
          return api
        })
        .catch((reason) => {
          logError('Failed to enable Polkadot API:', reason)
          setState('failed')
        })
    }

    updateApi()
  }, [endpoint, registryTypes])

  const value = {
    api,
    readystate,
    initialized: readystate === 'ready',
    endpoint: activeEndpoint,
  }

  return (
    <ApiPromiseContext.Provider value={value}>
      {children}
    </ApiPromiseContext.Provider>
  )
}

export const useApiPromise = (): IApiPromiseContext =>
  useContext(ApiPromiseContext)
