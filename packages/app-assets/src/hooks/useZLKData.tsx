import {useMemo} from 'react'
import {usePolkadotAccountAtom} from '@phala/app-store'
import {Decimal} from 'decimal.js'
import {useAssetBalance} from '@phala/react-hooks'
import {formatCurrency} from '@phala/utils'

const TOKEN = 'ZLK'

const useZLKData = () => {
  const [polkadotAccount] = usePolkadotAccountAtom()
  const polkadotAccountAddress = polkadotAccount?.address
  const balance = useAssetBalance(TOKEN, polkadotAccountAddress)

  const zlkBalance = useMemo(() => {
    if (!balance) return ''
    const delegateNumber = balance.div(10 ** 12)
    return `${formatCurrency(delegateNumber, 4)} ${TOKEN}`
  }, [balance])

  return {
    token: 'ZLK',
    name: 'ZLK',
    icon: 'https://assets.coingecko.com/coins/images/20884/small/zenlink.PNG?1637824309',
    balance: zlkBalance,
    value: new Decimal(2).toString(),
  }
}

export default useZLKData
