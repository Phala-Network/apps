import {useCallback, useState} from 'react'
import {useApiPromise} from '@phala/react-libs/esm/polkadot/hooks/useApiPromise'
import {InputNumber} from '@phala/react-components'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import ActionModal, {Value, Label} from '../ActionModal'
import Decimal from 'decimal.js'
import {useDecimalJsTokenDecimalMultiplier} from '@phala/react-libs/esm/polkadot/useTokenDecimals'
import {StakePoolModalProps} from '.'
import usePoolStakerInfo from '../../hooks/usePoolStakerInfo'

const WithdrawModal = (props: StakePoolModalProps): JSX.Element => {
  const {onClose, stakePool} = props
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const [amount, setAmount] = useState<number | undefined>()
  const {refetch} = usePoolStakerInfo(stakePool.pid)

  const onConfirm = useCallback(async () => {
    if (api && decimals && amount) {
      return waitSignAndSend(
        api.tx.phalaStakePool?.withdraw?.(
          stakePool.pid,
          new Decimal(amount).mul(decimals).toString()
        )
      )
    }
  }, [api, waitSignAndSend, stakePool.pid, amount, decimals])
  const onInputChange = useCallback((value) => {
    const number = parseFloat(value)
    if (typeof number === 'number') {
      setAmount(number)
    }
  }, [])

  return (
    <ActionModal
      onClose={() => {
        refetch()
        onClose()
      }}
      onConfirm={onConfirm}
      title="Withdraw"
      disabled={!amount}
    >
      <Label>pid</Label>
      <Value>{stakePool.pid}</Value>
      <Label>Shares</Label>
      <InputNumber
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={onInputChange}
        after="PHA"
      ></InputNumber>
    </ActionModal>
  )
}

export default WithdrawModal
