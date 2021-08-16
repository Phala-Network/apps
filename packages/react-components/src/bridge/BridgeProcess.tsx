import React, { useState } from 'react'
import InputDataStep from './InputDataStep'
import ResultStep from './ResultStep'
import SubmitStep from './SubmitStep'

export type StepProps = {
  layout?: 'flex' | 'block'
}

type Props = {
  onDone?: () => void
} & StepProps

const BridgeProcess: React.FC<Props> = (props) => {
  const { layout = 'block' } = props
  const [step, setStep] = useState(0)
  const { onDone } = props

  const next = () => {
    setStep((prev) => prev + 1)
  }

  const prev = () => {
    setStep((prev) => prev - 1)
  }

  return (
    <>
      {step === 0 && (
        <InputDataStep layout={layout} onNext={next}></InputDataStep>
      )}
      {step === 1 && (
        <SubmitStep layout={layout} onSubmit={next} onPrev={prev}></SubmitStep>
      )}
      {step === 2 && (
        <ResultStep layout={layout} onNext={() => onDone?.()}></ResultStep>
      )}
    </>
  )
}

export default BridgeProcess
