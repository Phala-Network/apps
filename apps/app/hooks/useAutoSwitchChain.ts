import {ethChain} from '@/config'
import {useEffect} from 'react'
import {useSwitchChain} from 'wagmi'
import {useAccount} from 'wagmi'

export const useAutoSwitchChain = () => {
  const {chain} = useAccount()
  const {switchChain} = useSwitchChain()
  useEffect(() => {
    if (chain?.id !== ethChain.id) {
      switchChain({chainId: ethChain.id})
    }
  }, [chain, switchChain])
}
