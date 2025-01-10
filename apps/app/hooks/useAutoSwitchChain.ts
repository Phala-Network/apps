import {ethChain} from '@/config'
import {useEffect} from 'react'
import {useSwitchChain} from 'wagmi'
import {useAccount} from 'wagmi'

export const useAutoSwitchChain = () => {
  const {isConnected, chainId} = useAccount()
  const {switchChain} = useSwitchChain()
  useEffect(() => {
    if (isConnected && chainId !== ethChain.id) {
      switchChain({chainId: ethChain.id})
    }
  }, [chainId, switchChain, isConnected])
}
