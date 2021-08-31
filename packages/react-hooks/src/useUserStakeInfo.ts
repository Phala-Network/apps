import Decimal from 'decimal.js'
import {useQuery, UseQueryResult} from 'react-query'
import {useApiPromise} from '@phala/react-libs'

type UserStakeInfoJson = {
  user: string
  locked: string
  shares: string
  availableRewards: string
  rewardDebt: string
}

export type UserStakeInfo = {
  pid: number
  user: string
  locked: Decimal
  shares: Decimal
  availableRewards: Decimal
  rewardDebt: Decimal
}

const transformJson = (
  json: UserStakeInfoJson,
  pid: number
): UserStakeInfo => ({
  ...json,
  pid,
  locked: new Decimal(json.locked),
  shares: new Decimal(json.shares),
  availableRewards: new Decimal(json.availableRewards),
  rewardDebt: new Decimal(json.rewardDebt),
})

function useUserStakeInfo(
  address?: string
): UseQueryResult<UserStakeInfo[] | null>
function useUserStakeInfo(
  address?: string,
  pid?: number
): UseQueryResult<UserStakeInfo | null>
function useUserStakeInfo(
  address?: string,
  pid?: number
): UseQueryResult<UserStakeInfo | UserStakeInfo[] | null> {
  const {api, initialized} = useApiPromise()

  return useQuery(['poolStaker', initialized, pid, address], async () => {
    if (!api || !address) return null

    if (typeof pid === 'number') {
      const userStakeInfo = await api.query.phalaStakePool
        ?.poolStakers?.([pid, address])
        .then((value) => value.toJSON() as UserStakeInfoJson)
        .then((json) => json && transformJson(json, pid))

      return userStakeInfo ?? null
    }

    const entries = await api.query.phalaStakePool?.poolStakers?.entries()
    if (!entries) return null

    return entries
      .filter((entry) => (entry[0].toHuman() as string[][])[0]?.[1] === address)
      .map((entry) =>
        transformJson(
          entry[1].toJSON() as UserStakeInfoJson,
          Number((entry[0].toHuman() as string[][])[0]?.[0])
        )
      )
  })
}

export default useUserStakeInfo
