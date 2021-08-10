import { ethereums } from '../config'
import { useEthers } from '../libs/ethereum/contexts/useEthers'
import { isDev } from '../utils/isDev'
import { isTest } from '../utils/isTest'

export function useCheckEthereumNetwork(): boolean {
  const { provider } = useEthers()
  const chainId = provider?.network?.chainId as number

  if (isTest() || isDev()) {
    const network = ethereums[chainId]
    return !!network
  } else {
    return chainId === 1
  }
}
