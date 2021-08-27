import {useQuery, UseQueryResult} from 'react-query'
import Decimal from 'decimal.js'
import {useApiPromise} from '@phala/react-libs/esm/polkadot/hooks/useApiPromise'

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
  miner: Miner
  pid: number
  stake: Decimal | null
}

type Miner = Omit<MinerJSON, 'v' | 've'> & {v: Decimal; ve: Decimal}

const useWorkers: (
  workerList: {pubkey: string; pid: number}[]
) => UseQueryResult<Worker[] | null> = (workerList) => {
  const {api, initialized} = useApiPromise()
  const workerPubkeyList = workerList.map(({pubkey}) => pubkey)
  return useQuery(
    ['workers', initialized, workerPubkeyList],
    async () => {
      if (!api) return null
      const [workers = [], bindings = []] = await Promise.all([
        api.query.phalaRegistry?.workers
          ?.multi(workerPubkeyList)
          .then((res) => res.map((x) => x.toJSON() as WorkerJSON)),
        api.query.phalaMining?.workerBindings
          ?.multi(workerPubkeyList)
          .then((res) => res.map((x) => x.toJSON() as string)),
      ])

      const [miners = [], stakes = []] = await Promise.all([
        api.query.phalaMining?.miners?.multi(bindings).then((res) =>
          res.map((x): Miner => {
            const json = x.toJSON() as MinerJSON

            return {
              ...json,
              v: new Decimal(json.v).div(new Decimal(2).pow(64)),
              ve: new Decimal(json.ve).div(new Decimal(2).pow(64)),
            }
          })
        ),
        api.query.phalaMining?.stakes?.multi(bindings).then((res) =>
          res.map((x) => {
            const value = x.toJSON()
            if (typeof value === 'string') return new Decimal(value)
            return value
          })
        ),
      ])

      return workerList
        .map((worker, index) => ({
          ...worker,
          ...workers[index],
          miner: miners[index],
          stake: stakes[index],
        }))
        .sort((a, b) => {
          return b.miner?.v.greaterThanOrEqualTo(a.miner?.v || 0) ? 1 : -1
        })
    },
    {refetchOnMount: false}
  )
}

export default useWorkers
