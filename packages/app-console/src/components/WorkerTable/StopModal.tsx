import {useCallback} from 'react'
import {WorkerModalProps} from '.'
import {useApiPromise} from '@phala/react-libs/esm/polkadot/hooks/useApiPromise'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import ActionModal, {Value, Label} from '../ActionModal'

const StopModal = (props: WorkerModalProps): JSX.Element => {
  const {worker, onClose} = props
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()

  const onConfirm = useCallback(async () => {
    if (api) {
      api.tx.phalaStakePool?.stopMining?.()
      return waitSignAndSend(
        api.tx.phalaStakePool?.stopMining?.(worker.pid, worker.pubkey)
      )
    }
  }, [api, waitSignAndSend, worker.pid, worker.pubkey])

  return (
    <ActionModal
      onClose={onClose}
      onConfirm={onConfirm}
      title="Stop Mining"
      subtitle="Stop a miner on behalf of the stake pool"
    >
      <Label>pid</Label>
      <Value>{worker.pid}</Value>
      <Label>WorkerPublicKey</Label>
      <Value>{worker.pubkey}</Value>
    </ActionModal>
  )
}

export default StopModal
