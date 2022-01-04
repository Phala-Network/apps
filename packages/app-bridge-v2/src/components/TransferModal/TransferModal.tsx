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
import {TransactionInfo} from '../../types'
import {InformationDetailItem} from '../InformationDetailItem'

interface TransferModalProps {
  type?: string
  isOpen: boolean
  onClose: () => void
  transactionInfo?: TransactionInfo
}

export const TransferModal: FC<TransferModalProps> = (props) => {
  const {isOpen, onClose} = props
  const allTransferData = useAllTransferData()

  return (
    <Modal
      onClose={onClose}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
      overrides={{
        Dialog: {
          style: {
            border: '2px solid #AAD829',
            borderRadius: 0,
          },
        },
      }}
    >
      <ModalHeader>Bridge Confirmation</ModalHeader>

      <ModalBody>
        <InformationDetailItem
          label="From"
          address={allTransferData.fromAddress}
          network={allTransferData.fromNetwork}
          coin={allTransferData.fromCoin}
          amount={allTransferData.fromAmount.toString()}
        />

        <InformationDetailItem
          label="To"
          address={allTransferData.toAddress}
          network={allTransferData.toNetwork}
          coin={allTransferData.toCoin}
          amount={allTransferData.fromAmount.toString()}
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
