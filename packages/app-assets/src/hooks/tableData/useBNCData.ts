import {useMemo} from 'react'
import {usePolkadotAccountAtom} from '@phala/app-store'
import {useAssetBalance} from '@phala/react-hooks'
import {toFixed, formatCurrency} from '@phala/utils'
import {DataType} from '../../components/AssetList'
import useBNCPrice from '../useBNCPrice'

const TOKEN = 'BNC'

const useBNCData = (): DataType => {
  const BNCPrice = useBNCPrice()
  const [polkadotAccount] = usePolkadotAccountAtom()
  const polkadotAccountAddress = polkadotAccount?.address
  const balance = useAssetBalance(TOKEN, polkadotAccountAddress)

  const bncBalance = useMemo(() => {
    if (!balance) return ''
    const delegateNumber = balance.div(10 ** 12)
    return `${formatCurrency(delegateNumber, 4)} ${TOKEN}`
  }, [balance])

  const bncValue = useMemo(() => {
    if (!balance) return ''
    return toFixed(balance.div(10 ** 12).mul(BNCPrice), 2)
  }, [balance, BNCPrice])

  return {
    token: TOKEN,
    name: 'BNC',
    icon: 'https://assets.coingecko.com/coins/images/19259/small/bifrost.png?1634809529',
    balance: bncBalance,
    value: bncValue,
  }
}

export default useBNCData
