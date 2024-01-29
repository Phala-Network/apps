import {createQuery} from '@tanstack/svelte-query'
import {addDays} from 'date-fns'
import {gql} from 'graphql-request'
import {phatOffchainClient} from '~/lib/graphql'

interface ExecutionData {
  dt: string
  executionCount: number
  userCount: number
}

const fetchPhatOffchainData = async () => {
  const days = 30
  const startTime = addDays(new Date(), -days).toISOString()
  const document = gql`
    {
      phatOfflineExecution(
        orderBy: {dt: ASC}
        where: {dt: {_gte: "${startTime}"}}
      ) {
        dt
        executionCount
        userCount
      }
    }
  `

  const data = await phatOffchainClient.request<{
    phatOfflineExecution: ExecutionData[]
  }>(document)

  return data.phatOfflineExecution.map((e) => ({
    ...e,
    dt: new Date(e.dt),
  }))
}

export const getPhatOffchainData = () =>
  createQuery({
    queryKey: ['phatContractOffchain'],
    queryFn: fetchPhatOffchainData,
  })
