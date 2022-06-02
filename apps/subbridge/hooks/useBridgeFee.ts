import {khalaToEthereumBridgeFeeFetcher} from '@/lib/polkadotFetcher'
import {assetAtom, fromChainAtom, toChainAtom} from '@/store/bridge'
import Decimal from 'decimal.js'
import {useAtomValue} from 'jotai'
import useSWR from 'swr'
import {usePolkadotApi} from './usePolkadotApi'

const zlkChainBridgeFee = new Decimal('0.25')

export const useBridgeFee = (): Decimal | undefined => {
  const fromChain = useAtomValue(fromChainAtom)
  const toChain = useAtomValue(toChainAtom)
  const asset = useAtomValue(assetAtom)
  const khalaApi = usePolkadotApi(fromChain.id === 'thala' ? 'thala' : 'khala')
  const isFromKhalaToEthereum =
    (fromChain.id === 'khala' && toChain.id === 'ethereum') ||
    (fromChain.id === 'thala' && toChain.id === 'kovan')
  const isTransferringZlkThroughChainBridge =
    fromChain.kind === 'polkadot' &&
    toChain.kind === 'evm' &&
    asset.id === 'zlk'

  const {data: khalaToEthereumBridgeFee} = useSWR(
    isFromKhalaToEthereum ? [khalaApi] : null,
    khalaToEthereumBridgeFeeFetcher
  )

  if (isFromKhalaToEthereum) {
    return khalaToEthereumBridgeFee
  }

  if (isTransferringZlkThroughChainBridge) {
    return zlkChainBridgeFee
  }

  return new Decimal(0)
}
