import {Decimal} from 'decimal.js'
import {useMemo} from 'react'
import useTransferrableBalance from './useTransferrableBalance'

export function usePolkadotAccountTransferrableBalanceDecimal(
  address?: string
): Decimal | undefined {
  const polkadotAccountBalance = useTransferrableBalance(address)

  const polkadotAccountBalanceNumber = useMemo(
    () =>
      polkadotAccountBalance &&
      new Decimal(polkadotAccountBalance.toString()).div(10 ** 12),
    [polkadotAccountBalance]
  )

  return polkadotAccountBalanceNumber
}
