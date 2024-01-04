import {createQuery} from '@tanstack/svelte-query'
import Decimal from 'decimal.js'

const fetchCirculationData = async () => {
  const res = await fetch(
    'https://pha-circulation-server.vercel.app/api/circulation',
  )
  const amount = await res.text()
  if (amount != null) {
    return new Decimal(amount)
  }
}

export const getCirculation = () =>
  createQuery(['circulation'], fetchCirculationData)
