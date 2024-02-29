import {createQuery} from '@tanstack/svelte-query'

interface PhalaCirculation {
  circulation: string
  crowdloan: string
  reward: string
  sygmaBridge: string
  timestamp: string
  totalIssuance: string
}

interface EthereumCirculation {
  circulation: string
  phalaChainBridge: string
  khalaChainBridge: string
  reward: string
  sygmaBridge: string
  timestamp: string
  totalSupply: string
}

interface CirculationData {
  phala: PhalaCirculation
  khala: PhalaCirculation
  ethereum: EthereumCirculation
  totalCirculation: string
}

const fetchCirculationData = async () => {
  const res = await fetch('https://pha-circulation-server.vercel.app/api/all')
  const data = (await res.json()) as CirculationData
  return data
}

export const getCirculation = () =>
  createQuery({queryKey: ['circulation'], queryFn: fetchCirculationData})
