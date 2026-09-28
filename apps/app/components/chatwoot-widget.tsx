'use client'

import Script from 'next/script'
import {type FC, useEffect, useRef, useState} from 'react'
import {useConnection} from 'wagmi'

import {
  type ChatwootConfig,
  getChatwootConfig,
  getWalletAttributeAction,
  WALLET_ADDRESS_ATTRIBUTE,
} from '@/lib/chatwoot'

// Subset of the Chatwoot Website SDK surface we use.
// See https://github.com/chatwoot/chatwoot/blob/develop/app/javascript/entrypoints/sdk.js
declare global {
  interface Window {
    chatwootSDK?: {
      run: (config: {websiteToken: string; baseUrl: string}) => void
    }
    $chatwoot?: {
      hasLoaded: boolean
      setCustomAttributes: (attributes: Record<string, string>) => void
      deleteCustomAttribute: (attribute: string) => void
    }
  }
}

const chatwootConfig = getChatwootConfig(
  process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL,
  process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN,
)

const useWalletAttributeSync = () => {
  const {address, status} = useConnection()
  const [isReady, setIsReady] = useState(false)
  const syncedAddressRef = useRef<string>(undefined)

  useEffect(() => {
    if (window.$chatwoot?.hasLoaded) {
      setIsReady(true)
      return
    }
    const handleReady = () => setIsReady(true)
    window.addEventListener('chatwoot:ready', handleReady)
    return () => window.removeEventListener('chatwoot:ready', handleReady)
  }, [])

  useEffect(() => {
    const chatwoot = window.$chatwoot
    if (
      !isReady ||
      chatwoot == null ||
      status === 'connecting' ||
      status === 'reconnecting'
    ) {
      return
    }

    const action = getWalletAttributeAction(syncedAddressRef.current, address)
    if (action == null) {
      return
    }

    try {
      if (action.type === 'set') {
        chatwoot.setCustomAttributes({
          [WALLET_ADDRESS_ATTRIBUTE]: action.walletAddress,
        })
        syncedAddressRef.current = action.walletAddress
      } else {
        chatwoot.deleteCustomAttribute(WALLET_ADDRESS_ATTRIBUTE)
        syncedAddressRef.current = undefined
      }
    } catch (error) {
      console.warn('Failed to sync wallet address to Chatwoot', error)
    }
  }, [isReady, address, status])
}

const ChatwootLoader: FC<{config: ChatwootConfig}> = ({config}) => {
  useWalletAttributeSync()

  return (
    <Script
      id="chatwoot-sdk"
      src={`${config.baseUrl}/packs/js/sdk.js`}
      strategy="lazyOnload"
      onLoad={() => {
        // run() is a no-op once the widget exists, so remounts are safe.
        window.chatwootSDK?.run(config)
      }}
      onError={() => {
        console.warn('Failed to load the Chatwoot support widget')
      }}
    />
  )
}

export const ChatwootWidget: FC = () => {
  if (chatwootConfig == null) {
    return null
  }
  return <ChatwootLoader config={chatwootConfig} />
}
