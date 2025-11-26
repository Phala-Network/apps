'use client'

import {Button} from '@mui/material'
import {useAppKit, useAppKitAccount} from '@reown/appkit/react'
import {useEffect, useState} from 'react'

export default function AppKitButton() {
  const [mounted, setMounted] = useState(false)
  const {isConnected} = useAppKitAccount()
  const {open} = useAppKit()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (!isConnected) {
    return (
      <Button size="small" variant="contained" onClick={() => open()}>
        Connect Wallet
      </Button>
    )
  }

  return <appkit-account-button balance="hide" />
}
