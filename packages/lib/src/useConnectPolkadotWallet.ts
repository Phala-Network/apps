import {polkadotAccountsAtom, walletAtom} from '@phala/store'
import {transformAddress} from '@phala/util'
import {WalletAccount} from '@talismn/connect-wallets'
import {useAtom} from 'jotai'
import {useEffect} from 'react'

const TALISMAN_STORAGE_KEY = '@talisman-connect/selected-wallet-name'

export const useConnectPolkadotWallet = (
  dappName: string,
  ss58Format?: number
): void => {
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
    const saveAccounts = (accounts?: WalletAccount[]) => {
      if (!accounts || unmounted) return
      if (ss58Format === undefined) {
        setAccounts(accounts)
      } else {
        setAccounts(
          accounts.map((a) => {
            return {
              ...a,
              address: transformAddress(a.address, ss58Format),
            }
          })
        )
      }
    }
    const updateAccounts = async () => {
      if (wallet) {
        // Some wallets don't implement subscribeAccounts correctly, so call getAccounts anyway
        const accounts = await wallet.getAccounts()
        saveAccounts(accounts)
        if (!unmounted) {
          unsub = (await wallet.subscribeAccounts(saveAccounts)) as () => void
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
  }, [wallet, setAccounts, ss58Format])
}
