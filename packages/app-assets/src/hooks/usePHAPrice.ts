import axios from 'axios'
import {useEffect, useState} from 'react'

type PHAPriceResponse = {
  price: string
}

const usePHAPrice = (): number => {
  const [price, setPrice] = useState(0)

  // FIXME: use latest api
  useEffect(() => {
    axios
      .get<PHAPriceResponse>(
        'https://api.binance.com/api/v3/ticker/price?symbol=PHAUSDT'
      )
      .then(({data}) => {
        if (data) {
          setPrice(Number(data.price))
        }
      })
  }, [])

  return price
}

export default usePHAPrice
