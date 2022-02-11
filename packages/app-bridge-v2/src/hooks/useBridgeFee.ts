import {useEthereumBridgeFee} from '@phala/react-libs'
import {useKhalaBridgeFee} from '.'
import {Khala} from '../config'
import {formatCurrency} from '../utils/formatCurrency'

export function useBridgeFee(network: string = Khala) {
  const ethereumBridgeFee = useEthereumBridgeFee()
  const khalaBridgeFee = useKhalaBridgeFee()

  const ethereumBridgeFeeText =
    formatCurrency(ethereumBridgeFee, 'ETH') || '- ETH'
  const khalaBridgeFeeText = formatCurrency(khalaBridgeFee, 'PHA') || '- PHA'

  return network === Khala ? khalaBridgeFeeText : ethereumBridgeFeeText
}
