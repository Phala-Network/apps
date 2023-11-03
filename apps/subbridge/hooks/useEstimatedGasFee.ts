import {
  ethersGasPriceFetcher,
  evmChainBridgeEstimatedGasFetcher,
  evmXTokensEstimatedGasFetcher,
} from '@/lib/ethersFetcher'
import {getEvmSygmaTransfer} from '@/lib/evmSygma'
import {
  phalaXTransferPartialFeeFetcher,
  xTokensPartialFeeFetcher,
} from '@/lib/polkadotFetcher'
import {
  assetAtom,
  bridgeInfoAtom,
  decimalsAtom,
  fromChainAtom,
  toChainAtom,
} from '@/store/bridge'
import {evmAccountAtom} from '@/store/ethers'
import Decimal from 'decimal.js'
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
  const evmAccount = useAtomValue(evmAccountAtom)
  const decimals = useAtomValue(decimalsAtom)
  const khalaApi = usePolkadotApi(toChain.id === 'phala' ? 'phala' : 'khala')
  const polkadotApi = useCurrentPolkadotApi()
  const bridge = useAtomValue(bridgeInfoAtom)
  const resourceId =
    typeof asset.chainBridgeResourceId === 'string'
      ? asset.chainBridgeResourceId
      : asset.chainBridgeResourceId?.[toChain.id]

  const {data: ethersGasPrice} = useSWR(
    ethersWeb3Provider,
    ethersGasPriceFetcher,
  )
  const {data: evmChainBridgeEstimatedGas} = useSWR(
    bridge.kind === 'evmChainBridge' &&
      ethersChainBridgeContract != null &&
      khalaApi != null &&
      resourceId != null && [
        ethersChainBridgeContract,
        khalaApi,
        resourceId,
        toChain.id,
      ],
    evmChainBridgeEstimatedGasFetcher,
  )

  const {data: evmXTokensEstimatedGas} = useSWR(
    bridge.kind === 'evmXTokens' &&
      ethersXTokensContract != null &&
      toChain.paraId != null &&
      asset.xc20Address?.[fromChain.id] != null && [
        ethersXTokensContract,
        asset.xc20Address[fromChain.id],
        toChain.paraId,
        decimals,
      ],
    evmXTokensEstimatedGasFetcher,
  )

  const {data: evmSygmaEstimatedGas} = useSWR(
    bridge.kind === 'evmSygma' &&
      ethersWeb3Provider != null &&
      evmAccount != null && [
        ethersWeb3Provider,
        evmAccount,
        fromChain,
        toChain,
        asset,
      ],
    async ([provider, evmAccount, fromChain, toChain, asset]) => {
      const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
      const {tx} = await getEvmSygmaTransfer(
        provider,
        fromChain,
        toChain,
        evmAccount,
        asset,
        ALICE,
        '1000000000000000000',
      )

      return new Decimal(
        (await provider.getSigner().estimateGas(tx)).toString(),
      )
    },
  )

  const {data: xTokensPartialFee} = useSWR(
    bridge.kind === 'polkadotXTokens' &&
      polkadotApi != null && [
        polkadotApi,
        fromChain.id,
        toChain.id,
        asset.id,
        bridge.proxy,
      ],
    xTokensPartialFeeFetcher,
  )

  const {data: phalaPartialFee} = useSWR(
    (bridge.kind === 'phalaChainBridge' || bridge.kind === 'phalaSygma') &&
      polkadotApi != null && [
        polkadotApi,
        fromChain.id,
        toChain.id,
        asset.id,
        bridge.kind,
      ],
    phalaXTransferPartialFeeFetcher,
  )

  return (
    (ethersGasPrice != null
      ? (evmChainBridgeEstimatedGas != null
          ? ethersGasPrice.times(evmChainBridgeEstimatedGas)
          : undefined) ??
        (evmXTokensEstimatedGas != null
          ? ethersGasPrice.times(evmXTokensEstimatedGas)
          : undefined) ??
        (evmSygmaEstimatedGas != null
          ? ethersGasPrice.times(evmSygmaEstimatedGas)
          : undefined)
      : undefined) ??
    xTokensPartialFee ??
    phalaPartialFee
  )
}
