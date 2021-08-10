import { useEffect, useState } from 'react'
import type { Balance, AccountId } from '@polkadot/types/interfaces'
import { VoidFn } from '@polkadot/api/types'
import { useApiPromise } from '../libs/polkadot/hooks/useApiPromise'

export const useBalance = (
  address?: string | AccountId | Uint8Array
): Balance | undefined => {
  const { api, readystate } = useApiPromise()
  const [balance, setBalance] = useState<Balance>()
  const initialized = readystate === 'ready'

  useEffect(() => {
    if (!address || !initialized || !api) {
      return
    }

    let unsubscribe: VoidFn

    api.query.system
      .account(address, ({ data: { free } }) => {
        setBalance(free)
      })
      .then((_unsubscribe) => (unsubscribe = _unsubscribe))

    return () => {
      unsubscribe?.()
    }
  }, [api, initialized, address])

  return balance
}
