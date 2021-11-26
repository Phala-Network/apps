import {usePolkadotAccountAtom} from '@phala/app-store'
import {usePhalaStakePoolTransactionFee} from '@phala/react-libs'
import {SubmittableExtrinsic} from '@polkadot/api/types'
import {FC} from 'react'
import {FeeLabel} from '../FeeLabel'

interface PhalaStakePoolTransactionFeeLabelProps {
  action?: SubmittableExtrinsic<'promise', any>
}

export const PhalaStakePoolTransactionFeeLabel: FC<PhalaStakePoolTransactionFeeLabelProps> =
  (props) => {
    const [polkadotAccount] = usePolkadotAccountAtom()
    const {action} = props
    const fee = usePhalaStakePoolTransactionFee(action, polkadotAccount.address)

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
