import {usePolkadotAccountAtom} from '@phala/app-store'
import {Input, InputAction} from '@phala/react-components'
import {useTranslation} from '@phala/react-i18n'
import {useApiPromise} from '@phala/react-libs'
import {useCallback, useMemo, useState} from 'react'
import {StakePoolModalProps} from '.'
import useFormat from '../../hooks/useFormat'
import useSelfUserStakeInfo from '../../hooks/useSelfUserStakeInfo'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import ActionModal, {Label, Value} from '../ActionModal'

const ClaimModal = (props: StakePoolModalProps): JSX.Element => {
  const {onClose, stakePool} = props
  const [polkadotAccount] = usePolkadotAccountAtom()
  const {api} = useApiPromise()
  const format = useFormat()
  const waitSignAndSend = useWaitSignAndSend()
  const [address, setAddress] = useState<string>('')
  const {data: userStakeInfo} = useSelfUserStakeInfo(stakePool.pid)
  const {t} = useTranslation()

  const rewards = useMemo<string>(() => {
    if (!userStakeInfo) return '-'
    const {ownerReward, rewardAcc} = stakePool
    const {shares, availableRewards, rewardDebt} = userStakeInfo
    const pendingRewards = shares.mul(rewardAcc).sub(rewardDebt)

    return format(ownerReward.add(pendingRewards).add(availableRewards))
  }, [stakePool, userStakeInfo, format])

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
      title={t('mining.Claim')}
      subtitle={t(
        'mining.claim_all_the_pending_rewards_of_the_sender_and_send_to_the'
      )}
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
