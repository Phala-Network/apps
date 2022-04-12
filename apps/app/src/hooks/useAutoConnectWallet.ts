import {useLastWalletExtensionName, useWallet} from '@phala/store'
import {useEffect} from 'react'

/**
 * Hook to automatically connect to the last wallet extension
 */
export const useAutoConnectWallet = () => {
  const [wallet, setWallet] = useWallet()
  const [lastWalletExtensionName] = useLastWalletExtensionName()

  useEffect(() => {
    if (wallet || !lastWalletExtensionName) return
    let unmounted = false

    import('@phala/wallets').then(({getWalletBySource}) => {
      if (unmounted) return
      const wallet = getWalletBySource(lastWalletExtensionName)

      if (wallet) {
        ;(wallet.enable() as Promise<void>)
          .then(() => {
            if (unmounted) return
            setWallet(wallet)
          })
          // Silent auto connect errors
          .catch(() => null)
      }
    })

    return () => {
      unmounted = true
    }
  }, [lastWalletExtensionName, setWallet, wallet])
}
