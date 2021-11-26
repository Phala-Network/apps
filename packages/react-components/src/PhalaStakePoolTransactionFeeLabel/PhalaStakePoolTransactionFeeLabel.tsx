import {usePolkadotAccountAtom} from '@phala/app-store'
import {SubmittableExtrinsic} from '@polkadot/api/types'
import {FC, useState} from 'react'
import {FeeLabel} from '../FeeLabel'

interface PhalaStakePoolTransactionFeeLabelProps {
  action?: SubmittableExtrinsic<'promise', any>
}

export const PhalaStakePoolTransactionFeeLabel: FC<PhalaStakePoolTransactionFeeLabelProps> =
  (props) => {
    const [polkadotAccount] = usePolkadotAccountAtom()
    const {action} = props
    const [fee, setFee] = useState<string>('-')

    if (action && polkadotAccount) {
      action.paymentInfo(polkadotAccount.address).then(({partialFee}) => {
        setFee(partialFee.toHuman())
      })
    }

    return (
      <FeeLabel
        style={{
          justifyContent: 'flex-end',
        }}
        key="fee"
        label="Fee"
        fee={fee}
      />
    )
  }
