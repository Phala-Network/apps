'use client'
import {polkadotAccountsAtom, walletAtom, walletNameAtom} from '@phala/store'
import type {WalletAccount} from '@talismn/connect-wallets'
import {useAtom} from 'jotai'
import {useEffect} from 'react'
import transformSs58Format from './transformSs58Format'

export const useConnectPolkadotWallet = (
  dappName: string,
  ss58Format?: number,
): void => {
  const [, setAccounts] = useAtom(polkadotAccountsAtom)
  const [wallet, setWallet] = useAtom(walletAtom)
  const [walletName] = useAtom(walletNameAtom)

  useEffect(() => {
    if (wallet != null || walletName == null) return
    let unmounted = false
    const connect = async (): Promise<void> => {
      const {getWalletBySource} = await import('@talismn/connect-wallets')
      const newWallet = getWalletBySource(walletName)
      if (newWallet != null) {
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
    void connect()
    return () => {
      unmounted = true
    }
  }, [setWallet, dappName, walletName, wallet])

  useEffect(() => {
    let unsub: () => void
    let unmounted = false
    const saveAccounts = (accounts?: WalletAccount[]): void => {
      if (accounts == null || unmounted) return
      if (ss58Format === undefined) {
        setAccounts(accounts)
      } else {
        setAccounts(
          accounts.map((a) => {
            return {
              ...a,
              address: transformSs58Format(a.address, ss58Format),
            }
          }),
        )
      }
    }
    const updateAccounts = async (): Promise<void> => {
      if (wallet != null) {
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
    void updateAccounts()
    return () => {
      unmounted = true
      unsub?.()
    }
  }, [wallet, setAccounts, ss58Format])
}
