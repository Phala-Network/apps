'use client'

import {Button} from '@mui/material'
import {ConnectButton} from '@rainbow-me/rainbowkit'
import {useConnection} from 'wagmi'

export default function WalletButton() {
  const {isConnected} = useConnection()

  if (isConnected) {
    return <ConnectButton showBalance={false} chainStatus="none" />
  }

  return (
    <ConnectButton.Custom>
      {({openConnectModal, mounted}) => (
        <div
          {...(!mounted && {
            'aria-hidden': true,
            style: {
              opacity: 0,
              pointerEvents: 'none',
              userSelect: 'none',
            },
          })}
        >
          <Button size="small" variant="contained" onClick={openConnectModal}>
            Connect Wallet
          </Button>
        </div>
      )}
    </ConnectButton.Custom>
  )
}
