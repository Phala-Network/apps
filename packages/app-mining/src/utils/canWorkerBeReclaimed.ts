import type {Worker} from '../hooks/useWorkers'

export const canWorkerBeReclaimed = (worker: Worker): boolean => {
  const {state, coolDownStart = 0} = worker.miner || {}
  return (
    state === 'MiningCoolingDown' &&
    new Date().getTime() / 1000 - coolDownStart >= 7 * 24 * 60 * 60 // 7 days CD
  )
}
