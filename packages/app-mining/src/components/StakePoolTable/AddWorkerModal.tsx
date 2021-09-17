import {Input} from '@phala/react-components'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {useCallback, useState} from 'react'
import {StakePoolModalProps} from '.'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import ActionModal, {Label, Value} from '../ActionModal'

const AddWorkerModal = (props: StakePoolModalProps): JSX.Element => {
  const {onClose, stakePool} = props
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const [pubkey, setPubkey] = useState<string>('')

  const onConfirm = useCallback(async () => {
    if (api && decimals && pubkey) {
      return waitSignAndSend(
        api.tx.phalaStakePool?.addWorker?.(stakePool.pid, pubkey)
      )
    }
  }, [api, waitSignAndSend, stakePool.pid, pubkey, decimals])
  const onInputChange = useCallback((value) => {
    setPubkey(value)
  }, [])

  return (
    <ActionModal
      onClose={onClose}
      onConfirm={onConfirm}
      title="Add Worker"
      disabled={!pubkey}
    >
      <Label>pid</Label>
      <Value>{stakePool.pid}</Value>
      <Label>Pubkey</Label>
      <Input
        placeholder="Public Key"
        value={pubkey}
        onChange={onInputChange}
      ></Input>
    </ActionModal>
  )
}

export default AddWorkerModal
