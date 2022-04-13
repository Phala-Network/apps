import {fromChainAtom} from '@/store/bridge'
import {ethereumProviderAtom} from '@/store/ethers'
import {useAtom} from 'jotai'
import {useCallback} from 'react'

export const useSwitchNetwork = () => {
  const [fromChain] = useAtom(fromChainAtom)
  const [ethereum] = useAtom(ethereumProviderAtom)

  const switchNetwork = useCallback(() => {
    if (!ethereum || fromChain.kind !== 'evm') return
    return ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{chainId: `0x${fromChain.evmChainId.toString(16)}`}],
    })
  }, [ethereum, fromChain])

  return switchNetwork
}
