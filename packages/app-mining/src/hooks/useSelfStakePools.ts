import {usePolkadotAccountAtom} from '@phala/app-store'
import {useStakePools} from '@phala/react-hooks'
import {isDev} from '@phala/utils'

const useSelfStakePools = (): ReturnType<typeof useStakePools> => {
  const [polkadotAccount] = usePolkadotAccountAtom()
  return useStakePools(isDev() ? undefined : polkadotAccount?.address)
}

export default useSelfStakePools
