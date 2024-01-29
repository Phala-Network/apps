import {createQuery} from '@tanstack/svelte-query'

interface CirculationData {
  ethereumTotalSupply: string
  ethereumMiningRewards: string
  ethereumPhalaChainbridge: string
  ethereumKhalaChainbridge: string
  ethereumSygmaBridge: string
  ethereumCirculation: string
  phalaTotalIssuance: string
  phalaMiningRewards: string
  phalaCrowdloan: string
  phalaChainbridge: string
  phalaSygmaBridge: string
  phalaCirculation: string
  khalaTotalIssuance: string
  khalaMiningRewards: string
  khalaCrowdloan: string
  khalaChainbridge: string
  khalaSygmaBridge: string
  khalaCirculation: string
  totalCirculation: string
  lastUpdate: number
}

const fetchCirculationData = async () => {
  const res = await fetch('https://pha-circulation-server.vercel.app/api/all')
  const data = (await res.json()) as CirculationData
  return data
}

export const getCirculation = () =>
  createQuery({queryKey: ['circulation'], queryFn: fetchCirculationData})
