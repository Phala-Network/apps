import {PhalaStakePoolTransactionFeeLabel} from '@phala/react-components'
import {useApiPromise} from '@phala/react-libs'
import {useCallback, useMemo} from 'react'
import {WorkerModalProps} from '.'
import useFormat from '../../hooks/useFormat'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import ActionModal, {Label, Value} from '../ActionModal'

const ReclaimModal = (props: WorkerModalProps): JSX.Element => {
  const {worker, onClose} = props
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const format = useFormat()

  const action = useMemo(() => {
    if (!api) return

    return api.tx.phalaStakePool?.reclaimPoolWorker?.(worker.pid, worker.pubkey)
  }, [api, worker.pid, worker.pubkey])

  const onConfirm = useCallback(async () => {
    if (action) return waitSignAndSend(action)
  }, [action, waitSignAndSend])

  return (
    <ActionModal
      onClose={onClose}
      onConfirm={onConfirm}
      title="Reclaim Worker"
      subtitle="Reclaims the releasing stake of miners in a pool"
      actionsExtra={<PhalaStakePoolTransactionFeeLabel action={action} />}>
      <Label>pid</Label>
      <Value>{worker.pid}</Value>
      <Label>Worker PublicKey</Label>
      <Value>{worker.pubkey}</Value>
      <Label>Reclaimable Stake</Label>
      <Value>{format(worker.stake)}</Value>
    </ActionModal>
  )
}

export default ReclaimModal
