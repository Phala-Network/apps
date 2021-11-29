import {usePolkadotAccountAtom} from '@phala/app-store'
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
    const [polkadotAccount] = usePolkadotAccountAtom()
    const {
      sender = polkadotAccount?.address ||
        '44qokWaaP4L2QqzMQ8UQtUFpRdRWwmVMbUTCpq6dNzSHXqLD',
      recipient = '42ew9osX4adpNiX4icz7UUfuQhJMeUsMDWTtJQiGGAxMFfRN',
      amount = 1,
    } = props
    const fee = useTransactionFee(sender, recipient, amount)

    return <FeeLabel key="fee" label="Fee" fee={fee || '-'} />
  }
