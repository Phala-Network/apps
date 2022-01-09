import {useEthereumBridgeFee} from '@phala/react-libs'
import {useKhalaBridgeFee} from '.'
import {Khala} from '../config'

export function useBridgeFee(network: string = Khala) {
  const ethereumBridgeFee = useEthereumBridgeFee()
  const khalaBridgeFee = useKhalaBridgeFee()

  const ethereumBridgeFeeText = (ethereumBridgeFee || '-') + ' ETH'
  const khalaBridgeFeeText = (khalaBridgeFee || '-') + ' PHA'

  return network === Khala ? khalaBridgeFeeText : ethereumBridgeFeeText
}
