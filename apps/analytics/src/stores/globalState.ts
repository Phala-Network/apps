import {weightedAverage} from '@phala/util'
import {createQuery} from '@tanstack/svelte-query'
import Decimal from 'decimal.js'
import {gql} from 'graphql-request'
import {khalaSquidClient, phalaSquidClient} from '~/lib/graphql'

type Data = {
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

type State = {
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

type GlobalState = {
  phala: State
  khala: State
  summary: Omit<State, 'height' | 'averageBlockTime'>
}

const transform = (data: Data) => {
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

const fetchGlobalState = async (): Promise<GlobalState> => {
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
    phalaSquidClient.request<Data>(document),
    khalaSquidClient.request<Data>(document),
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

export const getGlobalState = () =>
  createQuery(['globalState'], fetchGlobalState)
