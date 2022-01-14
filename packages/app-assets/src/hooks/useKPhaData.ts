import {useMemo} from 'react'
import {usePolkadotAccountAtom} from '@phala/app-store'
import {
  useBalance,
  useLockedBalance,
  usePolkadotAccountTransferrableBalanceDecimal,
} from '@phala/react-hooks'
import {toFixed} from '@phala/utils'
import {Decimal} from 'decimal.js'
import usePHAPrice from './usePHAPrice'

const useKPhaData = () => {
  const PHAPrice = usePHAPrice()
  const [polkadotAccount] = usePolkadotAccountAtom()
  const polkadotAccountAddress = polkadotAccount?.address
  const polkadotAccountBalance = useBalance(polkadotAccountAddress)
  const polkadotTransferBalanceDecimal =
    usePolkadotAccountTransferrableBalanceDecimal(polkadotAccountAddress)

  const {delegateBalance, crowdloanVestingBalance} = useLockedBalance(
    polkadotAccountAddress
  )

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
    if (!polkadotAccountBalanceNumber) return ''
    return toFixed(polkadotAccountBalanceNumber.mul(PHAPrice), 2)
  }, [polkadotAccountBalanceNumber, PHAPrice])

  const transferrableValue = useMemo(() => {
    if (!polkadotTransferBalanceDecimal) return '-'
    return `${toFixed(polkadotTransferBalanceDecimal)} PHA`
  }, [polkadotTransferBalanceDecimal])

  const delegateValue = useMemo(() => {
    if (!delegateBalance) return ''
    if (delegateBalance.equals(0)) return ''
    const delegateNumber = delegateBalance.div(10 ** 12)
    return `${toFixed(delegateNumber)} PHA`
  }, [delegateBalance])

  const crowdloanVestingValue = useMemo(() => {
    if (!crowdloanVestingBalance) return ''
    if (crowdloanVestingBalance.equals(0)) return ''
    const crowdloanVestingNumber = crowdloanVestingBalance.div(10 ** 12)
    return `${toFixed(crowdloanVestingNumber)} PHA`
  }, [crowdloanVestingBalance])

  return {
    name: 'K-PHA',
    icon: '/images/Phala.svg',
    balance: balanceValue,
    transferrable: transferrableValue,
    crowdloanVesting: crowdloanVestingValue,
    delegate: delegateValue,
    value: dollarValue,
  }
}

export default useKPhaData
