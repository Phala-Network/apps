import {usePolkadotAccountAtom} from '@phala/app-store'
import {useApiPromise, usePhalaStakePoolTransactionFee} from '@phala/react-libs'
import {useCallback, useMemo} from 'react'
import {WorkerModalProps} from '.'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import ActionModal, {Label, Value} from '../ActionModal'

const StopModal = (props: WorkerModalProps): JSX.Element => {
  const {worker, onClose} = props
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const [polkadotAccount] = usePolkadotAccountAtom()

  const action = useMemo(() => {
    if (api) {
      return api.tx.phalaStakePool?.stopMining?.(worker.pid, worker.pubkey)
    } else {
      return
    }
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
      title="Stop Mining"
      subtitle="Stop a miner on behalf of the stake pool">
      <Label>pid</Label>
      <Value>{worker.pid}</Value>
      <Label>WorkerPublicKey</Label>
      <Value>{worker.pubkey}</Value>
      <Label>Fee</Label>
      <Value>{fee}</Value>
    </ActionModal>
  )
}

export default StopModal
