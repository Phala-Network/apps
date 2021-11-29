import {PhalaStakePoolTransactionFeeLabel} from '@phala/react-components'
import {useApiPromise} from '@phala/react-libs'
import {useCallback, useMemo} from 'react'
import {WorkerModalProps} from '.'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import ActionModal, {Label, Value} from '../ActionModal'

const RemoveModal = (props: WorkerModalProps): JSX.Element => {
  const {worker, onClose} = props
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()

  const action = useMemo(() => {
    if (!api) return

    return api.tx.phalaStakePool?.removeWorker?.(worker.pid, worker.pubkey)
  }, [api, worker.pid, worker.pubkey])

  const onConfirm = useCallback(async () => {
    if (action) {
      return waitSignAndSend(action)
    }
  }, [action, waitSignAndSend])

  return (
    <ActionModal
      onClose={onClose}
      onConfirm={onConfirm}
      title="Remove Worker"
      subtitle="Remove a worker from a pool"
      actionsExtra={<PhalaStakePoolTransactionFeeLabel action={action} />}>
      <Label>pid</Label>
      <Value>{worker.pid}</Value>
      <Label>WorkerPublicKey</Label>
      <Value>{worker.pubkey}</Value>
    </ActionModal>
  )
}

export default RemoveModal
