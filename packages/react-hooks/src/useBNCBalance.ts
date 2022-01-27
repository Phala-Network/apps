import {useApiPromise} from '@phala/react-libs'
import type {AccountId} from '@polkadot/types/interfaces'
import {useEffect, useState} from 'react'
import {Decimal} from 'decimal.js'

export default function useBNCBalance(
  address?: string | AccountId | Uint8Array
): Decimal | undefined {
  const {api, readystate} = useApiPromise()
  const [bncBalance, setBNCBalance] = useState<Decimal>()
  const initialized = readystate === 'ready'
  useEffect(() => {
    if (!address || !initialized || !api) {
      return
    }

    let unsubscribe: () => void

    api.query.assets
      .account(2, address, ({balance}) => {
        setBNCBalance(new Decimal(balance.toString()))
      })
      .then((_unsubscribe) => (unsubscribe = _unsubscribe))

    return () => {
      unsubscribe?.()
    }
  }, [api, initialized, address])

  return bncBalance
}
