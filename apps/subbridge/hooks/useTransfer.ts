import {transferByChainBridge} from '@/lib/transferByChainBridge'
import {transferEvmSygma} from '@/lib/transferByEvmSygma'
import {transferByEvmXTokens} from '@/lib/transferByEvmXTokens'
import {transferByPhalaXTransfer} from '@/lib/transferByPhalaXTransfer'
import {transferByPolkadotXTokens} from '@/lib/transferByPolkadotXTokens'
import {transferByPolkadotXcm} from '@/lib/transferByPolkadotXcm'
import {
  amountAtom,
  assetAtom,
  bridgeInfoAtom,
  decimalsAtom,
  destinationAccountAtom,
  fromChainAtom,
  toChainAtom,
} from '@/store/bridge'
import {evmAccountAtom} from '@/store/ethers'
import {type DepositEvent} from '@buildwithsygma/sygma-contracts/dist/ethers/Bridge'
import {waitSignAndSend, type ExtrinsicResult} from '@phala/lib'
import {polkadotAccountAtom} from '@phala/store'
import Decimal from 'decimal.js'
import {type ContractTransaction} from 'ethers'
import {useAtomValue} from 'jotai'
import {useMemo} from 'react'
import {
  useEthersChainBridgeContract,
  useEthersXTokensContract,
} from './useEthersContract'
import {useEthersWeb3Provider} from './useEthersProvider'
import {useCurrentPolkadotApi, usePolkadotApi} from './usePolkadotApi'

export const useTransfer = (): (({
  onReady,
}: {
  onReady: () => void
}) => Promise<
  ContractTransaction | ExtrinsicResult | DepositEvent | undefined
>) => {
  const ethersWeb3Provider = useEthersWeb3Provider()
  const ethersChainBridgeContract = useEthersChainBridgeContract()
  const ethersXTokensBridgeContract = useEthersXTokensContract()
  const asset = useAtomValue(assetAtom)
  const fromChain = useAtomValue(fromChainAtom)
  const toChain = useAtomValue(toChainAtom)
  const destinationAccount = useAtomValue(destinationAccountAtom)
  const amount = useAtomValue(amountAtom)
  const decimals = useAtomValue(decimalsAtom)
  const evmAccount = useAtomValue(evmAccountAtom)
  const polkadotAccount = useAtomValue(polkadotAccountAtom)
  const {kind: bridgeKind, isThroughKhala} = useAtomValue(bridgeInfoAtom)
  const khalaApi = usePolkadotApi(
    toChain.id === 'phala' || toChain.id === 'thala' ? toChain.id : 'khala'
  )
  const polkadotApi = useCurrentPolkadotApi()

  const rawAmount = useMemo(
    () =>
      amount !== ''
        ? new Decimal(amount).times(Decimal.pow(10, decimals)).toFixed()
        : '0',
    [amount, decimals]
  )

  return async ({onReady}: {onReady: () => void}) => {
    if (bridgeKind === 'evmChainBridge') {
      if (ethersChainBridgeContract == null || khalaApi == null) {
        throw new Error('Transfer missing required parameters')
      }

      return await transferByChainBridge({
        contract: ethersChainBridgeContract,
        khalaApi,
        assetId: asset.id,
        destinationAccount,
        amount: rawAmount,
        toChainId: toChain.id,
      }).then((transaction) => {
        onReady()
        return transaction
      })
    }

    if (bridgeKind === 'polkadotXTokens') {
      if (polkadotApi == null || polkadotAccount?.wallet?.signer == null) {
        throw new Error('Transfer missing required parameters')
      }
      const extrinsic = transferByPolkadotXTokens({
        polkadotApi,
        assetId: asset.id,
        amount: rawAmount,
        fromChainId: fromChain.id,
        toChainId: toChain.id,
        destinationAccount,
        isThroughKhala,
      })
      return await waitSignAndSend({
        api: polkadotApi,
        extrinsic,
        account: polkadotAccount.address,
        signer: polkadotAccount.wallet.signer,
        onReady,
      })
    }

    if (bridgeKind === 'phalaChainBridge' || bridgeKind === 'phalaSygma') {
      if (polkadotApi == null || polkadotAccount?.wallet?.signer == null) {
        throw new Error('Transfer missing required parameters')
      }

      const extrinsic = transferByPhalaXTransfer({
        api: polkadotApi,
        fromChainId: fromChain.id,
        toChainId: toChain.id,
        amount: rawAmount,
        destinationAccount,
        assetId: asset.id,
        kind: bridgeKind,
      })

      return await waitSignAndSend({
        api: polkadotApi,
        extrinsic,
        signer: polkadotAccount.wallet.signer,
        account: polkadotAccount.address,
        onReady,
      })
    }

    if (bridgeKind === 'evmXTokens') {
      if (ethersXTokensBridgeContract == null) {
        throw new Error('Transfer missing required parameters')
      }

      return await transferByEvmXTokens({
        contract: ethersXTokensBridgeContract,
        assetId: asset.id,
        amount: rawAmount,
        destinationAccount,
        fromChainId: fromChain.id,
        toChainId: toChain.id,
        decimals,
      }).then((transaction) => {
        onReady()
        return transaction
      })
    }

    if (bridgeKind === 'polkadotXcm') {
      if (polkadotApi == null || polkadotAccount?.wallet?.signer == null) {
        throw new Error('Transfer missing required parameters')
      }
      const extrinsic = transferByPolkadotXcm({
        polkadotApi,
        assetId: asset.id,
        amount: rawAmount,
        fromChainId: fromChain.id,
        toChainId: toChain.id,
        destinationAccount,
      })
      return await waitSignAndSend({
        api: polkadotApi,
        extrinsic,
        account: polkadotAccount.address,
        signer: polkadotAccount.wallet.signer,
        onReady,
      })
    }

    if (bridgeKind === 'evmSygma') {
      if (ethersWeb3Provider == null || evmAccount == null) {
        throw new Error('Transfer missing required parameters')
      }
      return await transferEvmSygma({
        provider: ethersWeb3Provider,
        sender: evmAccount,
        amount: rawAmount,
        fromChainId: fromChain.id,
        toChainId: toChain.id,
        destinationAccount,
        assetId: asset.id,
        onReady,
      })
    }

    throw new Error('Invalid bridge kind')
  }
}
