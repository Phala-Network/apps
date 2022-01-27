import {useMemo} from 'react'
import {usePolkadotAccountAtom} from '@phala/app-store'
import {Decimal} from 'decimal.js'
import {useAssetBalance} from '@phala/react-hooks'
import {formatCurrency} from '@phala/utils'

const TOKEN = 'BNC'

const useBNCData = () => {
  const [polkadotAccount] = usePolkadotAccountAtom()
  const polkadotAccountAddress = polkadotAccount?.address
  const balance = useAssetBalance(TOKEN, polkadotAccountAddress)

  const bncBalance = useMemo(() => {
    if (!balance) return ''
    const delegateNumber = balance.div(10 ** 12)
    return `${formatCurrency(delegateNumber, 4)} ${TOKEN}`
  }, [balance])

  return {
    token: TOKEN,
    name: 'BNC',
    icon: 'https://assets.coingecko.com/coins/images/19259/small/bifrost.png?1634809529',
    balance: bncBalance,
    value: new Decimal(2).toString(),
  }
}

export default useBNCData
