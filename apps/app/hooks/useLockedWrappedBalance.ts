import {type VoidFn} from '@polkadot/api/types'
import Decimal from 'decimal.js'
import {useEffect, useState} from 'react'
import usePolkadotApi from './usePolkadotApi'

const useLockedWrappedBalance = (account?: string): Decimal | undefined => {
  const api = usePolkadotApi()
  const [balance, setBalance] = useState<Decimal>()

  useEffect(() => {
    setBalance(undefined)
    if (api == null || account === undefined) {
      return
    }
    let unsub: VoidFn
    let unmounted = false
    void api.query.phalaWrappedBalances
      .stakerAccounts(account, (res) => {
        try {
          const unwrapped = res.unwrap()
          if (!unmounted) {
            setBalance(new Decimal(unwrapped.locked.toString()).div(1e12))
          }
        } catch (err) {
          setBalance(new Decimal(0))
        }
      })
      .then((fn) => {
        unsub = fn
      })
    return () => {
      unmounted = true
      unsub?.()
    }
  }, [api, account])

  return balance
}

export default useLockedWrappedBalance
