import {useState, useEffect} from 'react'
import {useApiPromise} from '@phala/react-libs'
import Decimal from 'decimal.js'

export const useStakePoolDelegable = (pid: any) => {
  const [delegable, setDelegable] = useState<Decimal>()
  const {api} = useApiPromise()
  useEffect(() => {
    let unsub: () => void
    api?.query?.phalaStakePool
      ?.stakePools(pid, (dataRaw) => {
        const data = dataRaw.toJSON()
        if (!data.cap) {
          return setDelegable(null)
        }
        const withdrawals = (data.withdrawQueue || []).reduce(
          (acc, curr) => acc + Number(curr.shares),
          0
        )
        const remainingStake =
          data.cap / 1e12 - Number(data.totalStake) / 1e12 + withdrawals / 1e12
        setDelegable(new Decimal(remainingStake))
      })
      .then((_unsub) => (unsub = _unsub))
    return () => {
      unsub?.()
    }
  }, [api])

  return delegable
}
