import { Decimal } from 'decimal.js'
import { useAtom } from 'jotai'
import { useMemo } from 'react'
import polkadotAccountAtom from '../atoms/polkadotAccountAtom'
import { useBalance } from './useBalance'

export default function usePolkadotAccountBalanceDecimal(): Decimal {
  const [polkadotAccount] = useAtom(polkadotAccountAtom)

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
