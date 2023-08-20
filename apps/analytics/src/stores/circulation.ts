import {createQuery} from '@tanstack/svelte-query'
import Decimal from 'decimal.js'

interface CirculationData {
  data?: {circulations?: {nodes?: [{amount: string}?]}}
}

const fetchCirculationData = async () => {
  const res = await fetch(
    'https://api.subquery.network/sq/Phala-Network/khala-chainbridge__UGhhb?query=%7Bcirculations(first:1,orderBy:BLOCK_HEIGHT_DESC)%7Bnodes%7Bamount%7D%7D%7D',
  )
  const data = (await res.json()) as CirculationData
  const amount = data.data?.circulations?.nodes?.[0]?.amount
  if (amount != null) {
    return new Decimal(amount).div(1e12)
  }
}

export const getCirculation = () =>
  createQuery(['circulation'], fetchCirculationData)
