import {usePolkadotAccountAtom} from '@phala/app-store'
import {useStakePools} from '@phala/react-hooks'

const useSelfStakePools = (): ReturnType<typeof useStakePools> => {
  const [polkadotAccount] = usePolkadotAccountAtom()
  return useStakePools({
    select: (stakePools) => {
      if (!polkadotAccount || !stakePools) return null

      return stakePools.filter(
        (stakePool) => stakePool.owner === polkadotAccount.address
      )
    },
    enabled: Boolean(polkadotAccount?.address),
  })
}

export default useSelfStakePools
