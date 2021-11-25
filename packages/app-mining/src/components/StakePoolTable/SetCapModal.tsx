import {InputNumber} from '@phala/react-components'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import Decimal from 'decimal.js'
import {useCallback, useState} from 'react'
import type {StakePoolModalProps} from '.'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import ActionModal, {Label, Value} from '../ActionModal'

const SetCapModal = (props: StakePoolModalProps): JSX.Element => {
  const {onClose, stakePool} = props
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const [cap, setCap] = useState<number | undefined>()

  const onConfirm = useCallback(async () => {
    if (api && decimals && cap) {
      return waitSignAndSend(
        api.tx.phalaStakePool?.setCap?.(
          stakePool.pid,
          new Decimal(cap).mul(decimals).toString()
        )
      )
    }
  }, [api, waitSignAndSend, stakePool.pid, cap, decimals])
  const onInputChange = useCallback((value) => {
    const number = parseFloat(value)
    if (typeof number === 'number') {
      setCap(number)
    }
  }, [])

  return (
    <ActionModal
      onClose={onClose}
      onConfirm={onConfirm}
      title="Set Cap"
      disabled={!cap}>
      <Label>pid</Label>
      <Value>{stakePool.pid}</Value>
      <Label>Cap</Label>
      <InputNumber
        type="number"
        placeholder="Cap"
        value={cap}
        onChange={onInputChange}
        after="PHA"></InputNumber>
    </ActionModal>
  )
}

export default SetCapModal
