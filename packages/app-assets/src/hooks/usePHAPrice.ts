import axios from 'axios'
import { useQuery } from 'react-query'

type PHAPriceResponse = {
  price: number
}

const usePHAPrice = (): number => {
  // FIXME: use latest api
  const { data } = useQuery('PHAPrice', () =>
    axios.get<PHAPriceResponse>(
      'https://crowdloan-api.phala.network/coin_market_charts/PHA'
    )
  )

  return data?.data.price || 0
}

export default usePHAPrice
