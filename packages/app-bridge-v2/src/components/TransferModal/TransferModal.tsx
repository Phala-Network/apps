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
          address="5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty"
          amount="10000"
          type="PHA"
        />

        <InformationDetailItem
          label="To"
          address="5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty"
          amount="10000"
          type="PHA"
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
