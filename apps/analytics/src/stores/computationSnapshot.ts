import {weightedAverage} from '@phala/lib'
import {createQuery} from '@tanstack/svelte-query'
import {addDays, addHours, isBefore, isEqual} from 'date-fns'
import Decimal from 'decimal.js'
import {gql} from 'graphql-request'
import {khalaSquidClient, phalaSquidClient} from '~/lib/graphql'

type Data = {
  globalStateSnapshotsConnection: {
    edges: {
      node: {
        averageApr: string
        delegatorCount: number
        idleWorkerCount: number
        totalValue: string
        updatedTime: string
        averageBlockTime: number
        budgetPerShare: string
        cumulativeRewards: string
        idleWorkerShares: string
        workerCount: number
      }
    }[]
  }
}

type Snapshot = {
  averageApr: Decimal
  delegatorCount: number
  idleWorkerCount: number
  totalValue: Decimal
  updatedTime: Date
  averageBlockTime: number
  budgetPerShare: Decimal
  cumulativeRewards: Decimal
  idleWorkerShares: Decimal
  workerCount: number
}

type Summary = Omit<Snapshot, 'averageBlockTime'>

type ComputationSnapshot = {
  phala: Snapshot[]
  khala: Snapshot[]
  summary: Summary[]
}

const transform = (data: Data): Snapshot[] => {
  const {
    globalStateSnapshotsConnection: {edges},
  } = data
  return edges.map(({node}) => {
    return {
      ...node,
      updatedTime: new Date(node.updatedTime),
      totalValue: new Decimal(node.totalValue),
      averageApr: new Decimal(node.averageApr),
      cumulativeRewards: new Decimal(node.cumulativeRewards),
      budgetPerShare: new Decimal(node.budgetPerShare),
      idleWorkerShares: new Decimal(node.idleWorkerShares),
    }
  })
}

const fetchComputationSnapshot = async (): Promise<ComputationSnapshot> => {
  const days = 90
  const startTime = addDays(new Date(), -days)
  const document = gql`
    {
      globalStateSnapshotsConnection(
        orderBy: updatedTime_ASC
        where: {updatedTime_gte: ${JSON.stringify(startTime.toISOString())}}
      ) {
        edges {
          node {
            averageApr
            delegatorCount
            idleWorkerCount
            totalValue
            updatedTime
            averageBlockTime
            budgetPerShare
            cumulativeRewards
            idleWorkerShares
            workerCount
          }
        }
      }
    }
  `

  const [phalaData, khalaData] = await Promise.all([
    phalaSquidClient.request<Data>(document),
    khalaSquidClient.request<Data>(document),
  ])

  const phala = transform(phalaData)
  const khala = transform(khalaData)
  const summary: Summary[] = []

  for (let i = 0; i < phala.length; i++) {
    const p = phala[i]
    const k = khala[i]
    if (
      p == null ||
      k == null ||
      p.updatedTime.getTime() !== k.updatedTime.getTime() ||
      Object.keys(p).length < 10 ||
      Object.keys(k).length < 10
    ) {
      continue
    }
    const totalValue = Decimal.sum(p.totalValue, k.totalValue)
    summary.push({
      totalValue,
      averageApr: weightedAverage([
        [p.averageApr, p.totalValue],
        [k.averageApr, k.totalValue],
      ]),
      cumulativeRewards: Decimal.sum(p.cumulativeRewards, k.cumulativeRewards),
      workerCount: p.workerCount + k.workerCount,
      idleWorkerCount: p.idleWorkerCount + k.idleWorkerCount,
      idleWorkerShares: Decimal.sum(p.idleWorkerShares, k.idleWorkerShares),
      delegatorCount: p.delegatorCount + k.delegatorCount,
      budgetPerShare: weightedAverage([
        [p.budgetPerShare, p.idleWorkerShares],
        [k.budgetPerShare, k.idleWorkerShares],
      ]),
      updatedTime: p.updatedTime,
    })
  }

  return {phala, khala, summary}
}

export const getComputationSnapshot = () =>
  createQuery({
    queryKey: ['computationSnapshot'],
    queryFn: fetchComputationSnapshot,
  })
