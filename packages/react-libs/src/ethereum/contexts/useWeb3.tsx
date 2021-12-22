import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Web3Modal from 'web3modal'

export type Readystate = 'idle' | 'connecting' | 'connected' | 'unavailable'

interface Provider {
  readonly _: unique symbol
  on?(
    eventName: 'accountsChanged',
    handler: (accounts?: string[]) => void
  ): void
  on?(eventName: 'chainChanged', handler: () => void): void
}

interface IWeb3Context {
  /**
   * Injected accounts notified by `accountsChanged`
   */
  accounts: string[]

  provider?: Provider
  readystate: Readystate
  ethereumWeb3connect(): void
}

const Web3Context = createContext<IWeb3Context>({
  accounts: [],
  readystate: 'idle',
  ethereumWeb3connect: () => null,
})

export const Web3Provider = ({
  children,
}: PropsWithChildren<unknown>): JSX.Element => {
  const [accounts, setAccounts] = useState<string[]>([])
  const [provider, setProvider] = useState<Provider>()
  const [readystate, setReadystate] = useState<Readystate>('idle')

  const web3Modal = useMemo(
    () =>
      typeof window !== 'undefined'
        ? new Web3Modal({
            cacheProvider: true,
            providerOptions: {},
          })
        : {
            connect: () => {
              throw new Error('web3modal is unavailable in SSR')
            },
          },
    []
  )

  const ethereumWeb3connect = useCallback(() => {
    if (readystate !== 'idle') {
      return
    }

    setAccounts([])
    setReadystate('connecting')
    web3Modal
      .connect()
      .then((provider) => {
        setReadystate('connected')
        setProvider(provider as Provider)
      })
      .catch(() => {
        setReadystate('unavailable')
      })
  }, [readystate, web3Modal])

  useEffect(() => {
    provider?.on?.('accountsChanged', (accounts) => {
      setAccounts(accounts ?? [])
    })
    provider?.on?.('chainChanged', () => {
      setProvider(undefined)
      setReadystate('idle')
    })
  }, [provider])

  return (
    <Web3Context.Provider
      value={{accounts, provider, readystate, ethereumWeb3connect}}
    >
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = (): IWeb3Context => useContext(Web3Context)
