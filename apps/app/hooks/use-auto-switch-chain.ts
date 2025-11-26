'use client'

import {useAppKitAccount, useAppKitNetwork} from '@reown/appkit/react'
import {useEffect} from 'react'

import {ethChain} from '@/config'

export const useAutoSwitchChain = () => {
  const {isConnected} = useAppKitAccount()
  const {chainId, switchNetwork} = useAppKitNetwork()
  useEffect(() => {
    if (isConnected && chainId !== ethChain.id) {
      switchNetwork(ethChain)
    }
  }, [chainId, switchNetwork, isConnected])
}
