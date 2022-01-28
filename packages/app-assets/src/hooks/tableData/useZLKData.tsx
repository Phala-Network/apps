import {useMemo} from 'react'
import {usePolkadotAccountAtom} from '@phala/app-store'
import {useAssetBalance} from '@phala/react-hooks'
import {toFixed, formatCurrency} from '@phala/utils'
import {DataType} from '../../components/AssetList'
import useZLKPrice from '../useZLKPrice'

const TOKEN = 'ZLK'

const useZLKData = (): DataType => {
  const ZLKPrice = useZLKPrice()
  const [polkadotAccount] = usePolkadotAccountAtom()
  const polkadotAccountAddress = polkadotAccount?.address
  const balance = useAssetBalance(TOKEN, polkadotAccountAddress)

  const zlkBalance = useMemo(() => {
    if (!balance) return ''
    const delegateNumber = balance.div(10 ** 12)
    return `${formatCurrency(delegateNumber, 4)} ${TOKEN}`
  }, [balance])

  const zlkValue = useMemo(() => {
    if (!balance) return ''
    return toFixed(balance.mul(ZLKPrice), 2)
  }, [balance, ZLKPrice])

  return {
    token: 'ZLK',
    name: 'ZLK',
    icon: 'https://assets.coingecko.com/coins/images/20884/small/zenlink.PNG?1637824309',
    balance: zlkBalance,
    value: zlkValue,
  }
}

export default useZLKData
