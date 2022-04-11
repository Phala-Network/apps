import {useAccounts, useWallet} from '@phala/store'
import {useEffect} from 'react'
import {encodeAddress} from '@polkadot/util-crypto'
import {WalletAccount} from '@phala/wallets/types'

const transformAccounts = (accounts: WalletAccount[]): WalletAccount[] => {
  return accounts.map((account) => ({
    ...account,
    // FIXME: hardcode ss58Format to 30, should use api.registry.chainSS58
    address: encodeAddress(account.address, 30),
  }))
}

export const useSubscribeWalletAccounts = () => {
  const [wallet] = useWallet()
  const [, setAccounts] = useAccounts()

  useEffect(() => {
    let unsub: () => void
    if (wallet) {
      // Some wallets don't implement subscribeAccounts correctly, so call getAccounts anyway
      wallet.getAccounts().then((accounts) => {
        setAccounts(accounts ? transformAccounts(accounts) : null)

        wallet
          .subscribeAccounts((accounts) => {
            if (accounts) {
              setAccounts(transformAccounts(accounts))
            }
          })
          .then((_unsub) => {
            _unsub && (unsub = _unsub)
          })
      })
    }

    return () => {
      unsub?.()
    }
  }, [wallet, setAccounts])
}
