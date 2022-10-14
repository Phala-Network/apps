import type {WalletAccount} from '@talismn/connect-wallets'
import {atom, useAtom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'

export const polkadotAccountsAtom = atom<WalletAccount[] | null>(null)
polkadotAccountsAtom.debugLabel = 'polkadotAccounts'

const lastAccountAddressAtom = atomWithStorage<string | null>(
  'jotai:last_account_address',
  null
)
lastAccountAddressAtom.debugLabel = 'lastAccountAddress'

export const polkadotAccountAtom = atom<WalletAccount | null, string | null>(
  (get) => {
    const lastPolkadotAccount = get(lastAccountAddressAtom)
    if (!lastPolkadotAccount) return null
    return (
      get(polkadotAccountsAtom)?.find(
        (account) => account.address === get(lastAccountAddressAtom)
      ) || null
    )
  },
  (get, set, account) => {
    set(lastAccountAddressAtom, account)
  }
)
polkadotAccountAtom.debugLabel = 'polkadotAccountAtom'

// TODO: remove hooks below in @phala/app
export const useCurrentAccount = () => useAtom(polkadotAccountAtom)
