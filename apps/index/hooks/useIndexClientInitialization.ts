import {clientAtom} from '@/store/core'
import {Client, Environment} from '@phala/index'
import {useAtom} from 'jotai'
import {useEffect} from 'react'

export const useIndexClientInitialization = (): void => {
  const [, setClient] = useAtom(clientAtom)

  useEffect(() => {
    const client = new Client({environment: Environment.TESTNET})
    void client.isReady.then(() => {
      setClient(client)
    })
  }, [setClient])
}
