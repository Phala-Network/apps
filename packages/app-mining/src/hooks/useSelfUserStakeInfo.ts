import {useCurrentAccount} from '@phala/app-store'
import useUserStakeInfo from './useUserStakeInfo'

const useSelfUserStakeInfo = (pid: number) => {
  const [polkadotAccount] = useCurrentAccount()

  return useUserStakeInfo(polkadotAccount?.address, pid)
}

export default useSelfUserStakeInfo
