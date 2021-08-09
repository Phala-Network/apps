import React from 'react'
import { TransactionInfo } from '../../../types/normal'
import { StepProps } from '../BridgeProcess'
import { InputDataStepResult } from '../InputDataStep'
import SubmitStepToEthereum from './SubmitStepToEthereum'
import SubmitStepToKhala from './SubmitStepToKhala'

export type SubmitStepProps = {
  onPrev?(): void
  onSubmit?(): void
  onSuccess?(data: TransactionInfo): void
  data?: InputDataStepResult
} & StepProps

const SubmitStep: React.FC<SubmitStepProps> = (props) => {
  const { data } = props

  if (data?.to.network === 'ethereum') {
    return <SubmitStepToEthereum layout="block" {...props} />
  } else if (data?.to.network === 'khala') {
    return <SubmitStepToKhala layout="block" {...props} />
  } else {
    return null
  }
}

export default SubmitStep
