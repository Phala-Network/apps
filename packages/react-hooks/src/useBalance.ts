import {useApiPromise} from '@phala/react-libs'
import type {AccountId} from '@polkadot/types/interfaces'
import BN from 'bn.js'
import {useEffect, useState} from 'react'

export default function useBalance(
  address?: string | AccountId | Uint8Array
): BN | undefined {
  const {api, readystate} = useApiPromise()
  const [balance, setBalance] = useState<BN>()
  const initialized = readystate === 'ready'

  useEffect(() => {
    if (!address || !initialized || !api) {
      return
    }

    let unsubscribe: () => void

    // max(0, data.free - max(data.frozenAll, data.miscFrozen, data.feeFrozen))
    api.query.system
      .account(address, ({data}) => {
        const miscFrozen = new BN(data.miscFrozen)
        const feeFrozen = new BN(data.feeFrozen)
        const maxFrozen = BN.max(miscFrozen, feeFrozen)
        setBalance(BN.max(new BN(0), new BN(data.free).sub(maxFrozen)))
      })
      .then((_unsubscribe) => (unsubscribe = _unsubscribe))

    return () => {
      unsubscribe?.()
    }
  }, [api, initialized, address])

  return balance
}
