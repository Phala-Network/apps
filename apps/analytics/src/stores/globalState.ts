import {weightedAverage} from '@phala/util'
import Decimal from 'decimal.js'
import {gql} from 'graphql-request'
import {readable} from 'svelte/store'
import {khalaSquidClient, phalaSquidClient} from '~/lib/graphql'

const noop = () => {}

type GlobalStateData = {
  globalStateById: {
    totalValue: string
    averageApr: string
    averageBlockTime: number
    cumulativeRewards: string
    workerCount: number
    idleWorkerCount: number
    idleWorkerShares: string
    budgetPerShare: string
    delegatorCount: number
  }
  squidStatus: {
    height: number
  }
}

type GlobalState = {
  totalValue: Decimal
  averageApr: Decimal
  averageBlockTime: number
  cumulativeRewards: Decimal
  workerCount: number
  idleWorkerCount: number
  idleWorkerShares: Decimal
  budgetPerShare: Decimal
  delegatorCount: number
  height: number
}

export type GlobalStateStore = {
  phala: GlobalState | null
  khala: GlobalState | null
  summary: Omit<GlobalState, 'height' | 'averageBlockTime'> | null
}

const transform = (data: GlobalStateData) => {
  const {globalStateById, squidStatus} = data
  return {
    ...globalStateById,
    ...squidStatus,
    totalValue: new Decimal(globalStateById.totalValue),
    averageApr: new Decimal(globalStateById.averageApr),
    cumulativeRewards: new Decimal(globalStateById.cumulativeRewards),
    budgetPerShare: new Decimal(globalStateById.budgetPerShare),
    idleWorkerShares: new Decimal(globalStateById.idleWorkerShares),
  }
}

const fetchGlobalState = async (): Promise<GlobalStateStore> => {
  const document = gql`
    {
      globalStateById(id: "0") {
        totalValue
        averageApr
        averageBlockTime
        cumulativeRewards
        workerCount
        idleWorkerCount
        idleWorkerShares
        budgetPerShare
        delegatorCount
      }
      squidStatus {
        height
      }
    }
  `

  const [phalaData, khalaData] = await Promise.all([
    phalaSquidClient.request<GlobalStateData>(document),
    khalaSquidClient.request<GlobalStateData>(document),
  ])

  const phala = transform(phalaData)
  const khala = transform(khalaData)
  const totalValue = Decimal.sum(phala.totalValue, khala.totalValue)
  const summary = {
    totalValue,
    averageApr: weightedAverage([
      [phala.averageApr, phala.totalValue],
      [khala.averageApr, khala.totalValue],
    ]),
    cumulativeRewards: Decimal.sum(
      phala.cumulativeRewards,
      khala.cumulativeRewards,
    ),
    workerCount: phala.workerCount + khala.workerCount,
    idleWorkerCount: phala.idleWorkerCount + khala.idleWorkerCount,
    idleWorkerShares: Decimal.sum(
      phala.idleWorkerShares,
      khala.idleWorkerShares,
    ),
    delegatorCount: phala.delegatorCount + khala.delegatorCount,
    budgetPerShare: weightedAverage([
      [phala.budgetPerShare, phala.idleWorkerShares],
      [khala.budgetPerShare, khala.idleWorkerShares],
    ]),
  }

  return {phala, khala, summary}
}

export const globalStateStore = readable<GlobalStateStore>(
  {
    phala: null,
    khala: null,
    summary: null,
  },
  (set) => {
    fetchGlobalState().then(set)

    return noop
  },
)
