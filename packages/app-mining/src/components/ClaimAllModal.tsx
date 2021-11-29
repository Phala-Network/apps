import {usePolkadotAccountAtom} from '@phala/app-store'
import {
  Alert,
  Input,
  InputAction,
  PhalaStakePoolTransactionFeeLabel,
} from '@phala/react-components'
import {useApiPromise} from '@phala/react-libs'
import Decimal from 'decimal.js'
import {useCallback, useMemo, useState} from 'react'
import useFormat from '../hooks/useFormat'
import useWaitSignAndSend from '../hooks/useWaitSignAndSend'
import ActionModal, {Label, Value} from './ActionModal'
import type {TableItem} from './Delegate/MyDelegateTable'

const ClaimAllModal = (props: {
  onClose: () => void
  stakePools: TableItem[]
}): JSX.Element => {
  const {onClose, stakePools} = props
  const {api} = useApiPromise()
  const format = useFormat()
  const waitSignAndSend = useWaitSignAndSend()
  const [polkadotAccount] = usePolkadotAccountAtom()
  const [address, setAddress] = useState<string>('')

  const rewards = useMemo<string>(
    () =>
      format(
        stakePools.reduce(
          (acc, {claimableRewards}) =>
            acc.add(claimableRewards || new Decimal(0)),
          new Decimal(0)
        )
      ),
    [stakePools, format]
  )

  const claimablePools = useMemo<TableItem[]>(() => {
    return stakePools.filter(
      ({claimableRewards}) => claimableRewards?.greaterThan(10 ** 10) // 0.01 PHA
    )
  }, [stakePools])

  const batchAll = useMemo(() => {
    if (api && address) {
      return api.tx.utility.batchAll?.(
        claimablePools.map(
          ({pid}) => api.tx.phalaStakePool?.claimRewards?.(pid, address) as any
        )
      )
    } else {
      return
    }
  }, [address, api, claimablePools])

  const onConfirm = useCallback(async () => {
    if (batchAll) {
      return waitSignAndSend(batchAll)
    }
  }, [batchAll, waitSignAndSend])

  const onInputChange = useCallback((value) => {
    setAddress(value)
  }, [])

  return (
    <ActionModal
      onClose={onClose}
      onConfirm={onConfirm}
      title="Claim All"
      subtitle="Claim all the pending rewards of the sender and send to the target"
      disabled={!address || !claimablePools.length}
      actionsExtra={<PhalaStakePoolTransactionFeeLabel action={batchAll} />}>
      <Label>Rewards</Label>
      <Value>{rewards}</Value>
      <Label>Target Address</Label>
      <Input
        value={address}
        onChange={onInputChange}
        after={
          <InputAction
            onClick={() => setAddress(polkadotAccount?.address || '')}>
            MY ADDRESS
          </InputAction>
        }></Input>

      <Alert style={{marginTop: 20}}>
        Only claim rewards greater than 0.01 PHA.
      </Alert>
    </ActionModal>
  )
}

export default ClaimAllModal
