import {useCurrentAccount} from '@phala/store'
import {usePhalaStakePoolTransactionFee} from '@phala/react-libs'
import {SubmittableExtrinsic} from '@polkadot/api/types'
import {FC} from 'react'
import {FeeLabel} from '../FeeLabel'

interface PhalaStakePoolTransactionFeeLabelProps {
  action?: SubmittableExtrinsic<'promise', any>
}

const Component: FC<PhalaStakePoolTransactionFeeLabelProps> = (props) => {
  const [polkadotAccount] = useCurrentAccount()
  const {action} = props
  const fee = usePhalaStakePoolTransactionFee(action, polkadotAccount?.address)

  return <FeeLabel key="fee" label="Fee" fee={fee} />
}

export const PhalaStakePoolTransactionFeeLabel = Component
