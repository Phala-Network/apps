import {useApiPromise} from '@phala/react-libs'
import type {AccountId, LockIdentifier} from '@polkadot/types/interfaces'
import {useEffect, useState} from 'react'
import {hexToString} from '@polkadot/util'
import {Decimal} from 'decimal.js'

function lookupLock(lockId: LockIdentifier): string {
  const lockHex = lockId.toHex()

  try {
    const lockName = hexToString(lockHex)

    return lockName
  } catch (error) {
    return lockHex
  }
}

export default function useLockedBalance(
  address?: string | AccountId | Uint8Array
) {
  const {api, readystate} = useApiPromise()
  const [delegateBalance, setDelegateBalance] = useState<Decimal>()
  const [crowdloanVestingBalance, setCrowdloanVestingBalance] =
    useState<Decimal>()
  const initialized = readystate === 'ready'

  useEffect(() => {
    if (!address) {
      setDelegateBalance(undefined)
      setCrowdloanVestingBalance(undefined)
      return
    }
    if (!initialized || !api) {
      return
    }
    let unmounted = false
    let unsubscribe: () => void

    api.query.balances
      .locks(address, (data) => {
        data.forEach(({id, amount}) => {
          if (unmounted) return
          const idStr = lookupLock(id).trim()
          if (idStr === 'vesting') {
            setCrowdloanVestingBalance(new Decimal(amount.toString()))
          }
          if (idStr === 'phala/sp') {
            setDelegateBalance(new Decimal(amount.toString()))
          }
        })
      })
      .then((_unsubscribe) => (unsubscribe = _unsubscribe))

    return () => {
      setDelegateBalance(undefined)
      setCrowdloanVestingBalance(undefined)
      unmounted = true
      unsubscribe?.()
    }
  }, [api, initialized, address])

  return {
    delegateBalance,
    crowdloanVestingBalance,
  }
}
