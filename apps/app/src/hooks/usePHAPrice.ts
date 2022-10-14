import {useQuery} from '@tanstack/react-query'
import axios from 'axios'

type PHAPriceResponse = {
  price: number
}

const usePHAPrice = (): number | undefined => {
  const {data} = useQuery(['PHAPrice'], () =>
    axios
      .get<PHAPriceResponse>(
        'https://app-misc-api.phala.network/coin_market_charts/PHA'
      )
      .then(({data}) => data.price)
  )

  return data
}

export default usePHAPrice
