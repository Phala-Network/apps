import {transferByChainBridge} from '@/lib/transferByChainBridge'
import {transferByEvmXTokens} from '@/lib/transferByEvmXTokens'
import {transferByKhalaXTransfer} from '@/lib/transferByKhalaXTransfer'
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
import {polkadotAccountAtom} from '@phala/store'
import {Callback, ISubmittableResult} from '@polkadot/types/types'
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
  const {kind: bridgeKind} = useAtomValue(bridgeInfoAtom)
  const khalaApi = usePolkadotApi(
    fromChain.id === 'thala' || toChain.id === 'thala' ? 'thala' : 'khala'
  )
  const polkadotApi = useCurrentPolkadotApi()

  const rawAmount = useMemo(
    () =>
      amount
        ? new Decimal(amount).times(Decimal.pow(10, decimals)).toFixed()
        : '0',
    [amount, decimals]
  )

  if (bridgeKind === 'evmChainBridge') {
    return async () => {
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
      })
    }
  }

  if (bridgeKind === 'polkadotXTokens') {
    return async (statusCb?: Callback<ISubmittableResult>) => {
      if (!polkadotApi || !polkadotAccount?.wallet?.signer) {
        throw new Error('Transfer missing required parameters')
      }
      return transferByPolkadotXTokens({
        polkadotApi,
        assetId: asset.id,
        amount: rawAmount,
        fromChainId: fromChain.id,
        toChainId: toChain.id,
        destinationAccount,
      }).signAndSend(
        polkadotAccount.address,
        {
          signer: polkadotAccount.wallet.signer,
        },
        statusCb
      )
    }
  }

  if (bridgeKind === 'khalaXTransfer') {
    return async (statusCb?: Callback<ISubmittableResult>) => {
      if (!khalaApi || !polkadotAccount?.wallet?.signer) {
        throw new Error('Transfer missing required parameters')
      }

      const extrinsic = transferByKhalaXTransfer({
        khalaApi,
        toChainId: toChain.id,
        amount: rawAmount,
        destinationAccount,
        assetId: asset.id,
      })

      if (extrinsic) {
        return extrinsic.signAndSend(
          polkadotAccount.address,
          {
            signer: polkadotAccount.wallet.signer,
          },
          statusCb
        )
      }
    }
  }

  if (bridgeKind === 'evmXTokens') {
    return async () => {
      if (!ethersXTokensBridgeContract) {
        throw new Error('Transfer missing required parameters')
      }

      return transferByEvmXTokens({
        contract: ethersXTokensBridgeContract,
        assetId: asset.id,
        amount: rawAmount,
        destinationAccount,
        toChainId: toChain.id,
        decimals,
      })
    }
  }
}
