import {useCallback, useState} from 'react'
import {useApiPromise} from '@phala/react-libs/esm/polkadot/hooks/useApiPromise'
import {InputNumber} from '@phala/react-components'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import ActionModal, {Value, Label} from '../ActionModal'
import Decimal from 'decimal.js'
import {useDecimalJsTokenDecimalMultiplier} from '@phala/react-libs/esm/polkadot/useTokenDecimals'
import {StakePoolModalProps} from '.'

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
      disabled={!cap}
    >
      <Label>pid</Label>
      <Value>{stakePool.pid}</Value>
      <Label>Cap</Label>
      <InputNumber
        type="number"
        placeholder="Cap"
        value={cap}
        onChange={onInputChange}
        after="PHA"
      ></InputNumber>
    </ActionModal>
  )
}

export default SetCapModal
