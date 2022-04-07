import {atom, useAtom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'
import {WalletAccount} from '@phala/wallets/types'

const accountsAtom = atom<WalletAccount[]>([])

const lastPolkadotAccountAtom = atomWithStorage<string | null>(
  'last_polkadot_account',
  null
)

const currentAccountAtom = atom<WalletAccount | null, string | null>(
  (get) => {
    const lastPolkadotAccount = get(lastPolkadotAccountAtom)
    if (!lastPolkadotAccount) return null
    return (
      get(accountsAtom).find(
        (account) => account.address === get(lastPolkadotAccountAtom)
      ) || null
    )
  },
  (get, set, account) => {
    set(lastPolkadotAccountAtom, account)
  }
)

export const useCurrentAccount = () => useAtom(currentAccountAtom)
export const useAccounts = () => useAtom(accountsAtom)
