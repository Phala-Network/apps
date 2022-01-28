import axios from 'axios'
import {useEffect, useState} from 'react'

type ZLKPriceResponse = {
  price: number
}

const useZLKPrice = (): number => {
  const [price, setPrice] = useState(0)

  useEffect(() => {
    axios
      .get<ZLKPriceResponse>(
        'https://app-misc-api.phala.network/coin_market_charts/ZLK'
      )
      .then(({data}) => {
        if (data) {
          setPrice(data.price)
        }
      })
  }, [])

  return price
}

export default useZLKPrice
