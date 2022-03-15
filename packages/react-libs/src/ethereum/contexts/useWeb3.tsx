import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import Web3Modal from 'web3modal'

export type Readystate = 'idle' | 'connecting' | 'connected' | 'unavailable'

interface Provider {
  readonly _: unique symbol
  on(eventName: 'accountsChanged', handler: (accounts?: string[]) => void): void
  on(eventName: 'chainChanged', handler: () => void): void
  off(eventName: string): void
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
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>()
  const [accounts, setAccounts] = useState<string[]>([])
  const [provider, setProvider] = useState<Provider>()
  const [readystate, setReadystate] = useState<Readystate>('idle')

  const ethereumWeb3connect = useCallback(async () => {
    try {
      if (web3Modal) return
      const currentWeb3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
        providerOptions: {},
      })
      setWeb3Modal(currentWeb3Modal)
      setAccounts([])
      setReadystate('connecting')
      const newProvider = await currentWeb3Modal.connect()
      setReadystate('connected')
      setProvider(newProvider)
    } catch (err) {
      setReadystate('unavailable')
      setWeb3Modal(undefined)
      setProvider(undefined)
      throw err
    }
  }, [web3Modal])

  useEffect(() => {
    if (provider) {
      provider.on('accountsChanged', (accounts) => {
        setAccounts(accounts ?? [])
      })
      provider.on('chainChanged', () => {
        setProvider(undefined)
        setReadystate('idle')
      })
    }

    return () => {
      provider?.off?.('accountsChanged')
      provider?.off?.('chainChanged')
    }
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
