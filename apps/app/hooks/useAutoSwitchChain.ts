import {useEffect} from 'react'
import {mainnet, sepolia} from 'viem/chains'
import {useSwitchChain} from 'wagmi'
import {useAccount} from 'wagmi'

const targetChain = process.env.VERCEL_ENV === 'production' ? mainnet : sepolia

export const useAutoSwitchChain = () => {
  const {chain} = useAccount()
  const {switchChain} = useSwitchChain()
  useEffect(() => {
    if (chain != null && chain.id !== targetChain.id) {
      switchChain({chainId: targetChain.id})
    }
  }, [chain, switchChain])
}
