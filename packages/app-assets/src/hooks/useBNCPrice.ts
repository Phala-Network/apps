import axios from 'axios'
import {useEffect, useState} from 'react'

type BNCPriceResponse = {
  price: number
}

const useBNCPrice = (): number => {
  const [price, setPrice] = useState(0)

  useEffect(() => {
    axios
      .get<BNCPriceResponse>(
        'https://app-misc-api.phala.network/coin_market_charts/BNC'
      )
      .then(({data}) => {
        if (data) {
          setPrice(data.price)
        }
      })
  }, [])

  return price
}

export default useBNCPrice
