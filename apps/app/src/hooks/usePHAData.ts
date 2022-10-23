import {
  useBalance,
  useLockedBalance,
  usePolkadotAccountTransferrableBalanceDecimal,
} from '@phala/react-hooks'
import {useCurrentAccount} from '@phala/store'
import {formatCurrency, toFixed} from '@phala/utils'
import {Decimal} from 'decimal.js'
import {useMemo} from 'react'
import {useCurrentNetworkNode} from '../store/networkNode'
import usePHAPrice from './usePHAPrice'

const usePHAData = () => {
  const PHAPrice = usePHAPrice()
  const [currentAccount] = useCurrentAccount()
  const [currentNetworkNode] = useCurrentNetworkNode()
  const polkadotAccountAddress = currentAccount?.address
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
    return `${formatCurrency(polkadotAccountBalanceNumber, 4)} PHA`
  }, [polkadotAccountBalanceNumber])

  const dollarValue = useMemo(() => {
    if (!polkadotAccountBalanceNumber || !PHAPrice) return ''
    return toFixed(polkadotAccountBalanceNumber.mul(PHAPrice), 2)
  }, [polkadotAccountBalanceNumber, PHAPrice])

  const transferrableValue = useMemo(() => {
    if (!polkadotTransferBalanceDecimal) return '-'
    return `${formatCurrency(polkadotTransferBalanceDecimal, 4)} PHA`
  }, [polkadotTransferBalanceDecimal])

  const delegateValue = useMemo(() => {
    if (!delegateBalance) return ''
    if (delegateBalance.equals(0)) return ''
    const delegateNumber = delegateBalance.div(10 ** 12)
    return `${formatCurrency(delegateNumber, 4)} PHA`
  }, [delegateBalance])

  const crowdloanVestingValue = useMemo(() => {
    if (!crowdloanVestingBalance) return ''
    if (crowdloanVestingBalance.equals(0)) return ''
    const crowdloanVestingNumber = crowdloanVestingBalance.div(10 ** 12)
    return `${formatCurrency(crowdloanVestingNumber, 4)} PHA`
  }, [crowdloanVestingBalance])

  return {
    name: currentNetworkNode.kind === 'phala' ? 'PHA' : 'K-PHA',
    icon: '/images/phala.svg',
    balance: balanceValue,
    transferrable: transferrableValue,
    crowdloanVesting: crowdloanVestingValue,
    delegate: delegateValue,
    value: dollarValue,
  }
}

export default usePHAData
