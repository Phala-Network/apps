import styled from 'styled-components'
import {InputNumber} from '@phala/react-components'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {usePolkadotAccountAtom} from '@phala/app-store'
import Decimal from 'decimal.js'
import {useCallback, useState} from 'react'
import {useUserStakeInfo} from '@phala/react-hooks'
import useWaitSignAndSend from '../hooks/useWaitSignAndSend'
import ActionModal, {Label, Value} from './ActionModal'
import useFormat from '../hooks/useFormat'
import {useDelegableBalance} from '../hooks/useDelegableBalance'

const Extra = styled.div`
  margin-top: 10px;
  font-size: 12px;
`

const DelegateModal = (props: StakePoolModalProps): JSX.Element => {
  const [polkadotAccount] = usePolkadotAccountAtom()
  const delegableBalance = useDelegableBalance()
  const {onClose, stakePool} = props
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const [amount, setAmount] = useState<number | undefined>()
  const {refetch} = useUserStakeInfo(polkadotAccount?.address, stakePool.pid)
  const format = useFormat()

  const capGap =
    stakePool.cap === null
      ? '∞'
      : format(stakePool.cap.sub(stakePool.totalStake))

  const onConfirm = useCallback(async () => {
    if (api && decimals && amount) {
      return waitSignAndSend(
        api.tx.phalaStakePool?.contribute?.(
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
      <Extra>Delegable Balance: {format(delegableBalance)}</Extra>
      <Extra>Cap Gap: {capGap}</Extra>
    </ActionModal>
  )
}

export default DelegateModal
