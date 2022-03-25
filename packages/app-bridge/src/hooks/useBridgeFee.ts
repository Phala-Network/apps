import {useEthereumBridgeFee} from '@phala/react-libs'
import {useKhalaBridgeFee} from '.'
import {karuraBridgeFee, Khala} from '../config'
import {useToNetwork} from '../store'
import {formatCurrency} from '../utils/formatCurrency'

export function useBridgeFee(network: string = Khala) {
  const [toNetwork] = useToNetwork()
  const ethereumBridgeFee = useEthereumBridgeFee()
  const khalaBridgeFee = useKhalaBridgeFee()

  const ethereumBridgeFeeText =
    formatCurrency(ethereumBridgeFee, 'ETH') || '- ETH'
  const khalaBridgeFeeText = formatCurrency(khalaBridgeFee, 'PHA') || '- PHA'

  return network === Khala
    ? toNetwork[0]?.id === 'Karura'
      ? // HACK: hardcode
        formatCurrency(karuraBridgeFee, 'PHA')
      : khalaBridgeFeeText
    : ethereumBridgeFeeText
}
