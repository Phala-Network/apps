import {
  ethereumToKhalaEstimatedGasFetcher,
  ethersGasPriceFetcher,
  moonriverEstimatedGasFetcher,
} from '@/lib/ethersFetcher'
import {
  khalaPartialFeeFetcher,
  xTokensPartialFeeFetcher,
} from '@/lib/polkadotFetcher'
import {
  assetAtom,
  decimalsAtom,
  fromChainAtom,
  toChainAtom,
} from '@/store/bridge'
import Decimal from 'decimal.js'
import {useAtomValue} from 'jotai'
import useSWR from 'swr'
import {
  useEthersChainBridgeContract,
  useEthersXTokensContract,
} from './useEthersContract'
import {useEthersProvider} from './useEthersProvider'
import {useCurrentPolkadotApi, usePolkadotApi} from './usePolkadotApi'

export const useEstimatedGasFee = () => {
  const ethersChainBridgeContract = useEthersChainBridgeContract()
  const ethersXTokensContract = useEthersXTokensContract()
  const fromChain = useAtomValue(fromChainAtom)
  const toChain = useAtomValue(toChainAtom)
  const asset = useAtomValue(assetAtom)
  const ethersProvider = useEthersProvider()
  const decimals = useAtomValue(decimalsAtom)
  const khalaApi = usePolkadotApi(
    fromChain.id === 'thala' || toChain.id === 'thala' ? 'thala' : 'khala'
  )
  const polkadotApi = useCurrentPolkadotApi()
  const isFromEthereumToKhala =
    (fromChain.id === 'ethereum' && toChain.id === 'khala') ||
    (fromChain.id === 'kovan' && toChain.id === 'thala')
  const isTransferringByXTokens =
    fromChain.id === 'karura' ||
    fromChain.id === 'karura-test' ||
    fromChain.id === 'bifrost' ||
    fromChain.id === 'bifrost-test'
  const isFromKhala = fromChain.id === 'thala' || fromChain.id === 'khala'
  const isFromMoonriver = fromChain.id === 'moonriver'

  const {data: ethereumGasPrice} = useSWR(
    [ethersProvider],
    ethersGasPriceFetcher
  )
  const {data: ethereumToKhalaEstimatedGas} = useSWR(
    isFromEthereumToKhala &&
      ethersChainBridgeContract &&
      khalaApi &&
      asset.chainBridgeResourceId
      ? [ethersChainBridgeContract, khalaApi, asset.chainBridgeResourceId]
      : null,
    ethereumToKhalaEstimatedGasFetcher
  )

  const {data: moonriverEstimatedGas} = useSWR(
    isFromMoonriver &&
      ethersXTokensContract &&
      toChain.paraId &&
      asset.xc20Address
      ? [ethersXTokensContract, asset.xc20Address, toChain.paraId, decimals]
      : null,
    moonriverEstimatedGasFetcher
  )

  const {data: xTokensPartialFee} = useSWR(
    isTransferringByXTokens && polkadotApi
      ? [polkadotApi, fromChain.id, toChain.id, asset.id]
      : null,
    xTokensPartialFeeFetcher
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

  if (isTransferringByXTokens) {
    return xTokensPartialFee
  }

  if (isFromKhala) {
    return khalaPartialFee
  }

  if (isFromMoonriver && moonriverEstimatedGas && ethereumGasPrice) {
    return new Decimal(moonriverEstimatedGas.times(ethereumGasPrice.toString()))
  }

  return null
}
