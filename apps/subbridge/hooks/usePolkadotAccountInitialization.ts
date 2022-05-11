import {lastWalletExtensionNameAtom, useAccounts, useWallet} from '@phala/store'
import {useAtom} from 'jotai'
import {useEffect} from 'react'

export const usePolkadotAccountInitialization = (): void => {
  const [, setAccounts] = useAccounts()
  const [wallet, setWallet] = useWallet()
  const [lastWalletExtensionName] = useAtom(lastWalletExtensionNameAtom)

  useEffect(() => {
    if (wallet || !lastWalletExtensionName) return
    let unmounted = false

    import('@talisman-connect/wallets').then(({getWalletBySource}) => {
      if (unmounted) return
      const wallet = getWalletBySource(lastWalletExtensionName)

      if (wallet) {
        ;(wallet.enable('SubBridge') as Promise<void>)
          .then(() => {
            if (unmounted) return
            setWallet(wallet)
          })
          // Ignore auto connect errors
          .catch(() => null)
      }
    })

    return () => {
      unmounted = true
    }
  }, [lastWalletExtensionName, setWallet, wallet])

  useEffect(() => {
    let unsub: () => void
    let unmounted = false
    if (wallet) {
      ;(
        wallet.subscribeAccounts((accounts) => {
          if (accounts && !unmounted) {
            setAccounts(accounts)
          }
        }) as Promise<() => void>
      ).then((_unsub) => {
        _unsub && (unsub = _unsub)
      })
    }

    return () => {
      unmounted = true
      unsub?.()
    }
  }, [wallet, setAccounts])
}
