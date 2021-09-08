import {useApiPromise} from '@phala/react-libs'
import Decimal from 'decimal.js'
import {useQuery, UseQueryResult} from 'react-query'

type WorkerJSON = {
  confidenceLevel: 1 | 2 | 3 | 4 | 5
  ecdhPubkey: string
  features: number[]
  initialScore: number
  lastUpdated: number
  operator: string
  pubkey: string
  runtimeVersion: number
}

type MinerJSON = {
  benchmark: {
    pInstant: number
    pInit: number
    iterations: number
    miningStartTime: number
    updatedAt: number
  }
  coolDownStart: number
  state:
    | 'Ready'
    | 'MiningIdle'
    | 'MiningActive'
    | 'MiningUnresponsive'
    | 'MiningCoolingDown'
  stats: {totalReward: number}
  v: string
  vUpdatedAt: number
  ve: string
}

export type Worker = WorkerJSON & {
  miner: Miner | null
  stake: Decimal | null
}

type Miner = Omit<MinerJSON, 'v' | 've'> & {v: Decimal; ve: Decimal}

const useWorkers = (pubkeyList?: string[]): UseQueryResult<Worker[] | null> => {
  const {api, endpoint} = useApiPromise()
  return useQuery(
    ['workers', endpoint, pubkeyList],
    async () => {
      if (!api) return null
      const keyList =
        pubkeyList ||
        (await api.query.phalaRegistry?.workers?.keys())?.map(
          (key) => key.args[0]?.toJSON() as string
        ) ||
        []

      const [workers = [], workerBindings = []] = await Promise.all([
        api.query.phalaRegistry?.workers
          ?.multi(keyList)
          .then((res) => res.map((x) => x.toJSON() as WorkerJSON)),
        api.query.phalaMining?.workerBindings
          ?.multi(keyList)
          .then((res) => res.map((x) => x.toJSON() as string)),
      ])

      const bindings = [...new Set(workerBindings.filter(Boolean))]

      const [miners = {}, stakes = {}] = await Promise.all([
        api.query.phalaMining?.miners?.multi(bindings).then((res) =>
          Object.fromEntries(
            res.map((x, index): [string, Miner] => {
              const json = x.toJSON() as MinerJSON

              return [
                bindings[index] as string,
                {
                  ...json,
                  v: new Decimal(json.v).div(new Decimal(2).pow(64)),
                  ve: new Decimal(json.ve).div(new Decimal(2).pow(64)),
                },
              ]
            })
          )
        ),
        api.query.phalaMining?.stakes?.multi(bindings).then((res) =>
          Object.fromEntries(
            res.map((x, index) => {
              const value = x.toJSON()
              return [
                bindings[index] as string,
                typeof value === 'number' || typeof value === 'string'
                  ? new Decimal(value)
                  : null,
              ]
            })
          )
        ),
      ])

      return workers
        .map((worker, index) => {
          const binding = workerBindings[index]
          const miner = binding ? miners[binding] : null
          const stake = binding ? stakes[binding] : null
          return {
            ...worker,
            miner,
            stake,
          }
        })
        .sort((a, b) => {
          return b.miner?.v.greaterThanOrEqualTo(a.miner?.v || 0) ? 1 : -1
        })
    },
    {refetchOnMount: false}
  )
}

export default useWorkers
