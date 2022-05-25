import {BridgeError} from '@/config/error'
import {
  amountAtom,
  bridgeErrorAtom,
  destChainTransactionFeeAtom,
  destinationAccountAtom,
  existentialDepositAtom,
  toChainAtom,
} from '@/store/bridge'
import {validateAddress} from '@phala/utils'
import {useAtom, useAtomValue} from 'jotai'
import {useEffect} from 'react'
import {useBalance} from './useBalance'
import {useBridgeFee} from './useBridgeFee'

export const useValidation = () => {
  const [, setBridgeError] = useAtom(bridgeErrorAtom)
  const [amount] = useAtom(amountAtom)
  const [toChain] = useAtom(toChainAtom)
  const [destinationAccount] = useAtom(destinationAccountAtom)
  const balance = useBalance()
  const bridgeFee = useBridgeFee()
  const destChainTransactionFee = useAtomValue(destChainTransactionFeeAtom)
  const existentialDeposit = useAtomValue(existentialDepositAtom)

  useEffect(() => {
    let unmounted = false
    const validate = async (): Promise<BridgeError | null> => {
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
  ])
}
