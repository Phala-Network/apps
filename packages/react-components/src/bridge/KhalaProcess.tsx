import {FC} from 'react'
import Progress from './Progress'

interface ProgressProps {
  progressIndex: number
  khalaAddress: string
  etherscanAddress: string
}

export const KhalaProcess: FC<ProgressProps> = (props) => {
  const {progressIndex, etherscanAddress, khalaAddress} = props

  const steps = [
    {
      text: 'Transaction Send',
    },
    {
      text: 'Khala Confirmed',
      ...(progressIndex > 0
        ? {
            link: `https://phala-testnet.subscan.io/account/${khalaAddress}?tab=transfer`,
          }
        : {}),
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
