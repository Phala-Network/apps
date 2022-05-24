import {transferByXTokens} from '@/lib/transferByXTokens'
import {transferFromEthereumToKhala} from '@/lib/transferFromEthereum'
import {transferFromKhala} from '@/lib/transferFromKhala'
import {transferFromMoonriver} from '@/lib/transferFromMoonriver'
import {
  amountAtom,
  assetAtom,
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
import {useEthersContract} from './useEthersContract'
import {useCurrentPolkadotApi, usePolkadotApi} from './usePolkadotApi'

export const useTransfer = () => {
  const bridgeContract = useEthersContract('bridgeContract')
  const asset = useAtomValue(assetAtom)
  const fromChain = useAtomValue(fromChainAtom)
  const toChain = useAtomValue(toChainAtom)
  const destinationAccount = useAtomValue(destinationAccountAtom)
  const amount = useAtomValue(amountAtom)
  const decimals = useAtomValue(decimalsAtom)
  const polkadotAccount = useAtomValue(polkadotAccountAtom)
  const khalaApi = usePolkadotApi(
    fromChain.id === 'thala' || toChain.id === 'thala' ? 'thala' : 'khala'
  )
  const polkadotApi = useCurrentPolkadotApi()
  const isFromEthereumToKhala =
    (fromChain.id === 'ethereum' && toChain.id === 'khala') ||
    (fromChain.id === 'kovan' && toChain.id === 'thala')
  const isFromKhala = fromChain.id === 'thala' || fromChain.id === 'khala'
  const isTransferringByXTokens =
    fromChain.id === 'karura' ||
    fromChain.id === 'karura-test' ||
    fromChain.id === 'bifrost' ||
    fromChain.id === 'bifrost-test'
  const isFromMoonriver =
    fromChain.id === 'moonriver' || fromChain.id === 'moonbase-alpha'

  const rawAmount = useMemo(
    () =>
      amount
        ? new Decimal(amount).times(Decimal.pow(10, decimals)).toFixed()
        : '0',
    [amount, decimals]
  )

  if (isFromEthereumToKhala) {
    return async () => {
      const resourceId = asset.bridgeContract?.[fromChain.id]?.resourceId
      if (
        !bridgeContract ||
        !khalaApi ||
        !amount ||
        fromChain.kind !== 'evm' ||
        !resourceId
      ) {
        throw new Error('Transfer missing required parameters')
      }

      return transferFromEthereumToKhala({
        contract: bridgeContract,
        khalaApi,
        destinationChainId: 1,
        resourceId,
        destinationAccount,
        amount: rawAmount,
      })
    }
  }

  if (isTransferringByXTokens) {
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

  if (isFromKhala) {
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

  if (isFromMoonriver) {
    return async () => {
      if (!bridgeContract) {
        throw new Error('Transfer missing required parameters')
      }

      return transferFromMoonriver({
        contract: bridgeContract,
        assetId: asset.id,
        amount: rawAmount,
        destinationAccount,
        toChainId: toChain.id,
      })
    }
  }
}
