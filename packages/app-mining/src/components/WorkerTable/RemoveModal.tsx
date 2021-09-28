import {useTranslation} from '@phala/react-i18n'
import {useApiPromise} from '@phala/react-libs'
import {useCallback} from 'react'
import {WorkerModalProps} from '.'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import ActionModal, {Label, Value} from '../ActionModal'

const RemoveModal = (props: WorkerModalProps): JSX.Element => {
  const {worker, onClose} = props
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const {t} = useTranslation()

  const onConfirm = useCallback(async () => {
    if (api) {
      return waitSignAndSend(
        api.tx.phalaStakePool?.removeWorker?.(worker.pid, worker.pubkey)
      )
    }
  }, [api, waitSignAndSend, worker.pid, worker.pubkey])

  return (
    <ActionModal
      onClose={onClose}
      onConfirm={onConfirm}
      title="Remove Worker"
      subtitle="Remove a worker from a pool"
    >
      <Label>pid</Label>
      <Value>{worker.pid}</Value>
      <Label>{t('mining.WorkerPublicKey')}</Label>
      <Value>{worker.pubkey}</Value>
    </ActionModal>
  )
}

export default RemoveModal
