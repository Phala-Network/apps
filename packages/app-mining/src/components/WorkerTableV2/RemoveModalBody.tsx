import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ModalProps,
} from 'baseui/modal'
import {ParagraphSmall} from 'baseui/typography'
import {FormControl} from 'baseui/form-control'
import type {Miners} from '../../hooks/graphql'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import {useApiPromise} from '@phala/react-libs'

const RemoveModalBody = ({
  miner,
  onClose,
}: {miner: Miners} & Pick<ModalProps, 'onClose'>): JSX.Element => {
  const {pid, workerPublicKey} = miner
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const onConfirm = () => {
    if (api) {
      waitSignAndSend(
        api.tx.phalaStakePool?.removeWorker?.(pid, workerPublicKey),
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
      <ModalHeader>Remove Worker</ModalHeader>
      <ModalBody>
        <ParagraphSmall>Remove a worker from a pool</ParagraphSmall>
        <FormControl label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormControl>
        <FormControl label="Worker Public Key">
          <ParagraphSmall as="div" $style={{wordBreak: 'break-all'}}>
            {workerPublicKey}
          </ParagraphSmall>
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={onConfirm}>Confirm</ModalButton>
      </ModalFooter>
    </>
  )
}

export default RemoveModalBody
