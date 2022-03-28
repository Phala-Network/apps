import {useEthereumBridgeFee} from '@phala/react-libs'
import {useKhalaBridgeFee} from '.'
import {toKaruraXcmFee, toKhalaXcmFee, Khala} from '../config'
import {useAllTransferData} from '../store'
import {formatCurrency} from '../utils/formatCurrency'

export function useBridgeFee(network: string = Khala) {
  const {toNetwork} = useAllTransferData()
  const ethereumBridgeFee = useEthereumBridgeFee()
  const khalaBridgeFee = useKhalaBridgeFee()

  const ethereumBridgeFeeText =
    formatCurrency(ethereumBridgeFee, 'ETH') || '- ETH'
  const khalaBridgeFeeText = formatCurrency(khalaBridgeFee, 'PHA') || '- PHA'

  if (network === 'Karura' && toNetwork === 'Khala') {
    return formatCurrency(toKhalaXcmFee, 'PHA')
  }

  return network === Khala
    ? toNetwork === 'Karura'
      ? // HACK: hardcode
        formatCurrency(toKaruraXcmFee, 'PHA')
      : khalaBridgeFeeText
    : ethereumBridgeFeeText
}
