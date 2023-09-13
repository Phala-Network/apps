import {createQuery} from '@tanstack/svelte-query'
import Decimal from 'decimal.js'
import {gql} from 'graphql-request'
import {phatSquidClient} from '~/lib/graphql'

type Data = {
  metaById: {
    cluster: number
    contract: number
    idleWorker: number
    pInit: number
    stake: string
    staker: number
    worker: number
  }
  squidStatus: {
    height: number
  }
}

type PhatData = {
  cluster: number
  contract: number
  idleWorker: number
  pInit: number
  stake: Decimal
  staker: number
  worker: number
  height: number
}

const transform = (data: Data) => {
  const {metaById, squidStatus} = data
  return {
    ...metaById,
    ...squidStatus,
    stake: new Decimal(metaById.stake),
  }
}

const fetchPhatData = async (): Promise<PhatData> => {
  const document = gql`
    {
      metaById(id: "0") {
        cluster
        contract
        idleWorker
        pInit
        stake
        staker
        worker
      }
      squidStatus {
        height
      }
    }
  `

  const data = await phatSquidClient.request<Data>(document)

  return transform(data)
}

export const getPhatContractData = () =>
  createQuery(['phatContract'], fetchPhatData)
