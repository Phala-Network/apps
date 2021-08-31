import {TransactionInfo} from '@phala/app-types'
import React, {Dispatch, SetStateAction, useState} from 'react'
import SubmitStep from '.'
import {Modal} from '../..'
import {InputDataStepResult} from '../InputDataStep'

type Props = {
  visible: boolean
  setModalVisible: Dispatch<SetStateAction<boolean>>
  submitData?: InputDataStepResult
}

const SubmitStepModal: React.FC<Props> = (props) => {
  const {visible, submitData, setModalVisible} = props
  const [, setTransactionInfo] = useState<TransactionInfo>()
  const [, setResultStepModalVisible] = useState(false)

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

      {/* <ResultStepModal
        onClose={() => setResultStepModalVisible(false)}
        visible={resultStepModalVisible}
        transactionInfo={transactionInfo}
      /> */}
    </>
  )
}

export default SubmitStepModal
