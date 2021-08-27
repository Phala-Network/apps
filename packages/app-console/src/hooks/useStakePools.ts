import {useQuery, UseQueryResult} from 'react-query'
import Decimal from 'decimal.js'
import {useApiPromise} from '@phala/react-libs/esm/polkadot/hooks/useApiPromise'
import {usePolkadotAccountAtom} from '@phala/app-store'
import {isDev} from '@phala/utils'

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
  payoutCommission: number | null
  pid: number
  releasingStake: Decimal
  rewardAcc: Decimal
  totalShares: Decimal
  totalStake: Decimal
  withdrawQueue: {user: string; shares: Decimal; startTime: number}[]
  workers: string[]
}

const useStakePools = (): UseQueryResult<StakePool[] | null> => {
  const {api, initialized} = useApiPromise()
  const [polkadotAccount] = usePolkadotAccountAtom()
  return useQuery(
    ['stakePools', initialized, polkadotAccount?.address],
    async () =>
      api && polkadotAccount?.address
        ? api.query.phalaStakePool?.stakePools
            ?.entries()
            .then((entries) =>
              entries.map((entry) => entry[1].toJSON() as StakePoolJSON)
            )
            .then((data) =>
              data
                ?.filter(
                  ({owner}) => isDev() || owner === polkadotAccount?.address
                )
                .sort((a, b) => a.pid - b.pid)
                .map((json) => {
                  return {
                    ...json,
                    cap: json.cap === null ? null : new Decimal(json.cap),
                    freeStake: new Decimal(json.freeStake),
                    ownerReward: new Decimal(json.ownerReward),
                    releasingStake: new Decimal(json.releasingStake),
                    rewardAcc: new Decimal(json.rewardAcc).div(
                      new Decimal(2).pow(64)
                    ),
                    totalShares: new Decimal(json.totalShares),
                    totalStake: new Decimal(json.totalStake),
                    withdrawQueue: json.withdrawQueue.map((queue) => ({
                      ...queue,
                      shares: new Decimal(queue.shares),
                    })),
                  }
                })
            )
        : null,
    {refetchOnMount: false}
  )
}

export default useStakePools
