import { usePolkadotAccountAtom } from '@phala/app-store'
import type { DeriveBalancesAll } from '@polkadot/api-derive/types'
import { useEffect, useState } from 'react'
import { useApiPromise } from '../libs/polkadot/hooks/useApiPromise'

const useAllBalances = (): DeriveBalancesAll | undefined => {
  const [polkadotAccount] = usePolkadotAccountAtom()
  const address = polkadotAccount?.address
  const { api } = useApiPromise()
  const [allBalances, setAllBalances] = useState<DeriveBalancesAll>()

  useEffect(() => {
    let unsub: () => void
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
