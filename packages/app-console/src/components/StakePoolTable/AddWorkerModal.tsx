import {useCallback, useState} from 'react'
import {useApiPromise} from '@phala/react-libs/esm/polkadot/hooks/useApiPromise'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import ActionModal, {Value, Label} from '../ActionModal'
import {useDecimalJsTokenDecimalMultiplier} from '@phala/react-libs/esm/polkadot/useTokenDecimals'
import {Input} from '@phala/react-components'
import {StakePoolModalProps} from '.'

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
