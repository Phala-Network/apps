import {atom, useAtom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'
import {WalletAccount} from '@phala/wallets/types'

const accountsAtom = atom<WalletAccount[] | null>(null)
accountsAtom.debugLabel = 'accounts'

const lastAccountAddressAtom = atomWithStorage<string | null>(
  'jotai:last_account_address',
  null
)
lastAccountAddressAtom.debugLabel = 'lastAccountAddress'

const currentAccountAtom = atom<WalletAccount | null, string | null>(
  (get) => {
    const lastPolkadotAccount = get(lastAccountAddressAtom)
    if (!lastPolkadotAccount) return null
    return (
      get(accountsAtom)?.find(
        (account) => account.address === get(lastAccountAddressAtom)
      ) || null
    )
  },
  (get, set, account) => {
    set(lastAccountAddressAtom, account)
  }
)
currentAccountAtom.debugLabel = 'currentAccount'

export const useCurrentAccount = () => useAtom(currentAccountAtom)
export const useAccounts = () => useAtom(accountsAtom)
