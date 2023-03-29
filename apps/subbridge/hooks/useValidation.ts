import {BridgeError} from '@/config/error'
import {
  amountAtom,
  assetAtom,
  bridgeErrorAtom,
  destChainTransactionFeeAtom,
  destinationAccountAtom,
  existentialDepositAtom,
  fromChainAtom,
  toChainAtom,
} from '@/store/bridge'
import {validateAddress} from '@phala/util'
import {useAtom, useAtomValue} from 'jotai'
import {useEffect} from 'react'
import {useBalance} from './useBalance'
import {useBridgeFee} from './useBridgeFee'
import {useBridgeLimit} from './useBridgeLimit'

export const useValidation = () => {
  const [, setBridgeError] = useAtom(bridgeErrorAtom)
  const [amount] = useAtom(amountAtom)
  const [fromChain] = useAtom(fromChainAtom)
  const [toChain] = useAtom(toChainAtom)
  const [asset] = useAtom(assetAtom)
  const [destinationAccount] = useAtom(destinationAccountAtom)
  const balance = useBalance()
  const bridgeFee = useBridgeFee()
  const destChainTransactionFee = useAtomValue(destChainTransactionFeeAtom)
  const existentialDeposit = useAtomValue(existentialDepositAtom)
  const bridgeLimit = useBridgeLimit()

  useEffect(() => {
    let unmounted = false
    const validate = async (): Promise<BridgeError | null> => {
      return null
      if (!amount) {
        return 'InvalidAmount'
      }
      if (
        !destinationAccount ||
        (toChain.kind === 'polkadot' && !validateAddress(destinationAccount)) ||
        (toChain.kind === 'evm' &&
          !(
            (await import('ethers')).utils.isAddress(destinationAccount) &&
            destinationAccount.startsWith('0x')
          ))
      ) {
        return 'InvalidAccount'
      }
      if (!balance || balance.lt(amount)) {
        return 'InsufficientBalance'
      }

      let minAmount = destChainTransactionFee.add(existentialDeposit)
      if (bridgeFee) {
        minAmount = minAmount.add(bridgeFee)
      }

      if (minAmount.gte(amount)) {
        return 'AmountTooSmall'
      }

      if (!bridgeLimit || bridgeLimit.lt(amount)) {
        return 'InsufficientReserve'
      }

      if (
        (fromChain.id === 'astar' || fromChain.id === 'shiden') &&
        asset.id === 'pha' &&
        amount &&
        balance.eq(amount)
      ) {
        return 'MinBalanceLimit'
      }

      return null
    }

    validate().then((error) => {
      if (!unmounted) {
        setBridgeError(error)
      }
    })

    return () => {
      unmounted = true
    }
  }, [
    setBridgeError,
    destinationAccount,
    amount,
    balance,
    toChain.kind,
    bridgeFee,
    destChainTransactionFee,
    existentialDeposit,
    bridgeLimit,
    fromChain.id,
    toChain.id,
    asset.id,
  ])
}
