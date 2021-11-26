import {SubmittableExtrinsic} from '@polkadot/api/types'
import {useEffect, useState} from 'react'

export function usePhalaStakePoolTransactionFee(
  action?: SubmittableExtrinsic<'promise', any>,
  polkadotAccount?: string
) {
  const [fee, setFee] = useState<string>('-')

  useEffect(() => {
    if (action && polkadotAccount) {
      action.paymentInfo(polkadotAccount).then(({partialFee}) => {
        setFee(partialFee.toHuman())
      })
    }
  }, [action, polkadotAccount])

  return fee
}
