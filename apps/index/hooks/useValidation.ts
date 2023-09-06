import {type Error} from '@/config/error'
import {
  destinationAccountAtom,
  errorAtom,
  fromAmountAtom,
  fromAssetAtom,
  fromChainAtom,
  toAssetAtom,
  toChainAtom,
} from '@/store/core'
import {validateAddress} from '@phala/util'
import {useAtom} from 'jotai'
import {useEffect} from 'react'
import {useBalance} from './useBalance'
import useSolution from './useSolution'

export const useValidation = (): void => {
  const [fromChain] = useAtom(fromChainAtom)
  const [fromAsset] = useAtom(fromAssetAtom)
  const [toChain] = useAtom(toChainAtom)
  const [toAsset] = useAtom(toAssetAtom)
  const [, setBridgeError] = useAtom(errorAtom)
  const [amount] = useAtom(fromAmountAtom)
  const {data: solutions} = useSolution()

  const [destinationAccount] = useAtom(destinationAccountAtom)
  const balance = useBalance()
  // const destChainTransactionFee = useAtomValue(destChainTransactionFeeAtom)

  useEffect(() => {
    let unmounted = false
    const validate = async (): Promise<Error | null> => {
      if (amount.length === 0) {
        return 'InvalidAmount'
      }

      if (solutions == null) {
        return 'NoSolutions'
      }

      if (fromAsset?.id === toAsset?.id && fromChain?.id === toChain?.id) {
        return 'InvalidRoute'
      }

      if (
        destinationAccount.length === 0 ||
        (toChain?.chainType === 'Sub' &&
          !validateAddress(destinationAccount)) ||
        (toChain?.chainType === 'Evm' &&
          !(
            (await import('ethers')).isAddress(destinationAccount) &&
            destinationAccount.startsWith('0x')
          ))
      ) {
        return 'InvalidAccount'
      }

      if (balance == null || balance.lt(amount)) {
        return 'InsufficientBalance'
      }

      // const minAmount = destChainTransactionFee.add(existentialDeposit)

      // if (minAmount.gte(amount)) {
      //   return 'AmountTooSmall'
      // }

      // if (
      //   fromChain.id === 'astar' &&
      //   asset.id === 'pha' &&
      //   amount.length > 0 &&
      //   balance.eq(amount)
      // ) {
      //   return 'MinBalanceLimit'
      // }

      return null
    }

    void validate().then((error) => {
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
    solutions,
    fromAsset?.id,
    toAsset?.id,
    fromChain?.id,
    toChain?.id,
    toChain?.chainType,
  ])
}
