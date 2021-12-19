import {usePolkadotAccountAtom} from '@phala/app-store'
import {
  Alert,
  InputNumber,
  InputAction,
  PhalaStakePoolTransactionFeeLabel,
} from '@phala/react-components'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import Decimal from 'decimal.js'
import {useCallback, useMemo, useState} from 'react'
import useSelfUserStakeInfo from '../hooks/useSelfUserStakeInfo'
import useWaitSignAndSend from '../hooks/useWaitSignAndSend'
import useFormat from '../hooks/useFormat'
import ActionModal, {Label, Value} from './ActionModal'
import type {StakePoolModalProps} from './StakePoolTable'

const WithdrawModal = (props: StakePoolModalProps): JSX.Element => {
  const [polkadotAccount] = usePolkadotAccountAtom()
  const {onClose, stakePool} = props
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const [amount, setAmount] = useState<number | undefined>()
  const {data: userStakeInfo, refetch} = useSelfUserStakeInfo(stakePool.pid)
  const format = useFormat()

  const action = useMemo(() => {
    if (!api || !amount || !decimals) return

    return api.tx.phalaStakePool?.withdraw?.(
      stakePool.pid,
      new Decimal(amount)
        .mul(stakePool.totalShares.div(stakePool.totalStake))
        .mul(decimals)
        .floor()
        .toString()
    )
  }, [
    api,
    amount,
    decimals,
    stakePool.pid,
    stakePool.totalShares,
    stakePool.totalStake,
  ])

  const onConfirm = useCallback(async () => {
    if (action) {
      return waitSignAndSend(action)
    }
  }, [action, waitSignAndSend])

  const onInputChange = useCallback((value) => {
    const number = parseFloat(value)
    if (typeof number === 'number') {
      setAmount(number)
    }
  }, [])

  const setMax = () => {
    if (!userStakeInfo) return
    const yourDelegation = format(
      userStakeInfo.shares.mul(stakePool.totalStake.div(stakePool.totalShares)),
      {unit: null}
    )
    setAmount(Number(yourDelegation))
  }

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
      actionsExtra={<PhalaStakePoolTransactionFeeLabel action={action} />}>
      <Label>pid</Label>
      <Value>{stakePool.pid}</Value>
      <Label>Delegation</Label>
      <InputNumber
        type="number"
        placeholder="Amount (PHA)"
        value={amount}
        onChange={onInputChange}
        after={<InputAction onClick={setMax}>MAX</InputAction>}></InputNumber>
      <Alert style={{marginTop: '10px'}}>
        {hasWithdrawing
          ? 'You have a pending withdraw request! Only one withdraw request is kept. Resubmission will replace the existing one and reset the countdown.'
          : 'Only one withdraw request is kept. Resubmission will replace the existing one and reset the countdown.'}
      </Alert>
    </ActionModal>
  )
}

export default WithdrawModal
