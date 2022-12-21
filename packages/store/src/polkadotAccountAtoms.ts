import type {WalletAccount} from '@talismn/connect-wallets'
import {atom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'

export const polkadotAccountsAtom = atom<WalletAccount[] | null>(null)
polkadotAccountsAtom.debugLabel = 'polkadotAccounts'

const polkadotAccountAddressAtom = atomWithStorage<string | null>(
  'jotai:polkadot_account_address',
  null
)
polkadotAccountAddressAtom.debugLabel = 'polkadotAccountAddress'

export const polkadotAccountAtom = atom<WalletAccount | null, string | null>(
  (get) => {
    const polkadotAccountAddress = get(polkadotAccountAddressAtom)
    if (!polkadotAccountAddress) return null
    return (
      get(polkadotAccountsAtom)?.find(
        (account) => account.address === get(polkadotAccountAddressAtom)
      ) || null
    )
  },
  (get, set, account) => {
    set(polkadotAccountAddressAtom, account)
  }
)
polkadotAccountAtom.debugLabel = 'polkadotAccount'
