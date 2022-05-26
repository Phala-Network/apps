import {
  ethersGasPriceFetcher,
  evmChainBridgeEstimatedGasFetcher,
  evmXTokensEstimatedGasFetcher,
} from '@/lib/ethersFetcher'
import {
  khalaXTransferPartialFeeFetcher,
  xTokensPartialFeeFetcher,
} from '@/lib/polkadotFetcher'
import {
  assetAtom,
  bridgeInfoAtom,
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

export const useEstimatedGasFee = (): Decimal | undefined => {
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
  const {kind: bridgeKind} = useAtomValue(bridgeInfoAtom)

  const {data: ethersGasPrice} = useSWR(
    ethersProvider ? [ethersProvider] : null,
    ethersGasPriceFetcher
  )
  const {data: evmChainBridgeEstimatedGas} = useSWR(
    bridgeKind === 'evmChainBridge' &&
      ethersChainBridgeContract &&
      khalaApi &&
      asset.chainBridgeResourceId
      ? [
          ethersChainBridgeContract,
          khalaApi,
          asset.chainBridgeResourceId,
          toChain.id,
        ]
      : null,
    evmChainBridgeEstimatedGasFetcher
  )

  const {data: evmXTokensEstimatedGas} = useSWR(
    bridgeKind === 'evmXTokens' &&
      ethersXTokensContract &&
      toChain.paraId &&
      asset.xc20Address
      ? [ethersXTokensContract, asset.xc20Address, toChain.paraId, decimals]
      : null,
    evmXTokensEstimatedGasFetcher
  )

  const {data: xTokensPartialFee} = useSWR(
    bridgeKind === 'polkadotXTokens' && polkadotApi
      ? [polkadotApi, fromChain.id, toChain.id, asset.id]
      : null,
    xTokensPartialFeeFetcher
  )

  const {data: khalaPartialFee} = useSWR(
    bridgeKind === 'khalaXTransfer' && khalaApi
      ? [khalaApi, toChain.id, asset.id]
      : null,
    khalaXTransferPartialFeeFetcher
  )

  return (
    (ethersGasPrice &&
      ((evmChainBridgeEstimatedGas &&
        ethersGasPrice.times(evmChainBridgeEstimatedGas)) ||
        (evmXTokensEstimatedGas &&
          ethersGasPrice.times(evmXTokensEstimatedGas)))) ||
    xTokensPartialFee ||
    khalaPartialFee
  )
}
