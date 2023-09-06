import {weightedAverage} from '@phala/util'
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

type StateSnapshot = {
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

type Summary = Omit<StateSnapshot, 'averageBlockTime'>

type GlobalStateSnapshot = {
  phala: StateSnapshot[]
  khala: StateSnapshot[]
  summary: Summary[]
}

const transform = (data: Data, updatedTimeArray: string[]): StateSnapshot[] => {
  const {
    globalStateSnapshotsConnection: {edges},
  } = data
  const raw: StateSnapshot[] = edges.map(({node}) => {
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

  return updatedTimeArray.map((dateString) => {
    const date = new Date(dateString)
    const node = raw.findLast(({updatedTime}) => {
      return isEqual(updatedTime, date) || isBefore(updatedTime, date)
    }) as StateSnapshot
    return {...node, updatedTime: date}
  })
}

const fetchGlobalStateSnapshot = async (): Promise<GlobalStateSnapshot> => {
  const days = 7
  const intervalHours = 6
  const startTime = addDays(new Date(), -days)
  startTime.setUTCHours(0, 0, 0, 0)
  const updatedTimeArray: string[] = []
  for (let i = 0; i < days * (24 / intervalHours); i++) {
    updatedTimeArray.push(addHours(startTime, i * intervalHours).toISOString())
  }
  const document = gql`
    {
      globalStateSnapshotsConnection(
        orderBy: updatedTime_ASC
        where: {updatedTime_in: ${JSON.stringify(updatedTimeArray)}}
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

  const phala = transform(phalaData, updatedTimeArray)
  const khala = transform(khalaData, updatedTimeArray)
  const summary: Summary[] = []

  for (let i = 0; i < phala.length; i++) {
    const p = phala[i]
    const k = khala[i]
    if (
      p == null ||
      k == null ||
      p.updatedTime.getTime() !== k.updatedTime.getTime()
    ) {
      break
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

export const getGlobalStateSnapshot = () =>
  createQuery(['globalStateSnapshot'], fetchGlobalStateSnapshot)
