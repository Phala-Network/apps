import {transferEvmSygma} from '@/lib/transferByEvmSygma'
import {transferByEvmXTokens} from '@/lib/transferByEvmXTokens'
import {transferByPhalaXTransfer} from '@/lib/transferByPhalaXTransfer'
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
import {evmAccountAtom} from '@/store/ethers'
import type {DepositEvent} from '@buildwithsygma/sygma-contracts/dist/ethers/Bridge'
import {type ExtrinsicResult, waitSignAndSend} from '@phala/lib'
import {polkadotAccountAtom} from '@phala/store'
import {type ContractTransaction, ethers} from 'ethers'
import {useAtomValue} from 'jotai'
import {useMemo} from 'react'
import {useEthersXTokensContract} from './useEthersContract'
import {useEthersWeb3Provider} from './useEthersProvider'
import {useCurrentPolkadotApi} from './usePolkadotApi'

export const useTransfer = (): (({
  onReady,
}: {
  onReady: () => void
}) => Promise<
  ContractTransaction | ExtrinsicResult | DepositEvent | undefined
>) => {
  const ethersWeb3Provider = useEthersWeb3Provider()
  const ethersXTokensBridgeContract = useEthersXTokensContract()
  const asset = useAtomValue(assetAtom)
  const fromChain = useAtomValue(fromChainAtom)
  const toChain = useAtomValue(toChainAtom)
  const destinationAccount = useAtomValue(destinationAccountAtom)
  const amount = useAtomValue(amountAtom)
  const decimals = useAtomValue(decimalsAtom)
  const evmAccount = useAtomValue(evmAccountAtom)
  const polkadotAccount = useAtomValue(polkadotAccountAtom)
  const bridge = useAtomValue(bridgeInfoAtom)
  const polkadotApi = useCurrentPolkadotApi()

  const atomicUnitAmount = useMemo(
    () =>
      amount !== ''
        ? ethers.utils.parseUnits(amount, decimals).toString()
        : '0',
    [amount, decimals],
  )

  return async ({onReady}: {onReady: () => void}) => {
    if (bridge.kind === 'polkadotXTokens') {
      if (polkadotApi == null || polkadotAccount?.wallet?.signer == null) {
        throw new Error('Transfer missing required parameters')
      }
      const extrinsic = transferByPolkadotXTokens({
        polkadotApi,
        assetId: asset.id,
        amount: atomicUnitAmount,
        fromChainId: fromChain.id,
        toChainId: toChain.id,
        destinationAccount,
        proxy: bridge.proxy,
      })
      return await waitSignAndSend({
        api: polkadotApi,
        extrinsic,
        account: polkadotAccount.address,
        signer: polkadotAccount.wallet.signer,
        onReady,
      })
    }

    if (bridge.kind === 'phalaXTransfer' || bridge.kind === 'phalaSygma') {
      if (polkadotApi == null || polkadotAccount?.wallet?.signer == null) {
        throw new Error('Transfer missing required parameters')
      }

      const extrinsic = transferByPhalaXTransfer({
        api: polkadotApi,
        fromChainId: fromChain.id,
        toChainId: toChain.id,
        amount: atomicUnitAmount,
        destinationAccount,
        assetId: asset.id,
        kind: bridge.kind,
      })

      return await waitSignAndSend({
        api: polkadotApi,
        extrinsic,
        signer: polkadotAccount.wallet.signer,
        account: polkadotAccount.address,
        onReady,
      })
    }

    if (bridge.kind === 'evmXTokens') {
      if (ethersXTokensBridgeContract == null) {
        throw new Error('Transfer missing required parameters')
      }

      return await transferByEvmXTokens({
        contract: ethersXTokensBridgeContract,
        assetId: asset.id,
        amount: atomicUnitAmount,
        destinationAccount,
        fromChainId: fromChain.id,
        toChainId: toChain.id,
        decimals,
      }).then((transaction) => {
        onReady()
        return transaction
      })
    }

    if (bridge.kind === 'evmSygma') {
      if (ethersWeb3Provider == null || evmAccount == null) {
        throw new Error('Transfer missing required parameters')
      }
      return await transferEvmSygma({
        provider: ethersWeb3Provider,
        sender: evmAccount,
        amount: atomicUnitAmount,
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
