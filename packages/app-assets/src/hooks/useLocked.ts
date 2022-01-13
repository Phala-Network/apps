import {useApiPromise} from '@phala/react-libs'
import type {
  AccountId,
  Balance,
  LockIdentifier,
} from '@polkadot/types/interfaces'
import {useEffect, useState} from 'react'
import {hexToString} from '@polkadot/util'

function lookupLock(lockId: LockIdentifier): string {
  const lockHex = lockId.toHex()

  try {
    const lockName = hexToString(lockHex)

    return lockName
  } catch (error) {
    return lockHex
  }
}

export default function useBalance(address?: string | AccountId | Uint8Array) {
  const {api, readystate} = useApiPromise()
  const [delegateBalance, setDelegateBalance] = useState<Balance>()
  const [crowdloanVestingBalance, setCrowdloanVestingBalance] =
    useState<Balance>()
  const initialized = readystate === 'ready'

  useEffect(() => {
    if (!address || !initialized || !api) {
      return
    }

    let unsubscribe: () => void

    api.query.balances
      .locks(address, (data) => {
        data.forEach(({id, amount}) => {
          const idStr = lookupLock(id).trim()
          if (idStr === 'vesting') {
            setCrowdloanVestingBalance(amount)
          }
          if (idStr === 'phala/sp') {
            setDelegateBalance(amount)
          }
        })
      })
      .then((_unsubscribe) => (unsubscribe = _unsubscribe))

    return () => {
      unsubscribe?.()
    }
  }, [api, initialized, address])

  return {
    delegateBalance,
    crowdloanVestingBalance,
  }
}
