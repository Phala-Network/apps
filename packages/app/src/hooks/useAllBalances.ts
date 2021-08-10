import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import type { DeriveBalancesAll } from '@polkadot/api-derive/types'
import polkadotAccountAtom from '../atoms/polkadotAccountAtom'
import { useApiPromise } from '../libs/polkadot/hooks/useApiPromise'
import { VoidFn } from '@polkadot/api/types'

const useAllBalances = (): DeriveBalancesAll | undefined => {
  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  const address = polkadotAccount?.address
  const { api } = useApiPromise()
  const [allBalances, setAllBalances] = useState<DeriveBalancesAll>()

  useEffect(() => {
    let unsub: VoidFn
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
