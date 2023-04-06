import {
  ethersGasPriceFetcher,
  evmChainBridgeEstimatedGasFetcher,
  evmXTokensEstimatedGasFetcher,
} from '@/lib/ethersFetcher'
import {
  khalaXTransferPartialFeeFetcher,
  polkadotXcmTransferPartialFeeFetcher,
  xTokensPartialFeeFetcher,
} from '@/lib/polkadotFetcher'
import {
  assetAtom,
  bridgeInfoAtom,
  decimalsAtom,
  fromChainAtom,
  toChainAtom,
} from '@/store/bridge'
import type Decimal from 'decimal.js'
import {useAtomValue} from 'jotai'
import useSWR from 'swr'
import {
  useEthersChainBridgeContract,
  useEthersXTokensContract,
} from './useEthersContract'
import {useEthersWeb3Provider} from './useEthersProvider'
import {useCurrentPolkadotApi, usePolkadotApi} from './usePolkadotApi'

export const useEstimatedGasFee = (): Decimal | undefined => {
  const ethersChainBridgeContract = useEthersChainBridgeContract()
  const ethersXTokensContract = useEthersXTokensContract()
  const fromChain = useAtomValue(fromChainAtom)
  const toChain = useAtomValue(toChainAtom)
  const asset = useAtomValue(assetAtom)
  const ethersWeb3Provider = useEthersWeb3Provider()
  const decimals = useAtomValue(decimalsAtom)
  const khalaApi = usePolkadotApi(
    toChain.id === 'phala' || toChain.id === 'thala' ? toChain.id : 'khala'
  )
  const polkadotApi = useCurrentPolkadotApi()
  const {kind: bridgeKind, isThroughKhala} = useAtomValue(bridgeInfoAtom)
  const resourceId =
    typeof asset.chainBridgeResourceId === 'string'
      ? asset.chainBridgeResourceId
      : asset.chainBridgeResourceId?.[toChain.id]

  const {data: ethersGasPrice} = useSWR(
    ethersWeb3Provider != null ? [ethersWeb3Provider] : null,
    ethersGasPriceFetcher
  )
  const {data: evmChainBridgeEstimatedGas} = useSWR(
    bridgeKind === 'evmChainBridge' &&
      ethersChainBridgeContract != null &&
      khalaApi != null &&
      resourceId != null
      ? [ethersChainBridgeContract, khalaApi, resourceId, toChain.id]
      : null,
    evmChainBridgeEstimatedGasFetcher
  )

  const {data: evmXTokensEstimatedGas} = useSWR(
    bridgeKind === 'evmXTokens' &&
      ethersXTokensContract != null &&
      toChain.paraId != null &&
      asset.xc20Address?.[fromChain.id] != null
      ? [
          ethersXTokensContract,
          asset.xc20Address[fromChain.id],
          toChain.paraId,
          decimals,
        ]
      : null,
    evmXTokensEstimatedGasFetcher
  )

  const {data: xTokensPartialFee} = useSWR(
    bridgeKind === 'polkadotXTokens' && polkadotApi != null
      ? [polkadotApi, fromChain.id, toChain.id, asset.id, isThroughKhala]
      : null,
    xTokensPartialFeeFetcher
  )

  const {data: khalaPartialFee} = useSWR(
    bridgeKind === 'khalaXTransfer' && polkadotApi != null
      ? [polkadotApi, fromChain.id, toChain.id, asset.id]
      : null,
    khalaXTransferPartialFeeFetcher
  )

  const {data: polkadotXcmPartialFee} = useSWR(
    bridgeKind === 'polkadotXcm' && polkadotApi != null
      ? [polkadotApi, fromChain.id, toChain.id, asset.id]
      : null,
    polkadotXcmTransferPartialFeeFetcher
  )

  return (
    (ethersGasPrice != null
      ? (evmChainBridgeEstimatedGas != null
          ? ethersGasPrice.times(evmChainBridgeEstimatedGas)
          : undefined) ??
        (evmXTokensEstimatedGas != null
          ? ethersGasPrice.times(evmXTokensEstimatedGas)
          : undefined)
      : undefined) ??
    xTokensPartialFee ??
    khalaPartialFee ??
    polkadotXcmPartialFee
  )
}
