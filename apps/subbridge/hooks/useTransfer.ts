import {transferByChainBridge} from '@/lib/transferByChainBridge'
import {transferByEvmXTokens} from '@/lib/transferByEvmXTokens'
import {transferByKhalaXTransfer} from '@/lib/transferByKhalaXTransfer'
import {transferByPolkadotXcm} from '@/lib/transferByPolkadotXcm'
import {transferByPolkadotXTokens} from '@/lib/transferByPolkadotXTokens'
import {
  amountAtom,
  assetAtom,
  bridgeInfoAtom,
  decimalsAtom,
  destinationAccountAtom,
  fromChainAtom,
  toChainAtom,
} from '@/store/bridge'
import {waitSignAndSend} from '@phala/react-libs'
import {polkadotAccountAtom} from '@phala/store'
import Decimal from 'decimal.js'
import {useAtomValue} from 'jotai'
import {useMemo} from 'react'
import {
  useEthersChainBridgeContract,
  useEthersXTokensContract,
} from './useEthersContract'
import {useCurrentPolkadotApi, usePolkadotApi} from './usePolkadotApi'

export const useTransfer = () => {
  const ethersChainBridgeContract = useEthersChainBridgeContract()
  const ethersXTokensBridgeContract = useEthersXTokensContract()
  const asset = useAtomValue(assetAtom)
  const fromChain = useAtomValue(fromChainAtom)
  const toChain = useAtomValue(toChainAtom)
  const destinationAccount = useAtomValue(destinationAccountAtom)
  const amount = useAtomValue(amountAtom)
  const decimals = useAtomValue(decimalsAtom)
  const polkadotAccount = useAtomValue(polkadotAccountAtom)
  const {kind: bridgeKind, isThroughKhala} = useAtomValue(bridgeInfoAtom)
  const khalaApi = usePolkadotApi(
    toChain.id === 'phala' || toChain.id === 'thala' ? toChain.id : 'khala'
  )
  const polkadotApi = useCurrentPolkadotApi()

  const rawAmount = useMemo(
    () =>
      amount
        ? new Decimal(amount).times(Decimal.pow(10, decimals)).toFixed()
        : '0',
    [amount, decimals]
  )

  return ({onReady}: {onReady: () => void}) => {
    if (bridgeKind === 'evmChainBridge') {
      if (!ethersChainBridgeContract || !khalaApi) {
        throw new Error('Transfer missing required parameters')
      }

      return transferByChainBridge({
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
      if (!polkadotApi || !polkadotAccount?.wallet?.signer) {
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
      return waitSignAndSend({
        api: polkadotApi,
        extrinsic,
        account: polkadotAccount.address,
        signer: polkadotAccount.wallet.signer,
        onReady,
      })
    }

    if (bridgeKind === 'khalaXTransfer') {
      if (!polkadotApi || !polkadotAccount?.wallet?.signer) {
        throw new Error('Transfer missing required parameters')
      }

      const extrinsic = transferByKhalaXTransfer({
        api: polkadotApi,
        fromChainId: fromChain.id,
        toChainId: toChain.id,
        amount: rawAmount,
        destinationAccount,
        assetId: asset.id,
      })

      if (extrinsic) {
        return waitSignAndSend({
          api: polkadotApi,
          extrinsic,
          signer: polkadotAccount.wallet.signer,
          account: polkadotAccount.address,
          onReady,
        })
      }
    }

    if (bridgeKind === 'evmXTokens') {
      if (!ethersXTokensBridgeContract) {
        throw new Error('Transfer missing required parameters')
      }

      return transferByEvmXTokens({
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
      if (!polkadotApi || !polkadotAccount?.wallet?.signer) {
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
      return waitSignAndSend({
        api: polkadotApi,
        extrinsic,
        account: polkadotAccount.address,
        signer: polkadotAccount.wallet.signer,
        onReady,
      })
    }

    throw new Error('Invalid bridge kind')
  }
}
