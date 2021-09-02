import {
  StakePool,
  Worker,
  useTokenomicParameters,
  useWorkers,
} from '@phala/react-hooks'
import Decimal from 'decimal.js'
import {useCallback, useMemo} from 'react'

const confidenceScoreMap = {1: 1, 2: 1, 3: 1, 4: 0.8, 5: 0.7}
const BLOCK_TIME = 12000
const ONE_YEAR = 365 * 24 * 60 * 60 * 1000

const getWorkerShare = (worker: Worker) => {
  const {miner, confidenceLevel} = worker
  if (!miner) return new Decimal(0)

  const {
    v,
    benchmark: {pInstant},
  } = miner
  const confidenceScore = confidenceScoreMap[confidenceLevel]
  const share = v
    .pow(2)
    .add(new Decimal(pInstant).mul(2).mul(confidenceScore).pow(2))
    .sqrt()

  return share
}

const useGetARP = () => {
  const {data: tokenomicParameters} = useTokenomicParameters()
  const {data: allWorkers} = useWorkers()
  const miningIdleWorkersShare = useMemo<Record<string, Decimal> | null>(() => {
    if (!allWorkers) return null
    return Object.fromEntries(
      allWorkers
        .filter((worker) => worker.miner?.state === 'MiningIdle')
        .map((worker) => [worker.pubkey, getWorkerShare(worker)])
    )
  }, [allWorkers])

  const totalShare = useMemo<Decimal | null>(() => {
    if (!miningIdleWorkersShare) return null
    return Object.values(miningIdleWorkersShare).reduce(
      (total, share) => total.add(share),
      new Decimal(0)
    )
  }, [miningIdleWorkersShare])

  return useCallback(
    (stakePool: StakePool): Decimal | null => {
      const {workers, payoutCommission, totalStake} = stakePool

      if (
        !tokenomicParameters ||
        !miningIdleWorkersShare ||
        !totalShare ||
        totalStake.isZero()
      ) {
        return null
      }
      const {budgetPerBlock, treasuryRatio} = tokenomicParameters

      const rewardRatio = workers.reduce((acc, cur) => {
        const share = miningIdleWorkersShare[cur]
        if (!share) return acc
        return acc.add(share.div(totalShare))
      }, new Decimal(0))

      return budgetPerBlock
        .mul(treasuryRatio.negated().add(1))
        .mul(rewardRatio)
        .mul(
          payoutCommission
            .div(10 ** 6)
            .negated()
            .add(1)
        )
        .mul(ONE_YEAR / BLOCK_TIME)
        .div(totalStake.div(10 ** 12))
    },
    [tokenomicParameters, miningIdleWorkersShare, totalShare]
  )
}

export default useGetARP
