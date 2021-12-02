import {validateAddress} from '@phala/utils'
import Decimal from 'decimal.js'
import {useEffect, useState} from 'react'
import {useApiPromise} from './hooks/useApiPromise'

// DOC:
// https://polkadot.js.org/docs/api/cookbook/tx/

export function useTransactionFee(
  sender?: string,
  recipient?: string,
  amount?: number | string
): string {
  const {api} = useApiPromise()
  const [fee, setFee] = useState<string>('')

  useEffect(() => {
    let amountFormatted = 1

    if (typeof amount === 'string') {
      try {
        amountFormatted = parseFloat(amount)
      } catch (e) {
        amountFormatted = 1
      }
    } else if (typeof amount === 'number') {
      amountFormatted = amount
    }

    if (
      !api ||
      !sender ||
      !recipient ||
      !amountFormatted ||
      !validateAddress(recipient)
    ) {
      setFee('')
      return
    }

    api?.tx?.balances
      .transfer(recipient, amountFormatted)
      .paymentInfo(sender)
      .then(({partialFee}) => {
        setFee(
          new Decimal(partialFee.toString()).div(10 ** 12).toFixed(8) + ' PHA'
        )
      })
  }, [api, setFee, sender, recipient, amount])

  return fee
}
