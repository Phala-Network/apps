import {FC} from 'react'
import Progress from './Progress'

interface ProgressProps {
  progressIndex: number
}

export const KhalaProcess: FC<ProgressProps> = (props) => {
  const {progressIndex} = props

  const steps = [
    {
      text: 'Transaction Send',
    },
    {
      text: 'Khala Confirmed',
    },
    {
      text: 'Relayer Confirmed',
    },
    {
      text: 'Ethereum Confirmed',
    },
  ]

  return <Progress steps={steps} progressIndex={progressIndex}></Progress>
}
