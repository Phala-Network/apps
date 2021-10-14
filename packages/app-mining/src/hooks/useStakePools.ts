import {useQuery, UseQueryResult} from 'react-query'
import {useApiPromise} from '@phala/react-libs'
import Decimal from 'decimal.js'

type StakePoolJSON = {
  cap: string | null
  freeStake: string
  owner: string
  ownerReward: string
  payoutCommission: number | null
  pid: number
  releasingStake: string
  rewardAcc: string
  totalShares: string
  totalStake: string
  withdrawQueue: {user: string; shares: string; startTime: number}[]
  workers: string[]
}

export type StakePool = {
  cap: Decimal | null
  freeStake: Decimal
  owner: string
  ownerReward: Decimal
  payoutCommission: Decimal
  pid: number
  releasingStake: Decimal
  rewardAcc: Decimal
  totalShares: Decimal
  totalStake: Decimal
  withdrawQueue: {user: string; shares: Decimal; startTime: number}[]
  workers: string[]
}

type Options = {
  select: (stakePools: StakePool[] | null) => StakePool[] | null
  enabled?: boolean
}

const useStakePools = (
  options?: Options
): UseQueryResult<StakePool[] | null> => {
  const {api, endpoint} = useApiPromise()

  return useQuery(
    ['stakePools', endpoint],
    async () => {
      if (!api) return null
      const stakePools = await api.query.phalaStakePool?.stakePools
        ?.entries()
        .then((entries) =>
          entries.map((entry) => entry[1].toJSON() as StakePoolJSON)
        )

      if (!stakePools) return null

      return stakePools
        .sort((a, b) => a.pid - b.pid)
        .map((json) => {
          return {
            ...json,
            cap: json.cap === null ? null : new Decimal(json.cap),
            freeStake: new Decimal(json.freeStake),
            ownerReward: new Decimal(json.ownerReward),
            payoutCommission: new Decimal(json.payoutCommission || 0),
            releasingStake: new Decimal(json.releasingStake),
            rewardAcc: new Decimal(json.rewardAcc).div(new Decimal(2).pow(64)),
            totalShares: new Decimal(json.totalShares),
            totalStake: new Decimal(json.totalStake),
            withdrawQueue: json.withdrawQueue.map((queue) => ({
              ...queue,
              shares: new Decimal(queue.shares),
            })),
          }
        })
    },

    {refetchOnMount: false, ...options}
  )
}

export default useStakePools
