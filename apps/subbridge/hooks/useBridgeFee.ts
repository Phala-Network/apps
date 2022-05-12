import {khalaToEthereumBridgeFeeFetcher} from '@/lib/polkadotFetcher'
import {fromChainAtom, toChainAtom} from '@/store/bridge'
import Decimal from 'decimal.js'
import {useAtomValue} from 'jotai'
import useSWR from 'swr'
import {usePolkadotApi} from './usePolkadotApi'

export const useBridgeFee = (): Decimal | undefined => {
  const fromChain = useAtomValue(fromChainAtom)
  const toChain = useAtomValue(toChainAtom)
  const khalaApi = usePolkadotApi(fromChain.id === 'thala' ? 'thala' : 'khala')
  const isFromKhalaToEthereum =
    (fromChain.id === 'khala' && toChain.id === 'ethereum') ||
    (fromChain.id === 'thala' && toChain.id === 'kovan')

  const {data: khalaToEthereumBridgeFee} = useSWR(
    khalaApi,
    khalaToEthereumBridgeFeeFetcher
  )

  if (isFromKhalaToEthereum) {
    return khalaToEthereumBridgeFee
  }

  return new Decimal(0)
}
