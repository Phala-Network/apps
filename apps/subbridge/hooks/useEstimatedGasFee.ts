import {
  ethereumToKhalaEstimatedGasFetcher,
  ethersGasPriceFetcher,
} from '@/lib/ethersFetcher'
import {
  karuraPartialFeeFetcher,
  khalaPartialFeeFetcher,
} from '@/lib/polkadotFetcher'
import {assetAtom, fromChainAtom, toChainAtom} from '@/store/bridge'
import {ethersProviderAtom} from '@/store/ethers'
import Decimal from 'decimal.js'
import {useAtomValue} from 'jotai'
import useSWR from 'swr'
import {useEthersContract} from './useEthersContract'
import {usePolkadotApi} from './usePolkadotApi'

export const useEstimatedGasFee = () => {
  const ethersBridgeContract = useEthersContract('bridgeContract')
  const fromChain = useAtomValue(fromChainAtom)
  const toChain = useAtomValue(toChainAtom)
  const asset = useAtomValue(assetAtom)
  const ethersProvider = useAtomValue(ethersProviderAtom)
  const khalaApi = usePolkadotApi(
    fromChain.id === 'thala' || toChain.id === 'thala' ? 'thala' : 'khala'
  )
  const karuraApi = usePolkadotApi(
    fromChain.id === 'karura-test' || toChain.id === 'karura-test'
      ? 'karura-test'
      : 'karura'
  )
  const isFromEthereumToKhala =
    (fromChain.id === 'ethereum' && toChain.id === 'khala') ||
    (fromChain.id === 'kovan' && toChain.id === 'thala')
  const isFromKarura =
    fromChain.id === 'karura' || fromChain.id === 'karura-test'
  const isFromKhala = fromChain.id === 'thala' || fromChain.id === 'khala'

  const {data: ethereumGasPrice} = useSWR(
    [ethersProvider],
    ethersGasPriceFetcher
  )
  const {data: ethereumToKhalaEstimatedGas} = useSWR(
    isFromEthereumToKhala &&
      ethersBridgeContract &&
      khalaApi &&
      asset.bridgeContract
      ? [
          ethersBridgeContract,
          khalaApi,
          asset.bridgeContract[fromChain.evmChainId].resourceId,
        ]
      : null,
    ethereumToKhalaEstimatedGasFetcher
  )

  const {data: karuraPartialFee} = useSWR(
    isFromKarura &&
      karuraApi &&
      asset.karuraToken &&
      toChain.kind === 'polkadot'
      ? [karuraApi, asset.karuraToken, toChain.paraId]
      : null,
    karuraPartialFeeFetcher
  )

  const {data: khalaPartialFee} = useSWR(
    isFromKhala && khalaApi ? [khalaApi, toChain.id, asset.id] : null,
    khalaPartialFeeFetcher
  )

  if (
    isFromEthereumToKhala &&
    ethereumToKhalaEstimatedGas &&
    ethereumGasPrice
  ) {
    return new Decimal(
      ethereumToKhalaEstimatedGas.times(ethereumGasPrice.toString())
    )
  }

  if (isFromKarura) {
    return karuraPartialFee
  }

  if (isFromKhala) {
    return khalaPartialFee
  }

  return null
}
