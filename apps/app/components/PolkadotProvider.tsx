'use client'

import {useConnectPolkadotWallet} from '@phala/lib'
import type {FC, ReactNode} from 'react'
import WalletDialog from './WalletDialog'

const PolkadotProvider: FC<{children: ReactNode}> = ({children}) => {
  useConnectPolkadotWallet('Phala App', 30)

  return (
    <>
      {children}
      <WalletDialog />
    </>
  )
}

export default PolkadotProvider
