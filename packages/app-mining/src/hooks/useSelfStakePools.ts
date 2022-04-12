import {useCurrentAccount} from '@phala/store'
import {isDev} from '@phala/utils'
import useStakePools from './useStakePools'

const useSelfStakePools = (): ReturnType<typeof useStakePools> => {
  const [polkadotAccount] = useCurrentAccount()
  return useStakePools({
    select: (stakePools) => {
      if (!polkadotAccount || !stakePools) return null

      if (isDev()) return stakePools

      return stakePools.filter(
        (stakePool) => stakePool.owner === polkadotAccount.address
      )
    },
    enabled: Boolean(polkadotAccount?.address),
  })
}

export default useSelfStakePools
