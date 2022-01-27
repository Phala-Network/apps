// import {usePolkadotAccountAtom} from '@phala/app-store'
import {Decimal} from 'decimal.js'

const useBNCData = () => {
  // const [polkadotAccount] = usePolkadotAccountAtom()
  // const polkadotAccountAddress = polkadotAccount?.address

  return {
    name: 'ZLK',
    icon: 'https://assets.coingecko.com/coins/images/20884/small/zenlink.PNG?1637824309',
    balance: '1.00',
    value: new Decimal(2).toString(),
  }
}

export default useBNCData
