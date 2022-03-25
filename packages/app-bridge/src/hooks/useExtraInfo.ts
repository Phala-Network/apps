import {useAllTransferData} from '../store'
import {useBridgeFee} from './useBridgeFee'

export function useExtraInfo(): {
  label: string
  value: string
}[] {
  const transactionInfo = useAllTransferData()

  const bridgeFee = useBridgeFee(transactionInfo.fromNetwork)

  return [
    {
      label: transactionInfo.fromNetwork === 'Ethereum' ? 'Fee' : 'Bridge Fee',
      value: bridgeFee || '-',
    },
  ]
}
