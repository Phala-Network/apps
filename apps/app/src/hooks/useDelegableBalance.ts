import {useState, useEffect, useMemo} from 'react'
import {useCurrentAccount} from '@phala/store'
import {useBalance} from '@phala/react-hooks'
import {useApiPromise} from '@phala/react-libs'
import Decimal from 'decimal.js'

type Locks = {
  id: string
  amount: string | number
  reasons: string
}[]

const PHALA_SP = '0x7068616c612f7370'

export const useDelegableBalance = () => {
  const [locked, setLocked] = useState<Decimal>()
  const {api} = useApiPromise()
  const [polkadotAccount] = useCurrentAccount()
  const balance = useBalance(polkadotAccount?.address)
  useEffect(() => {
    let unsub: () => void
    api?.query.balances
      .locks(polkadotAccount?.address, (data) => {
        setLocked(
          (data.toJSON() as Locks)
            .filter(({id}) => id === PHALA_SP)
            .reduce((acc, cur) => {
              return acc.add(new Decimal(cur.amount))
            }, new Decimal(0))
        )
      })
      .then((_unsub) => (unsub = _unsub))
    return () => {
      unsub?.()
    }
  }, [api, polkadotAccount?.address])

  return useMemo(() => {
    if (balance && locked) {
      return new Decimal(balance?.toJSON()).sub(locked)
    }
    return null
  }, [balance, locked])
}
