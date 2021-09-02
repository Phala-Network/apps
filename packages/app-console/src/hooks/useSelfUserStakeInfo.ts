import {usePolkadotAccountAtom} from '@phala/app-store'
import {useUserStakeInfo} from '@phala/react-hooks'

const useSelfUserStakeInfo = (pid: number) => {
  const [polkadotAccount] = usePolkadotAccountAtom()

  return useUserStakeInfo(polkadotAccount?.address, pid)
}

export default useSelfUserStakeInfo
