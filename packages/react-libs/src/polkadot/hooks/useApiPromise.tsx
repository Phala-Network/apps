import {ApiPromise, WsProvider} from '@polkadot/api'
import {RegistryTypes} from '@polkadot/types/types'
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

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

const enableApiPromise = async (
  endpoint: string,
  types: RegistryTypes
): Promise<ApiPromise> => {
  const {cryptoWaitReady} = await import('@polkadot/util-crypto')
  await cryptoWaitReady()

  const {ApiPromise} = await import('@polkadot/api')
  const api = await ApiPromise.create({
    provider: new WsProvider(endpoint),
    types,
  })

  await api.isReady

  return api
}

export const ApiPromiseProvider: FC<{
  endpoint: string
  children: ReactNode
  registryTypes: RegistryTypes
}> = ({children, endpoint, registryTypes}) => {
  const waitEnable = useRef<Promise<ApiPromise | void>>()
  const [api, setApi] = useState<ApiPromise>()
  const [readystate, setState] = useState<Readystate>('unavailable')
  const [activeEndpoint, setActiveEndpoint] = useState<string | undefined>()

  useEffect(() => {
    let unmounted = false
    setApi(undefined)
    setState('init')

    const updateApi = async () => {
      if (waitEnable.current) {
        const prevApi = await waitEnable.current
        prevApi?.disconnect()
      }
      waitEnable.current = enableApiPromise(endpoint, registryTypes)
        .then((api) => {
          if (unmounted) return
          setApi(api)
          setActiveEndpoint(endpoint)
          setState('ready')
          return api
        })
        .catch(() => {
          setState('failed')
        })
    }

    updateApi()

    return () => {
      unmounted = true
    }
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
