'use client'

import {Button} from '@mui/material'
import {ConnectButton} from '@rainbow-me/rainbowkit'
import {useEffect, useState} from 'react'
import {useConnection, useSwitchChain} from 'wagmi'

import {ethChain} from '@/config'

const SwitchChainButton = ({children}: {children: React.ReactNode}) => {
  const [isMounted, setIsMounted] = useState(false)
  const {isConnected, chainId} = useConnection()
  const {mutate: switchChain} = useSwitchChain()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // During SSR and initial hydration, render children to avoid flash
  if (!isMounted) {
    return children
  }

  if (!isConnected) {
    return (
      <ConnectButton.Custom>
        {({openConnectModal}) => (
          <Button
            fullWidth
            size="large"
            variant="contained"
            onClick={openConnectModal}
          >
            Connect Wallet
          </Button>
        )}
      </ConnectButton.Custom>
    )
  }

  if (chainId !== ethChain.id) {
    return (
      <Button
        fullWidth
        size="large"
        color="warning"
        variant="contained"
        onClick={() => switchChain({chainId: ethChain.id})}
      >
        Switch to {ethChain.name}
      </Button>
    )
  }

  return children
}

export default SwitchChainButton
