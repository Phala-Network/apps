import {SubmittableExtrinsic} from '@polkadot/api/types'
import {Decimal} from 'decimal.js'
import {useEffect, useState} from 'react'

export function usePhalaStakePoolTransactionFee(
  action?: SubmittableExtrinsic<'promise', any>,
  polkadotAccount?: string
) {
  const [fee, setFee] = useState<string>('-')

  useEffect(() => {
    if (action && polkadotAccount) {
      action.paymentInfo(polkadotAccount).then(({partialFee}) => {
        setFee(
          new Decimal(partialFee.toString())
            .div(10 ** 12)
            .toFixed(8)
            .replace(/\.?0+$/, '') + // Remove Trailing Zeros
            ' PHA'
        )
      })
    }
  }, [action, polkadotAccount])

  return fee
}
