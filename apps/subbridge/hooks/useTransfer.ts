import {transferFromEthereumToKhala} from '@/lib/transferFromEthereum'
import {transferFromKarura} from '@/lib/transferFromKarura'
import {transferFromKhala} from '@/lib/transferFromKhala'
import {
  amountAtom,
  assetAtom,
  decimalsAtom,
  destinationAccountAtom,
  fromChainAtom,
  toChainAtom,
} from '@/store/bridge'
import {polkadotAccountAtom} from '@phala/store'
import Decimal from 'decimal.js'
import {useAtomValue} from 'jotai'
import {useMemo} from 'react'
import {useEthersContract} from './useEthersContract'
import {usePolkadotApi} from './usePolkadotApi'

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
  const karuraApi = usePolkadotApi(
    fromChain.id === 'karura-test' || toChain.id === 'karura-test'
      ? 'karura-test'
      : 'karura'
  )
  const isFromEthereumToKhala =
    (fromChain.id === 'ethereum' && toChain.id === 'khala') ||
    (fromChain.id === 'rinkeby' && toChain.id === 'thala')
  const isFromKhala = fromChain.id === 'thala' || fromChain.id === 'khala'
  const isFromKarura =
    fromChain.id === 'karura' || fromChain.id === 'karura-test'

  const rawAmount = useMemo(
    () =>
      amount
        ? new Decimal(amount).times(Decimal.pow(10, decimals)).toString()
        : '0',
    [amount, decimals]
  )

  if (isFromEthereumToKhala) {
    return async () => {
      if (
        !bridgeContract ||
        !khalaApi ||
        !amount ||
        !asset.bridgeContract ||
        fromChain.kind !== 'evm'
      ) {
        return
      }

      return transferFromEthereumToKhala({
        contract: bridgeContract,
        khalaApi,
        destinationChainId: 1,
        resourceId: asset.bridgeContract[fromChain.evmChainId].resourceId,
        destinationAccount,
        amount: rawAmount,
      })
    }
  }

  if (isFromKarura) {
    return async () => {
      if (
        !karuraApi ||
        !asset.karuraToken ||
        !amount ||
        toChain.kind !== 'polkadot' ||
        !polkadotAccount?.wallet?.signer
      ) {
        return
      }
      return transferFromKarura({
        karuraApi,
        token: asset.karuraToken,
        amount: rawAmount,
        paraId: toChain.paraId,
        destinationAccount,
      }).signAndSend(polkadotAccount.address, {
        signer: polkadotAccount.wallet.signer,
      })
    }
  }

  if (isFromKhala) {
    return async () => {
      if (!khalaApi || !polkadotAccount?.wallet?.signer) return

      const extrinsic = transferFromKhala({
        khalaApi,
        toChainId: toChain.id,
        amount: rawAmount,
        destinationAccount,
        assetId: asset.id,
      })

      if (extrinsic) {
        return extrinsic.signAndSend(polkadotAccount.address, {
          signer: polkadotAccount.wallet.signer,
        })
      }
    }
  }

  return null
}
