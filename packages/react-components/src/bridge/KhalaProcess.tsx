import {FC} from 'react'
import Progress from './Progress'

interface ProgressProps {
  progressIndex: number
  khalaAddress: string
  etherscanAddress: string
}

export const KhalaProcess: FC<ProgressProps> = (props) => {
  const {progressIndex, etherscanAddress} = props

  // https://kovan.etherscan.io/address/0xdf2e83f33db8a9ccf3a00fce18c3f509b974353d#tokentxns
  const steps = [
    {
      text: 'Transaction Send',
    },
    {
      text: 'Khala Confirmed',
      // ...(progressIndex > 0
      //   ? {
      //       link: `https://kovan.etherscan.io/address/${khalaAddress}#tokentxns`,
      //     }
      //   : {}),
    },
    {
      text: 'Relayer Confirmed',
    },
    {
      text: 'Ethereum Confirmed',
      ...(progressIndex === 3
        ? {
            link: `https://kovan.etherscan.io/address/${etherscanAddress}#tokentxns`,
          }
        : {}),
    },
  ]

  return <Progress steps={steps} progressIndex={progressIndex}></Progress>
}
