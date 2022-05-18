import {polkadotAccountsAtom, walletAtom} from '@phala/store'
import {encodeAddress} from '@polkadot/util-crypto'
import {WalletAccount} from '@talisman-connect/wallets'
import {useAtom, useAtomValue} from 'jotai'
import {useEffect} from 'react'

const transformAccounts = (accounts: WalletAccount[]): WalletAccount[] => {
  return accounts.map((account) => ({
    ...account,
    // FIXME: hardcode ss58Format to 30, should use api.registry.chainSS58
    address: encodeAddress(account.address, 30),
  }))
}

export const useSubscribeWalletAccounts = () => {
  const wallet = useAtomValue(walletAtom)
  const [, setAccounts] = useAtom(polkadotAccountsAtom)

  useEffect(() => {
    let unsub: () => void
    let unmounted = false
    if (wallet) {
      // Some wallets don't implement subscribeAccounts correctly, so call getAccounts anyway
      wallet.getAccounts().then((accounts) => {
        if (!unmounted) {
          setAccounts(transformAccounts(accounts))
        }
      })
      ;(
        wallet.subscribeAccounts((accounts) => {
          if (accounts && !unmounted) {
            setAccounts(transformAccounts(accounts))
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
