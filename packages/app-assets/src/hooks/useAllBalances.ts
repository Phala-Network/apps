import { usePolkadotAccountAtom } from '@phala/app-store'
import { useApiPromise } from '@phala/react-libs/esm/polkadot/hooks/useApiPromise'
import type { DeriveBalancesAll } from '@polkadot/api-derive/types'
import { useEffect, useState } from 'react'

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
          // FIXME: confused
          // @ts-ignore
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
