import {usePolkadotAccountAtom} from '@phala/app-store'
import {useApiPromise, usePhalaStakePoolTransactionFee} from '@phala/react-libs'
import {useCallback, useMemo} from 'react'
import {WorkerModalProps} from '.'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import ActionModal, {Label, Value} from '../ActionModal'

const RemoveModal = (props: WorkerModalProps): JSX.Element => {
  const {worker, onClose} = props
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const [polkadotAccount] = usePolkadotAccountAtom()

  const action = useMemo(() => {
    if (!api) return

    return api.tx.phalaStakePool?.removeWorker?.(worker.pid, worker.pubkey)
  }, [api, worker.pid, worker.pubkey])

  const fee = usePhalaStakePoolTransactionFee(action, polkadotAccount.address)

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
      subtitle="Remove a worker from a pool">
      <Label>pid</Label>
      <Value>{worker.pid}</Value>
      <Label>WorkerPublicKey</Label>
      <Value>{worker.pubkey}</Value>
      <Label>fee</Label>
      <Value>{fee}</Value>
    </ActionModal>
  )
}

export default RemoveModal
