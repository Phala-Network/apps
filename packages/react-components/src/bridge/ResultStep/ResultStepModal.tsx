import { TransactionRecord } from '@phala/app-types'
import React from 'react'
import { Button, Modal, ModalActions } from '../..'
import ResultStepToKhala from './ResultStepToKhala'

type Props = {
  visible: boolean
  onClose(): void
  transactionInfo?: TransactionRecord
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
