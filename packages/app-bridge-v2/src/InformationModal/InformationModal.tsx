import {KIND as ButtonKind} from 'baseui/button'
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

interface InformationModalProps {
  type?: string
}

export const InformationModal: FC<InformationModalProps> = () => {
  const [isOpen, setIsOpen] = useState(true)

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
      <ModalHeader>Hello world</ModalHeader>
      <ModalBody>
        Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare
        faucibus ex, non facilisis nisl. Maecenas aliquet mauris ut tempus.
      </ModalBody>
      <ModalFooter>
        <ModalButton kind={ButtonKind.tertiary}>Cancel</ModalButton>
        <ModalButton>Okay</ModalButton>
      </ModalFooter>
    </Modal>
  )
}
