import {useApiPromise} from '@phala/react-libs'
import {Button} from 'baseui/button'
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from 'baseui/modal'
import {ParagraphSmall} from 'baseui/typography'
import {useState} from 'react'
import useWaitSignAndSend from '../hooks/useWaitSignAndSend'

const Body = ({onClose}: Pick<ModalProps, 'onClose'>): JSX.Element => {
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const onConfirm = () => {
    if (!api) return
    waitSignAndSend(api.tx.phalaStakePool?.create?.(), (status) => {
      if (status.isReady) {
        onClose?.({closeSource: 'closeButton'})
      }
    })
  }
  return (
    <>
      <ModalHeader>Create Pool</ModalHeader>
      <ModalBody>
        <ParagraphSmall>You will create a new stake pool.</ParagraphSmall>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={onConfirm}>Confirm</ModalButton>
      </ModalFooter>
    </>
  )
}

const CreatePoolButton = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  return (
    <>
      <Button
        kind="secondary"
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Create Pool
      </Button>
      <Modal onClose={onClose} isOpen={isOpen}>
        <Body onClose={onClose} />
      </Modal>
    </>
  )
}

export default CreatePoolButton
