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
import {FC} from 'react'
import {useAllTransferData} from '../../store'
import {modalOverrides} from '../../style/modalOverrides'
import {TransactionInfo} from '../../types'
import {InformationDetailItem} from '../InformationDetailItem'

interface TransferModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  transactionInfo?: TransactionInfo
}

export const TransferModal: FC<TransferModalProps> = (props) => {
  const {isOpen, onClose} = props
  const allTransferData = useAllTransferData()

  return (
    <Modal
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
      overrides={modalOverrides}
    >
      <ModalHeader>Bridge Confirmation</ModalHeader>

      <ModalBody>
        <InformationDetailItem
          label="From"
          address={allTransferData.fromAddress}
          network={allTransferData.fromNetwork}
          coin={allTransferData.fromCoin}
          amount={allTransferData.amountDecimal.toString()}
        />

        <InformationDetailItem
          label="To"
          address={allTransferData.toAddress}
          network={allTransferData.toNetwork}
          coin={allTransferData.toCoin}
          amount={allTransferData.amountDecimal.toString()}
        />
      </ModalBody>

      <ModalFooter>
        <ModalButton onClick={onClose} kind={ButtonKind.tertiary}>
          Cancel
        </ModalButton>
        <ModalButton>Submit</ModalButton>
      </ModalFooter>
    </Modal>
  )
}
