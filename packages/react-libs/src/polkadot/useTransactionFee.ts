import {useEffect, useState} from 'react'
import {useApiPromise} from './hooks/useApiPromise'

// DOC:
// https://polkadot.js.org/docs/api/cookbook/tx/

export async function useTransactionFee(
  sender: string,
  recipient: string,
  amount: string
) {
  const {api} = useApiPromise()
  const [fee, setFee] = useState<string>()

  useEffect(() => {
    api?.tx?.balances
      .transfer(recipient, amount)
      .paymentInfo(sender)
      .then(({partialFee}) => {
        setFee(`${partialFee.toHuman()} `)
      })
  }, [api, setFee, sender, recipient, amount])

  return fee
}
