import { ethereums } from '@phala/app-config'
import { useEthers } from '@phala/react-libs'
import { isDev, isTest } from '@phala/utils'

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
