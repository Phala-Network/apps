import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ROLE,
  SIZE,
} from 'baseui/modal'
import {FC} from 'react'
import {modalOverrides} from '../../style/modalOverrides'
import {Button} from '../Button'
import {CurrentTransferInformationDetailItems} from '../CurrentTransferInformationDetailItems'
import {EthereumProgress} from '../TransferModal/transferAction/TransferPHAFromEthereumToKhala/EthereumProgress'

interface InformationModalProps {
  type?: string
  isOpen?: boolean
  onClose?: () => void
}

export const InformationModal: FC<InformationModalProps> = (props) => {
  const {isOpen, onClose} = props

  return (
    <Modal
      onClose={onClose}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
      overrides={modalOverrides}
    >
      <ModalHeader>Bridge Confirmation</ModalHeader>

      <ModalBody>
        <CurrentTransferInformationDetailItems />
        <EthereumProgress transactionHash={'9898sss'} />
      </ModalBody>

      <ModalFooter>
        <Button onClick={onClose}>Collapse</Button>
      </ModalFooter>
    </Modal>
  )
}
