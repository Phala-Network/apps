import {useMemo} from 'react'
import {usePolkadotAccountAtom} from '@phala/app-store'
import {useBalance} from '@phala/react-hooks'
import {toFixed} from '@phala/utils'
import {Decimal} from 'decimal.js'
import usePHAPrice from './usePHAPrice'

const useKPhaData = () => {
  const PHAPrice = usePHAPrice()
  const [polkadotAccount] = usePolkadotAccountAtom()
  const polkadotAccountAddress = polkadotAccount?.address
  const polkadotAccountBalance = useBalance(polkadotAccountAddress)

  // NOTE: copied from InputDataStep.tsx
  const polkadotAccountBalanceNumber = useMemo<Decimal | undefined>(
    () =>
      polkadotAccountBalance &&
      new Decimal(polkadotAccountBalance.toString()).div(10 ** 12),
    [polkadotAccountBalance]
  )

  const balanceValue = useMemo(() => {
    if (!polkadotAccountBalanceNumber) return '-'
    return `${toFixed(polkadotAccountBalanceNumber)} PHA`
  }, [polkadotAccountBalanceNumber])

  const dollarValue = useMemo(() => {
    if (!polkadotAccountBalanceNumber) return '-'
    return `$ ${toFixed(polkadotAccountBalanceNumber.mul(PHAPrice), 2)}`
  }, [polkadotAccountBalanceNumber, PHAPrice])

  return {
    name: 'K-PHA',
    icon: '/images/Phala.svg',
    balance: balanceValue,
    transferrable: '36666.2333 PHA',
    crowdloanVesting: '36666.2333 PHA',
    delegate: '36666.2333 PHA',
    value: dollarValue,
    isKPHA: true,
  }
}

export default useKPhaData
