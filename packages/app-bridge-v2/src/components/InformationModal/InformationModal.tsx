import {
  Modal,
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
  ROLE,
  SIZE,
} from 'baseui/modal'
import {FC, useState} from 'react'
import {TimeIcon} from './components/TimeIcon'

interface InformationModalProps {
  type?: string
}

export const InformationModal: FC<InformationModalProps> = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Bridge Confirmation</ModalHeader>

      <ModalBody>
        <TimeIcon />
      </ModalBody>

      <ModalFooter>
        <ModalButton>Collapse</ModalButton>
      </ModalFooter>
    </Modal>
  )
}
