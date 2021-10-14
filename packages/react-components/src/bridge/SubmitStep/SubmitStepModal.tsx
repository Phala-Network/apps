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
  const [title, setTitle] = useState('Bridge Confirmation')

  if (!submitData) return null

  return (
    <>
      <Modal visible={visible} title={title}>
        <SubmitStep
          data={submitData}
          onPrev={() => {
            setModalVisible(false)
            setTitle('Bridge Confirmation')
          }}
          onSuccess={(transactionInfo) => {
            setModalVisible(false)
            setResultStepModalVisible(true)
            setTransactionInfo(transactionInfo)
          }}
          onSubmit={() => {
            setTitle('Bridge Information')
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
