import { isDev, isTest } from '@phala/utils'
import Progress from './Progress'

type EthereumProgressParams = {
  transactionHash?: string
  progressIndex: number
}
export const EthereumProgress = (params: EthereumProgressParams) => {
  const { transactionHash, progressIndex } = params
  let link = ''

  if (transactionHash) {
    if (isTest() || isDev()) {
      link = `https://kovan.etherscan.io/tx/${transactionHash}`
    } else {
      link = `https://etherscan.io/tx/${transactionHash}`
    }
  }

  const steps = [
    {
      text: 'Transaction Send',
    },
    {
      text: 'Ethereum Confirmed',
      link,
    },
    {
      text: 'Relayer Confirmed',
    },
    {
      text: 'Khala Confirmed',
    },
  ]

  return <Progress steps={steps} progressIndex={progressIndex}></Progress>
}
