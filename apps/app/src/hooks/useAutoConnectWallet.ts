import {lastWalletExtensionNameAtom, walletAtom} from '@phala/store'
import {useAtom} from 'jotai'
import {useEffect} from 'react'

/**
 * Hook to automatically connect to the last wallet extension
 */
export const useAutoConnectWallet = () => {
  const [wallet, setWallet] = useAtom(walletAtom)
  const [lastWalletExtensionName] = useAtom(lastWalletExtensionNameAtom)

  useEffect(() => {
    if (wallet || !lastWalletExtensionName) return
    let unmounted = false
    let timeout: NodeJS.Timeout

    import('@talismn/connect-wallets').then(({getWalletBySource}) => {
      if (unmounted) return
      // HACK: always wait for extension injection for 0.5s before getting wallet
      timeout = setTimeout(() => {
        const wallet = getWalletBySource(lastWalletExtensionName)

        if (wallet) {
          ;(wallet.enable('Phala App') as Promise<void>)
            .then(() => {
              if (unmounted) return
              setWallet(wallet)
            })
            // Silent auto connect errors
            .catch(() => null)
        }
      }, 500)
    })

    return () => {
      clearTimeout(timeout)
      unmounted = true
    }
  }, [lastWalletExtensionName, setWallet, wallet])
}
