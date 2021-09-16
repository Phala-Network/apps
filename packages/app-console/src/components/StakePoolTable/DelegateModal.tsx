import styled from 'styled-components'
import {usePolkadotAccountAtom} from '@phala/app-store'
import {InputNumber} from '@phala/react-components'
import {useAllBalances} from '@phala/react-hooks'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import Decimal from 'decimal.js'
import {useCallback, useState} from 'react'
import {StakePoolModalProps} from '.'
import useSelfUserStakeInfo from '../../hooks/useSelfUserStakeInfo'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import ActionModal, {Label, Value} from '../ActionModal'
import useFormat from '../../hooks/useFormat'

const Extra = styled.div`
  margin-top: 10px;
  font-size: 12px;
`

const DelegateModal = (props: StakePoolModalProps): JSX.Element => {
  const {onClose, stakePool} = props
  const [polkadotAccount] = usePolkadotAccountAtom()
  const allBalances = useAllBalances(polkadotAccount?.address)
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const [amount, setAmount] = useState<number | undefined>()
  const {refetch} = useSelfUserStakeInfo(stakePool.pid)
  const format = useFormat()
  const availableBalance = format(
    allBalances?.availableBalance
      ? new Decimal(allBalances.availableBalance.toJSON())
      : null
  )
  const capGap =
    stakePool.cap === null
      ? '∞'
      : format(stakePool.cap.sub(stakePool.totalStake))

  const onConfirm = useCallback(async () => {
    if (api && decimals && amount) {
      return waitSignAndSend(
        api.tx.phalaStakePool?.delegate?.(
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
      title="Delegate"
      subtitle="Delegate some stake to a pool"
      disabled={!amount}
    >
      <Label>pid</Label>
      <Value>{stakePool.pid}</Value>
      <Label>Amount</Label>
      <InputNumber
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={onInputChange}
        after="PHA"
      ></InputNumber>
      <Extra>Transferrable: {availableBalance}</Extra>
      <Extra>Cap Gap: {capGap}</Extra>
    </ActionModal>
  )
}

export default DelegateModal
