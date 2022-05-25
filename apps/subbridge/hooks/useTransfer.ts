import {transferByXTokens} from '@/lib/transferByXTokens'
import {transferFromEthereumToKhala} from '@/lib/transferFromEthereum'
import {transferFromKhala} from '@/lib/transferFromKhala'
import {transferFromMoonriver} from '@/lib/transferFromMoonriver'
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
      const resourceId = asset.chainBridgeResourceId
      if (
        !ethersChainBridgeContract ||
        !khalaApi ||
        !amount ||
        fromChain.kind !== 'evm' ||
        !resourceId
      ) {
        throw new Error('Transfer missing required parameters')
      }

      return transferFromEthereumToKhala({
        contract: ethersChainBridgeContract,
        khalaApi,
        destinationChainId: 1,
        resourceId,
        destinationAccount,
        amount: rawAmount,
      })
    }
  }

  if (bridgeKind === 'polkadotXTokens') {
    return async (statusCb?: Callback<ISubmittableResult>) => {
      if (!polkadotApi || !polkadotAccount?.wallet?.signer) {
        throw new Error('Transfer missing required parameters')
      }
      return transferByXTokens({
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

      const extrinsic = transferFromKhala({
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

      return transferFromMoonriver({
        contract: ethersXTokensBridgeContract,
        assetId: asset.id,
        amount: rawAmount,
        destinationAccount,
        toChainId: toChain.id,
      })
    }
  }
}
