import {useMemo} from 'react'
import {usePolkadotAccountAtom} from '@phala/app-store'
import {Decimal} from 'decimal.js'
import {useBNCBalance} from '@phala/react-hooks'
import {formatCurrency} from '@phala/utils'

const useBNCData = () => {
  const [polkadotAccount] = usePolkadotAccountAtom()
  const polkadotAccountAddress = polkadotAccount?.address
  const balance = useBNCBalance(polkadotAccountAddress)

  const bncBalance = useMemo(() => {
    if (!balance) return ''
    const delegateNumber = balance.div(10 ** 12)
    return `${formatCurrency(delegateNumber, 4)} BNC`
  }, [balance])

  return {
    name: 'BNC',
    icon: 'https://assets.coingecko.com/coins/images/19259/small/bifrost.png?1634809529',
    balance: bncBalance,
    value: new Decimal(2).toString(),
  }
}

export default useBNCData
