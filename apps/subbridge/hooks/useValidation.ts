import type {BridgeError} from '@/config/error'
import {
  amountAtom,
  assetAtom,
  bridgeErrorAtom,
  bridgeInfoAtom,
  destChainTransactionFeeAtom,
  destinationAccountAtom,
  existentialDepositAtom,
  fromChainAtom,
  toChainAtom,
} from '@/store/bridge'
import {validateAddress} from '@phala/lib'
import {ethers} from 'ethers'
import {useAtom, useAtomValue} from 'jotai'
import {useEffect} from 'react'
import {useBalance} from './useBalance'
import {useBridgeFee} from './useBridgeFee'
import {useBridgeLimit} from './useBridgeLimit'

export const useValidation = (): void => {
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
  const [bridge] = useAtom(bridgeInfoAtom)

  useEffect(() => {
    let unmounted = false
    const validate = async (): Promise<BridgeError | null> => {
      if (bridge.disabled) {
        return 'Disabled'
      }
      if (amount.length === 0) {
        return 'InvalidAmount'
      }
      if (
        destinationAccount.length === 0 ||
        (toChain.kind === 'substrate' &&
          !validateAddress(destinationAccount)) ||
        (toChain.kind === 'evm' &&
          !(
            ethers.utils.isAddress(destinationAccount) &&
            destinationAccount.startsWith('0x')
          ))
      ) {
        return 'InvalidAccount'
      }
      if (balance == null || balance.lt(amount)) {
        return 'InsufficientBalance'
      }

      let minAmount = destChainTransactionFee.add(existentialDeposit)
      if (bridgeFee != null) {
        minAmount = minAmount.add(bridgeFee)
      }

      if (minAmount.gte(amount)) {
        return 'AmountTooSmall'
      }

      if (bridgeLimit == null || bridgeLimit.lt(amount)) {
        return 'InsufficientReserve'
      }

      if (
        (fromChain.id === 'astar' || fromChain.id === 'shiden') &&
        asset.id === 'pha' &&
        amount.length > 0 &&
        balance.eq(amount)
      ) {
        return 'MinBalanceLimit'
      }

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
    toChain.kind,
    bridgeFee,
    destChainTransactionFee,
    existentialDeposit,
    bridgeLimit,
    fromChain.id,
    asset.id,
    bridge.disabled,
  ])
}
