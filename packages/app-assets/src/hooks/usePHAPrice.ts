import axios from 'axios'
import {useEffect, useState} from 'react'

type PHAPriceResponse = {
  price: number
}

const usePHAPrice = (): number => {
  const [price, setPrice] = useState(0)

  // FIXME: use latest api
  useEffect(() => {
    axios
      .get<PHAPriceResponse>(
        'https://app-misc-api.phala.network/coin_market_charts/PHA'
      )
      .then(({data}) => {
        if (data) {
          setPrice(data.price)
        }
      })
  }, [])

  return price
}

export default usePHAPrice
