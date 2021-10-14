import {useTokenomicParameters} from '@phala/react-hooks'
import useWorkers, {Worker} from './useWorkers'
import type {StakePool} from './useStakePools'
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
  const {data: tokenomicParameters, isLoading: isTokenomicParametersLoading} =
    useTokenomicParameters()
  const {data: allWorkers, isLoading: isWorkersLoading} = useWorkers()
  const miningIdleWorkersEntry = useMemo<Record<string, Worker> | null>(() => {
    if (!allWorkers) return null
    return Object.fromEntries(
      allWorkers
        .filter((worker) => worker.miner?.state === 'MiningIdle')
        .map((worker) => [worker.pubkey, worker])
    )
  }, [allWorkers])

  const miningIdleWorkersShare = useMemo<Record<string, Decimal> | null>(() => {
    if (!miningIdleWorkersEntry) return null
    return Object.fromEntries(
      Object.entries(miningIdleWorkersEntry).map(([pubkey, worker]) => [
        pubkey,
        getWorkerShare(worker),
      ])
    )
  }, [miningIdleWorkersEntry])

  const totalShare = useMemo<Decimal | null>(() => {
    if (!miningIdleWorkersShare) return null
    return Object.values(miningIdleWorkersShare).reduce(
      (total, share) => total.add(share),
      new Decimal(0)
    )
  }, [miningIdleWorkersShare])

  const getProportion = useCallback(
    (stakePool: StakePool): Decimal | null => {
      const {workers, totalStake} = stakePool
      if (!miningIdleWorkersShare || !totalShare || totalStake.isZero()) {
        return null
      }

      return workers.reduce((acc, cur) => {
        const share = miningIdleWorkersShare[cur]
        if (!share) return acc
        return acc.add(share.div(totalShare))
      }, new Decimal(0))
    },
    [miningIdleWorkersShare, totalShare]
  )

  const getAPR = useCallback(
    (stakePool: StakePool): Decimal | null => {
      const {workers, payoutCommission, totalStake} = stakePool

      if (
        !tokenomicParameters ||
        !miningIdleWorkersEntry ||
        !miningIdleWorkersShare ||
        !totalShare ||
        totalStake.isZero()
      ) {
        return null
      }
      const {budgetPerBlock, treasuryRatio} = tokenomicParameters

      const rewardPerBlock = workers.reduce((acc, pubkey) => {
        const worker = miningIdleWorkersEntry[pubkey]
        if (!worker) return acc

        const share = miningIdleWorkersShare[pubkey] as Decimal
        const workerReward = share.div(totalShare).mul(budgetPerBlock)
        const v = worker.miner?.v as Decimal
        const maxReward = v.mul(0.0002).div((60 * 60 * 1000) / BLOCK_TIME)

        return acc.add(Decimal.min(workerReward, maxReward))
      }, new Decimal(0))

      return rewardPerBlock
        .mul(treasuryRatio.negated().add(1))
        .mul(
          payoutCommission
            .div(10 ** 6)
            .negated()
            .add(1)
        )
        .mul(ONE_YEAR / BLOCK_TIME)
        .div(totalStake.div(10 ** 12))
    },
    [
      tokenomicParameters,
      miningIdleWorkersShare,
      miningIdleWorkersEntry,
      totalShare,
    ]
  )

  return {
    getAPR,
    getProportion,
    isLoading: isTokenomicParametersLoading || isWorkersLoading,
  }
}

export default useGetARP
