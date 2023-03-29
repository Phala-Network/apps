import {
  ethersGasPriceFetcher,
  evmChainBridgeEstimatedGasFetcher,
  evmXTokensEstimatedGasFetcher,
} from '@/lib/ethersFetcher'
import {
  phalaXTransferPartialFeeFetcher,
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
import {evmAccountAtom} from '@/store/ethers'
import {type Fungible, type Transfer} from '@buildwithsygma/sygma-sdk-core'
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
    ethersWeb3Provider,
    ethersGasPriceFetcher
  )
  const {data: evmChainBridgeEstimatedGas} = useSWR(
    bridgeKind === 'evmChainBridge' &&
      ethersChainBridgeContract != null &&
      khalaApi != null &&
      resourceId != null && [
        ethersChainBridgeContract,
        khalaApi,
        resourceId,
        toChain.id,
      ],
    evmChainBridgeEstimatedGasFetcher
  )

  const {data: evmXTokensEstimatedGas} = useSWR(
    bridgeKind === 'evmXTokens' &&
      ethersXTokensContract != null &&
      toChain.paraId != null &&
      asset.xc20Address?.[fromChain.id] != null && [
        ethersXTokensContract,
        asset.xc20Address[fromChain.id],
        toChain.paraId,
        decimals,
      ],
    evmXTokensEstimatedGasFetcher
  )

  const {data: evmSygmaEstimatedGas} = useSWR(
    bridgeKind === 'evmSygma' &&
      ethersWeb3Provider != null &&
      evmAccount != null && [
        ethersWeb3Provider,
        evmAccount,
        fromChain,
        toChain,
        asset,
      ],
    async ([provider, evmAccount, fromChain, toChain, asset]) => {
      const isTest = fromChain.isTest === true
      const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
      const {EVMAssetTransfer, Environment} = await import(
        '@buildwithsygma/sygma-sdk-core'
      )
      const assetTransfer = new EVMAssetTransfer()
      await assetTransfer.init(
        provider,
        isTest ? Environment.TESTNET : Environment.MAINNET
      )
      const domains = assetTransfer.config.getDomains()
      const resources = assetTransfer.config.getDomainResources()

      const destinationMultiLocation = JSON.stringify({
        parents: 0,
        interior: {
          X1: {AccountId32: {network: {any: null}, id: ALICE}},
        },
      })

      const erc20Resource = resources.find(
        (resource) => resource.symbol === asset.symbol
      )
      if (erc20Resource == null) {
        throw new Error('Resource not found')
      }
      const from = domains.find(
        (domain) => domain.chainId === fromChain.sygmaChainId
      )
      if (from == null) {
        throw new Error(`Network ${fromChain.id} not supported`)
      }
      const to = domains.find(
        (domain) => domain.chainId === toChain.sygmaChainId
      )
      if (to == null) {
        throw new Error(`Network ${toChain.id} not supported`)
      }

      const transfer: Transfer<Fungible> = {
        sender: evmAccount,
        amount: {amount: '1000000000000'},
        from,
        to,
        resource: erc20Resource,
        recipient: destinationMultiLocation,
      }
      const fee = await assetTransfer.getFee(transfer)
      const transferTx = await assetTransfer.buildTransferTransaction(
        transfer,
        fee
      )

      return new Decimal(
        (await provider.getSigner().estimateGas(transferTx)).toString()
      )
    }
  )

  const {data: xTokensPartialFee} = useSWR(
    bridgeKind === 'polkadotXTokens' &&
      polkadotApi != null && [
        polkadotApi,
        fromChain.id,
        toChain.id,
        asset.id,
        isThroughKhala,
      ],
    xTokensPartialFeeFetcher
  )

  const {data: phalaPartialFee} = useSWR(
    (bridgeKind === 'phalaChainBridge' || bridgeKind === 'phalaSygma') &&
      polkadotApi != null && [
        polkadotApi,
        fromChain.id,
        toChain.id,
        asset.id,
        bridgeKind,
      ],
    phalaXTransferPartialFeeFetcher
  )

  const {data: polkadotXcmPartialFee} = useSWR(
    bridgeKind === 'polkadotXcm' &&
      polkadotApi != null && [polkadotApi, fromChain.id, toChain.id, asset.id],
    polkadotXcmTransferPartialFeeFetcher
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
    phalaPartialFee ??
    polkadotXcmPartialFee
  )
}
