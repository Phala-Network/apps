import {useAccounts, useWallet} from '@phala/app-store'
import {useEffect} from 'react'
import {encodeAddress} from '@polkadot/util-crypto'

export const useSubscribeWalletAccounts = () => {
  const [wallet] = useWallet()
  const [, setAccounts] = useAccounts()

  useEffect(() => {
    let unsub: () => void
    setAccounts(null)
    if (wallet) {
      wallet
        .subscribeAccounts((accounts) => {
          if (accounts) {
            setAccounts(
              accounts.map((account) => ({
                ...account,
                // FIXME: hardcode ss58Format to 30, should use api.registry.chainSS58
                address: encodeAddress(account.address, 30),
              }))
            )
          }
        })
        .then((_unsub) => {
          _unsub && (unsub = _unsub)
        })
    }

    return () => {
      unsub?.()
    }
  }, [wallet, setAccounts])
}
