import Decimal from 'decimal.js'
import {useQuery, UseQueryResult} from 'react-query'
import {usePolkadotAccountAtom} from '@phala/app-store'
import {useApiPromise} from '@phala/react-libs'

type PoolStakerInfoJson = {
  user: string
  locked: string | number
  shares: string | number
  availableRewards: string | number
  rewardDebt: string | number
}

type PoolStakerInfo = {
  user: string
  locked: Decimal
  shares: Decimal
  availableRewards: Decimal
  rewardDebt: Decimal
}

const usePoolStakerInfo = (
  pid: number | null
): UseQueryResult<PoolStakerInfo | null> => {
  const {api, initialized} = useApiPromise()
  const [polkadotAccount] = usePolkadotAccountAtom()

  return useQuery(
    ['poolStaker', initialized, pid, polkadotAccount?.address],
    () =>
      api && polkadotAccount?.address && typeof pid === 'number'
        ? api.query.phalaStakePool
            ?.poolStakers?.([pid, polkadotAccount.address])
            .then((value) => value.toJSON() as PoolStakerInfoJson)
            .then((json) =>
              json
                ? {
                    ...json,
                    locked: new Decimal(json.locked),
                    shares: new Decimal(json.shares),
                    availableRewards: new Decimal(json.availableRewards),
                    rewardDebt: new Decimal(json.rewardDebt),
                  }
                : null
            )
        : null
  )
}

export default usePoolStakerInfo
