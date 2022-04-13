import {useState, FC} from 'react'
import {Input} from 'baseui/input'
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ModalProps,
} from 'baseui/modal'
import {ParagraphSmall} from 'baseui/typography'
import {FormControl} from 'baseui/form-control'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {StakePool} from '.'

const AddWorkerModalBody: FC<
  {stakePool: Pick<StakePool, 'pid'>} & Pick<ModalProps, 'onClose'>
> = ({stakePool, onClose}) => {
  const {pid} = stakePool
  const {api} = useApiPromise()
  const [pubkey, setPubkey] = useState('')
  const [error, setError] = useState<string | null>(null)
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const onConfirm = () => {
    if (api && decimals) {
      waitSignAndSend(
        api.tx.phalaStakePool?.addWorker?.(pid, pubkey),
        (status) => {
          if (status.isReady) {
            onClose?.({closeSource: 'closeButton'})
          }
        }
      )
    }
  }

  return (
    <>
      <ModalHeader>Add Worker</ModalHeader>
      <ModalBody>
        <FormControl label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormControl>
        <FormControl label="Worker Public Key" error={error}>
          <Input
            size="compact"
            autoFocus
            placeholder="0x"
            onChange={(e) => {
              const value = e.currentTarget.value
              if (!value.startsWith('0x')) {
                setError('Should start with 0x')
              } else {
                setError(null)
              }
              setPubkey(value)
            }}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton disabled={!pubkey || Boolean(error)} onClick={onConfirm}>
          Confirm
        </ModalButton>
      </ModalFooter>
    </>
  )
}

export default AddWorkerModalBody
