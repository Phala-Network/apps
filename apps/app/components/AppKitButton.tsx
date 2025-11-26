'use client'

import {useEffect, useState} from 'react'

export default function AppKitButton() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder with similar dimensions to prevent layout shift
    return null
  }

  return <appkit-button balance="hide" />
}
