import {
  InputNumber,
  PhalaStakePoolTransactionFeeLabel,
} from '@phala/react-components'
import {useApiPromise} from '@phala/react-libs'
import Decimal from 'decimal.js'
import {useCallback, useMemo, useState} from 'react'
import type {StakePoolModalProps} from '.'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import ActionModal, {Label, Value} from '../ActionModal'

const SetPayoutPrefModal = (props: StakePoolModalProps): JSX.Element => {
  const {onClose, stakePool} = props
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const [payoutPref, setPayoutPref] = useState<number | undefined>()

  const action = useMemo(() => {
    if (!api || !payoutPref) return

    return api.tx.phalaStakePool?.setPayoutPref?.(
      stakePool.pid,
      new Decimal(payoutPref).mul(10 ** 4).toString()
    )
  }, [api, stakePool, payoutPref])

  const onConfirm = useCallback(async () => {
    if (action) {
      return waitSignAndSend(action)
    }
  }, [action, waitSignAndSend])

  const onInputChange = useCallback((value) => {
    const number = parseFloat(value)
    if (typeof number === 'number') {
      setPayoutPref(number)
    }
  }, [])

  return (
    <ActionModal
      onClose={onClose}
      onConfirm={onConfirm}
      title="Set Commission"
      disabled={!payoutPref}
      actionsExtra={<PhalaStakePoolTransactionFeeLabel action={action} />}>
      <Label>pid</Label>
      <Value>{stakePool.pid}</Value>

      <Label>PayoutPref</Label>
      <InputNumber
        min={0}
        max={100}
        type="number"
        placeholder="0-100"
        value={payoutPref}
        onChange={onInputChange}
        after="%"></InputNumber>
    </ActionModal>
  )
}

export default SetPayoutPrefModal
