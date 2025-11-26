'use client'

import {Button} from '@mui/material'
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
} from '@reown/appkit/react'
import {useEffect, useState} from 'react'

import {ethChain} from '@/config'

const SwitchChainButton = ({children}: {children: React.ReactNode}) => {
  const [isMounted, setIsMounted] = useState(false)
  const {isConnected} = useAppKitAccount()
  const {chainId, switchNetwork} = useAppKitNetwork()
  const {open} = useAppKit()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // During SSR and initial hydration, render children to avoid flash
  if (!isMounted) {
    return children
  }

  if (!isConnected) {
    return (
      <Button fullWidth size="large" variant="contained" onClick={() => open()}>
        Connect Wallet
      </Button>
    )
  }

  if (chainId !== ethChain.id) {
    return (
      <Button
        fullWidth
        size="large"
        color="warning"
        variant="contained"
        onClick={() => switchNetwork(ethChain)}
      >
        Switch to {ethChain.name}
      </Button>
    )
  }

  return children
}

export default SwitchChainButton
