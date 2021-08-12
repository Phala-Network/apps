import { usePolkadotAccountAtom } from '@phala/app-store'
import { Decimal } from 'decimal.js'
import { useMemo } from 'react'
import { useBalance } from './useBalance'

export default function usePolkadotAccountBalanceDecimal(): Decimal {
  const [polkadotAccount] = usePolkadotAccountAtom()

  const polkadotAccountBalance = useBalance(polkadotAccount?.address)

  const polkadotAccountBalanceNumber = useMemo(
    () =>
      polkadotAccountBalance
        ? new Decimal(polkadotAccountBalance.toString()).div(10 ** 12)
        : new Decimal(-1),
    [polkadotAccountBalance]
  )

  return polkadotAccountBalanceNumber
}
