import React, { Dispatch, SetStateAction, useState } from 'react'
import SubmitStep from '.'
import { TransactionInfo } from '../../../types/normal'
import Modal from '../../Modal'
import { InputDataStepResult } from '../InputDataStep'
import ResultStepModal from '../ResultStep/ResultStepModal'

type Props = {
  visible: boolean
  setModalVisible: Dispatch<SetStateAction<boolean>>
  submitData?: InputDataStepResult
}

const SubmitStepModal: React.FC<Props> = (props) => {
  const { visible, submitData, setModalVisible } = props
  const [transactionInfo, setTransactionInfo] = useState<TransactionInfo>()
  const [resultStepModalVisible, setResultStepModalVisible] = useState(false)

  if (!submitData) return null

  return (
    <>
      <Modal visible={visible} title="Bridge Confirmation">
        <SubmitStep
          data={submitData}
          onPrev={() => setModalVisible(false)}
          onSuccess={(transactionInfo) => {
            setModalVisible(false)
            setResultStepModalVisible(true)
            setTransactionInfo(transactionInfo)
          }}
        />
      </Modal>

      <ResultStepModal
        onClose={() => setResultStepModalVisible(false)}
        visible={resultStepModalVisible}
        transactionInfo={transactionInfo}
      />
    </>
  )
}

export default SubmitStepModal
