import {Input} from '@phala/react-components'
import {useApiPromise} from '@phala/react-libs'
import {useCallback, useMemo, useState} from 'react'
import {StakePoolModalProps} from '.'
import useFormat from '../../hooks/useFormat'
import usePoolStakerInfo from '../../hooks/usePoolStakerInfo'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import ActionModal, {Label, Value} from '../ActionModal'

const ClaimModal = (props: StakePoolModalProps): JSX.Element => {
  const {onClose, stakePool} = props
  const {api} = useApiPromise()
  const format = useFormat()
  const waitSignAndSend = useWaitSignAndSend()
  const [address, setAddress] = useState<string>('')
  const {data: poolStakerInfo} = usePoolStakerInfo(stakePool.pid)

  const rewards = useMemo<string>(() => {
    if (!poolStakerInfo) return '-'
    const {ownerReward, rewardAcc} = stakePool
    const {shares, availableRewards, rewardDebt} = poolStakerInfo
    const pendingRewards = shares.mul(rewardAcc).sub(rewardDebt)

    return format(ownerReward.add(pendingRewards).add(availableRewards))
  }, [stakePool, poolStakerInfo, format])

  const onConfirm = useCallback(async () => {
    if (api && address) {
      return waitSignAndSend(
        api.tx.phalaStakePool?.claimRewards?.(stakePool.pid, address)
      )
    }
  }, [api, waitSignAndSend, stakePool.pid, address])
  const onInputChange = useCallback((value) => {
    setAddress(value)
  }, [])

  return (
    <ActionModal
      onClose={onClose}
      onConfirm={onConfirm}
      title="Claim"
      subtitle="Claim all the pending rewards of the sender and send to the `target`"
      disabled={!address}
    >
      <Label>pid</Label>
      <Value>{stakePool.pid}</Value>
      <Label>Rewards</Label>
      <Value>{rewards}</Value>
      <Label>Target Address</Label>
      <Input value={address} onChange={onInputChange}></Input>
    </ActionModal>
  )
}

export default ClaimModal
