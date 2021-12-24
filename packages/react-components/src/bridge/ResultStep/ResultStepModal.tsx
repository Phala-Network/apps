import {TransactionInfo, TransactionRecord} from '@phala/app-types'
import React from 'react'
import {Button, Modal, ModalAction, ModalActions} from '../..'
import ResultStepToKhala from './ResultStepToKhala'

type Props = {
  visible: boolean
  onClose(): void
  transactionInfo?: TransactionInfo
  record: TransactionRecord
}

const TransactionDetailModal: React.FC<Props> = (props) => {
  const {visible, onClose, transactionInfo, record} = props

  if (!transactionInfo) {
    return null
  }

  return (
    <Modal visible={visible} title="Bridge Information">
      <ResultStepToKhala
        record={record}
        transactionInfo={transactionInfo}
      ></ResultStepToKhala>

      <ModalActions>
        <ModalAction full>
          <Button type="primary" onClick={onClose}>
            Done
          </Button>
        </ModalAction>
      </ModalActions>
    </Modal>
  )
}

export default TransactionDetailModal
