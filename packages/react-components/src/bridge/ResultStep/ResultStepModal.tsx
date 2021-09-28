import {TransactionInfo, TransactionRecord} from '@phala/app-types'
import {useTranslation} from '@phala/react-i18n'
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
  const {t} = useTranslation()
  const {visible, onClose, transactionInfo, record} = props

  if (!transactionInfo) {
    return null
  }

  return (
    <Modal visible={visible} title={t('bridge.bridge_information')}>
      <ResultStepToKhala
        record={record}
        transactionInfo={transactionInfo}
      ></ResultStepToKhala>

      <ModalActions>
        <ModalAction full>
          <Button type="primary" onClick={onClose}>
            {t('bridge.done')}
          </Button>
        </ModalAction>
      </ModalActions>
    </Modal>
  )
}

export default TransactionDetailModal
