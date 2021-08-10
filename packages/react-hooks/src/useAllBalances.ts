import { useApiPromise } from '@phala/react-libs'
import type { DeriveBalancesAll } from '@polkadot/api-derive/types'
import { useEffect, useState } from 'react'

const useAllBalances = (address: string): DeriveBalancesAll | undefined => {
  const { api } = useApiPromise()
  const [allBalances, setAllBalances] = useState<DeriveBalancesAll>()

  useEffect(() => {
    let unsub: Function
    if (api && address) {
      api.derive.balances
        .all(address, (result) => {
          setAllBalances(result)
        })
        .then((_unsub) => (unsub = _unsub))
    }

    return () => {
      unsub?.()
    }
  }, [api, address])

  return allBalances
}

export default useAllBalances
