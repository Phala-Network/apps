import {Input, PhalaStakePoolTransactionFeeLabel} from '@phala/react-components'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {useCallback, useMemo, useState} from 'react'
import type {StakePoolModalProps} from '.'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import ActionModal, {Label, Value} from '../ActionModal'

const AddWorkerModal = (props: StakePoolModalProps): JSX.Element => {
  const {onClose, stakePool} = props
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const [pubkey, setPubkey] = useState<string>('')

  const action = useMemo(() => {
    if (!api || !pubkey || !decimals) return

    return api.tx.phalaStakePool?.addWorker?.(stakePool.pid, pubkey)
  }, [api, stakePool, pubkey, decimals])

  const onConfirm = useCallback(async () => {
    if (action) {
      return waitSignAndSend(action)
    }
  }, [waitSignAndSend, action])

  const onInputChange = useCallback((value) => {
    setPubkey(value)
  }, [])

  return (
    <ActionModal
      onClose={onClose}
      onConfirm={onConfirm}
      title="Add Worker"
      disabled={!pubkey}
      actionsExtra={<PhalaStakePoolTransactionFeeLabel action={action} />}>
      <Label>pid</Label>
      <Value>{stakePool.pid}</Value>

      <Label>Pubkey</Label>
      <Input
        placeholder="Public Key"
        value={pubkey}
        onChange={onInputChange}></Input>
    </ActionModal>
  )
}

export default AddWorkerModal
