import {PhalaStakePoolTransactionFeeLabel} from '@phala/react-components'
import {useApiPromise} from '@phala/react-libs'
import {useCallback, useMemo} from 'react'
import {WorkerModalProps} from '.'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import ActionModal, {Label, Value} from '../ActionModal'

const StopModal = (props: WorkerModalProps): JSX.Element => {
  const {worker, onClose} = props
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()

  const action = useMemo(() => {
    if (api) {
      return api.tx.phalaStakePool?.stopMining?.(worker.pid, worker.pubkey)
    } else {
      return
    }
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
      title="Stop Mining"
      subtitle="Stop a miner on behalf of the stake pool"
      actionsExtra={<PhalaStakePoolTransactionFeeLabel action={action} />}>
      <Label>pid</Label>
      <Value>{worker.pid}</Value>
      <Label>WorkerPublicKey</Label>
      <Value>{worker.pubkey}</Value>
    </ActionModal>
  )
}

export default StopModal
