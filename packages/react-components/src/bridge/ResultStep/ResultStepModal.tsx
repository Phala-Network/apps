import { TransactionInfo, TransactionRecord } from '@phala/app-types'
import { useDepositRecordsByDepositorQuery } from '@phala/react-graph-chainbridge'
import { useEthereumGraphQL } from '@phala/react-libs'
import React from 'react'
import { Button, Modal, ModalActions } from '../..'
import ResultStepToKhala from './ResultStepToKhala'

type Props = {
  visible: boolean
  onClose(): void
  transactionInfo?: TransactionInfo
  record: TransactionRecord
}

const TransactionDetailModal: React.FC<Props> = (props) => {
  const { visible, onClose, transactionInfo } = props

  const depositor = transactionInfo?.from.address

  const { client } = useEthereumGraphQL()

  const { data } = useDepositRecordsByDepositorQuery(depositor, 10, 0, client)

  console.log('data', data?.depositRecords)

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
