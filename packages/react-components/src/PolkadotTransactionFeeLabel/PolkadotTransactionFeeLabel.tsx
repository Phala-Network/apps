import {useTransactionFee} from '@phala/react-libs'
import {FC} from 'react'
import {FeeLabel} from '../FeeLabel'

interface PolkadotTransactionFeeLabelProps {
  sender?: string
  recipient?: string
  amount?: number | string
}

export const PolkadotTransactionFeeLabel: FC<PolkadotTransactionFeeLabelProps> =
  (props) => {
    const {sender, recipient, amount = 1} = props
    const fee = useTransactionFee(sender, recipient, amount)

    return (
      <FeeLabel
        style={{
          justifyContent: 'flex-end',
        }}
        key="fee"
        label="Fee"
        fee={fee || '-'}
      />
    )
  }
