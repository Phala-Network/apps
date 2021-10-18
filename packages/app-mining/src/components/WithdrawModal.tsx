import {Alert, InputNumber} from '@phala/react-components'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import Decimal from 'decimal.js'
import {useCallback, useState, useMemo} from 'react'
import type {StakePoolModalProps} from './StakePoolTable'
import useSelfUserStakeInfo from '../hooks/useSelfUserStakeInfo'
import useWaitSignAndSend from '../hooks/useWaitSignAndSend'
import ActionModal, {Label, Value} from './ActionModal'
import {usePolkadotAccountAtom} from '@phala/app-store'

const WithdrawModal = (props: StakePoolModalProps): JSX.Element => {
  const [polkadotAccount] = usePolkadotAccountAtom()
  const {onClose, stakePool} = props
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const [amount, setAmount] = useState<number | undefined>()
  const {refetch} = useSelfUserStakeInfo(stakePool.pid)

  const onConfirm = useCallback(async () => {
    if (api && decimals && amount) {
      return waitSignAndSend(
        api.tx.phalaStakePool?.withdraw?.(
          stakePool.pid,
          new Decimal(amount)
            .mul(stakePool.totalShares.div(stakePool.totalStake))
            .mul(decimals)
            .floor()
            .toString()
        )
      )
    }
  }, [api, waitSignAndSend, stakePool, amount, decimals])
  const onInputChange = useCallback((value) => {
    const number = parseFloat(value)
    if (typeof number === 'number') {
      setAmount(number)
    }
  }, [])
  const hasWithdrawing = useMemo<boolean>(
    () =>
      Boolean(
        stakePool.withdrawQueue.find((x) => x.user === polkadotAccount?.address)
      ),
    [stakePool, polkadotAccount]
  )

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
      <Alert>
        {hasWithdrawing
          ? 'You have a pending withdraw request! Only one withdraw request is kept. Resubmission will replace the existing one and reset the countdown.'
          : 'Only one withdraw request is kept. Resubmission will replace the existing one and reset the countdown.'}
      </Alert>
      <Label>pid</Label>
      <Value>{stakePool.pid}</Value>
      <Label>Delegation</Label>
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
