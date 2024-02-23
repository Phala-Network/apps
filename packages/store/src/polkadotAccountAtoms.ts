import type {WalletAccount} from '@talismn/connect-wallets'
import {atom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'

export const polkadotAccountsAtom = atom<WalletAccount[] | null>(null)
polkadotAccountsAtom.debugLabel = 'polkadotAccounts'

const polkadotAccountAddressAtom = atomWithStorage<string | null>(
  'jotai:polkadot_account_address',
  null,
)
polkadotAccountAddressAtom.debugLabel = 'polkadotAccountAddress'

export const polkadotAccountAtom = atom(
  (get) => {
    const polkadotAccountAddress = get(polkadotAccountAddressAtom)
    if (polkadotAccountAddress == null) return null
    return (
      get(polkadotAccountsAtom)?.find(
        (account) => account.address === get(polkadotAccountAddressAtom),
      ) ?? null
    )
  },
  (_get, set, account: string | null) => {
    set(polkadotAccountAddressAtom, account)
  },
)
polkadotAccountAtom.debugLabel = 'polkadotAccount'
