import {useEffect, useState} from 'react'
import {useApiPromise} from './hooks/useApiPromise'

// DOC:
// https://polkadot.js.org/docs/api/cookbook/tx/

export function useTransactionFee(
  sender?: string,
  recipient?: string,
  amount?: number
): string {
  const {api} = useApiPromise()
  const [fee, setFee] = useState<string>('')

  useEffect(() => {
    if (!api || !sender || !recipient || !amount) {
      setFee('')
      return
    }

    api?.tx?.balances
      .transfer(recipient, amount)
      .paymentInfo(sender)
      .then(({partialFee}) => {
        setFee(`${partialFee.toHuman()} `)
      })
  }, [api, setFee, sender, recipient, amount])

  return fee
}
