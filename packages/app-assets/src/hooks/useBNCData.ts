// import {usePolkadotAccountAtom} from '@phala/app-store'
import {Decimal} from 'decimal.js'

const useBNCData = () => {
  // const [polkadotAccount] = usePolkadotAccountAtom()
  // const polkadotAccountAddress = polkadotAccount?.address

  return {
    name: 'BNC',
    icon: 'https://assets.coingecko.com/coins/images/19259/small/bifrost.png?1634809529',
    balance: '0.00',
    value: new Decimal(2).toString(),
  }
}

export default useBNCData
