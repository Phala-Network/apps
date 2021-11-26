import {
  InputNumber,
  PhalaStakePoolTransactionFeeLabel,
} from '@phala/react-components'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import Decimal from 'decimal.js'
import {useCallback, useMemo, useState} from 'react'
import styled from 'styled-components'
import {useDelegableBalance} from '../hooks/useDelegableBalance'
import useFormat from '../hooks/useFormat'
import useSelfUserStakeInfo from '../hooks/useSelfUserStakeInfo'
import useWaitSignAndSend from '../hooks/useWaitSignAndSend'
import ActionModal, {Label, Value} from './ActionModal'
import type {StakePoolModalProps} from './StakePoolTable'

const Extra = styled.div`
  margin-top: 10px;
  font-size: 12px;
`

const DelegateModal = (props: StakePoolModalProps): JSX.Element => {
  const {onClose, stakePool} = props
  const delegableBalance = useDelegableBalance()
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const [amount, setAmount] = useState<number | undefined>()
  const {refetch} = useSelfUserStakeInfo(stakePool.pid)
  const format = useFormat()

  const remaining =
    stakePool.cap === null
      ? '∞'
      : format(stakePool.cap.sub(stakePool.totalStake))

  const phalaStakePoolTransaction = useMemo(() => {
    if (api && decimals && amount) {
      return api.tx.phalaStakePool?.contribute?.(
        stakePool.pid,
        new Decimal(amount).mul(decimals).toString()
      )
    } else {
      return
    }
  }, [api, stakePool.pid, amount, decimals])

  const onConfirm = useCallback(async () => {
    phalaStakePoolTransaction && waitSignAndSend(phalaStakePoolTransaction)
  }, [phalaStakePoolTransaction, waitSignAndSend])

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
      title="Delegate"
      subtitle="Delegate some stake to a pool"
      disabled={!amount}>
      <Label>pid</Label>
      <Value>{stakePool.pid}</Value>
      <Label>Amount</Label>
      <InputNumber
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={onInputChange}
        after="PHA"></InputNumber>
      <PhalaStakePoolTransactionFeeLabel action={phalaStakePoolTransaction} />
      <Extra>Delegable Balance: {format(delegableBalance)}</Extra>
      <Extra>Pool Remaining: {remaining}</Extra>
    </ActionModal>
  )
}

export default DelegateModal
