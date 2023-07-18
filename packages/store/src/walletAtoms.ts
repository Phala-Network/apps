import type {Wallet} from '@talismn/connect-wallets'
import {atom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'

export const walletNameAtom = atomWithStorage<string | null>(
  'jotai:wallet_name',
  null,
)

const originalWalletAtom = atom<Wallet | null>(null)
originalWalletAtom.debugLabel = 'wallet'
export const walletAtom = atom(
  (get) => get(originalWalletAtom),
  (_get, set, newWallet: Wallet | null) => {
    set(originalWalletAtom, newWallet)
    set(walletNameAtom, newWallet != null ? newWallet.extensionName : null)
  },
)
