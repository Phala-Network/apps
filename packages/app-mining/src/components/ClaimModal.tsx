import {useCurrentAccount} from '@phala/app-store'
import {
  Input,
  InputAction,
  PhalaStakePoolTransactionFeeLabel,
} from '@phala/react-components'
import {useApiPromise} from '@phala/react-libs'
import Decimal from 'decimal.js'
import {useCallback, useMemo, useState} from 'react'
import useFormat from '../hooks/useFormat'
import useSelfUserStakeInfo from '../hooks/useSelfUserStakeInfo'
import useWaitSignAndSend from '../hooks/useWaitSignAndSend'
import ActionModal, {Label, Value} from './ActionModal'
import type {StakePoolModalProps} from './StakePoolTable'

const ClaimModal = (props: StakePoolModalProps): JSX.Element => {
  const {onClose, stakePool} = props
  const [polkadotAccount] = useCurrentAccount()
  const {api} = useApiPromise()
  const format = useFormat()
  const waitSignAndSend = useWaitSignAndSend()
  const [address, setAddress] = useState<string>('')
  const {data: userStakeInfo} = useSelfUserStakeInfo(stakePool.pid)

  const rewards = useMemo<string>(() => {
    if (!userStakeInfo) return '-'
    const {ownerReward, rewardAcc, owner} = stakePool
    const {shares, availableRewards, rewardDebt} = userStakeInfo
    const pendingRewards = shares.mul(rewardAcc).sub(rewardDebt)

    return format(
      (owner === polkadotAccount?.address ? ownerReward : new Decimal(0))
        .add(pendingRewards)
        .add(availableRewards)
    )
  }, [stakePool, userStakeInfo, format, polkadotAccount])

  const action = useMemo(() => {
    if (api && address) {
      return api.tx.phalaStakePool?.claimRewards?.(stakePool.pid, address)
    } else {
      return
    }
  }, [api, address, stakePool])

  const onConfirm = useCallback(async () => {
    if (action) {
      return waitSignAndSend(action)
    }
  }, [action, waitSignAndSend])

  const onInputChange = useCallback((value) => {
    setAddress(value)
  }, [])

  return (
    <ActionModal
      onClose={onClose}
      onConfirm={onConfirm}
      title="Claim"
      subtitle="Claim all the pending rewards of the sender and send to the `target`"
      actionsExtra={<PhalaStakePoolTransactionFeeLabel action={action} />}
      disabled={!address}
    >
      <Label>pid</Label>
      <Value>{stakePool.pid}</Value>
      <Label>Rewards</Label>
      <Value>{rewards}</Value>
      <Label>Target Address</Label>
      <Input
        value={address}
        onChange={onInputChange}
        after={
          <InputAction
            onClick={() => setAddress(polkadotAccount?.address || '')}
          >
            MY ADDRESS
          </InputAction>
        }
      ></Input>
    </ActionModal>
  )
}

export default ClaimModal
