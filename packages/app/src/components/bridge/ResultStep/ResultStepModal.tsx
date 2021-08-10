import React from 'react'
import { TransactionInfo } from '../../../types/normal'
import Button from '../../Button'
import Modal, { ModalActions } from '../../Modal'
import ResultStepToKhala from './ResultStepToKhala'

type Props = {
  visible: boolean
  onClose(): void
  transactionInfo?: TransactionInfo
}

const TransactionDetailModal: React.FC<Props> = (props) => {
  const { visible, onClose, transactionInfo } = props

  if (!transactionInfo) {
    return null
  }

  return (
    <Modal visible={visible} title="Bridge Information">
      <ResultStepToKhala transactionInfo={transactionInfo}></ResultStepToKhala>

      <ModalActions>
        <Button type="primary" onClick={onClose}>
          Done
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default TransactionDetailModal
