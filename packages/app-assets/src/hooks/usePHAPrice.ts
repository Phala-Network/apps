import axios from 'axios'
import {useQuery} from 'react-query'

type PHAPriceResponse = {
  price: number
}

const usePHAPrice = (): number | undefined => {
  return useQuery('PHAPrice', () =>
    axios
      .get<PHAPriceResponse>(
        'https://app-misc-api.phala.network/coin_market_charts/PHA'
      )
      .then(({data}) => data.price)
  ).data
}

export default usePHAPrice
