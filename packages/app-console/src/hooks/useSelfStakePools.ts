import {usePolkadotAccountAtom} from '@phala/app-store'
import {useStakePools} from '@phala/react-hooks'

const useSelfStakePools = (): ReturnType<typeof useStakePools> => {
  const [polkadotAccount] = usePolkadotAccountAtom()
  return useStakePools(polkadotAccount?.address)
}

export default useSelfStakePools
