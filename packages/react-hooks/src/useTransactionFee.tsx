import {SubmittableExtrinsic} from '@polkadot/api/types'
import {Decimal} from 'decimal.js'
import {useEffect, useState} from 'react'

export function useTransactionFee(
  action?: SubmittableExtrinsic<'promise'>,
  polkadotAccount?: string
) {
  const [fee, setFee] = useState<Decimal>()

  useEffect(() => {
    let unmounted = false
    if (action && polkadotAccount) {
      action.paymentInfo(polkadotAccount).then(({partialFee}) => {
        if (!unmounted) {
          setFee(new Decimal(partialFee.toString()).div(1e12))
        }
      })
    }
    return () => {
      unmounted = true
    }
  }, [action, polkadotAccount])

  return fee
}
