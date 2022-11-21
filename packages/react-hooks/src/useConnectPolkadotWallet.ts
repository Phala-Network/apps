import {polkadotAccountsAtom, walletAtom} from '@phala/store'
import {useAtom} from 'jotai'
import {useEffect} from 'react'

const TALISMAN_STORAGE_KEY = '@talisman-connect/selected-wallet-name'

const useConnectPolkadotWallet = (dappName: string): void => {
  const [, setAccounts] = useAtom(polkadotAccountsAtom)
  const [wallet, setWallet] = useAtom(walletAtom)

  useEffect(() => {
    const storageWalletName = localStorage.getItem(TALISMAN_STORAGE_KEY)
    if (!storageWalletName) return
    let unmounted = false
    const connect = async () => {
      const {getWalletBySource} = await import('@talismn/connect-wallets')
      const newWallet = getWalletBySource(storageWalletName)
      if (newWallet) {
        try {
          await newWallet.enable(dappName)
          if (!unmounted) {
            setWallet(newWallet)
          }
        } catch (err) {
          // Ignore auto connect errors
        }
      }
    }
    connect()
    return () => {
      unmounted = true
    }
  }, [setWallet, dappName])

  useEffect(() => {
    let unsub: () => void
    let unmounted = false
    const updateAccounts = async () => {
      if (wallet) {
        // Some wallets don't implement subscribeAccounts correctly, so call getAccounts anyway
        const accounts = await wallet.getAccounts()
        if (!unmounted) {
          setAccounts(accounts)
          unsub = (await wallet.subscribeAccounts((accounts) => {
            if (accounts && !unmounted) {
              setAccounts(accounts)
            }
          })) as () => void
        }
      } else {
        setAccounts(null)
      }
    }
    updateAccounts()
    return () => {
      unmounted = true
      unsub?.()
    }
  }, [wallet, setAccounts])
}

export default useConnectPolkadotWallet
