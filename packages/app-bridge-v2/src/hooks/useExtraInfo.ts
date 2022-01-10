import {useAllTransferData} from '../store'
import {useBridgeFee} from './useBridgeFee'

export function useExtraInfo(): {
  label: string
  value: string
}[] {
  const transactionInfo = useAllTransferData()

  const bridgeFee = useBridgeFee(transactionInfo.fromNetwork)

  return [{label: 'Bridge Fee', value: bridgeFee}]
}
