import type {Wallet} from '@talismn/connect-wallets'
import {atom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'

export const walletNameAtom = atomWithStorage<string | null>(
  'jotai:wallet_name',
  null
)

const originalWalletAtom = atom<Wallet | null>(null)
originalWalletAtom.debugLabel = 'wallet'
export const walletAtom = atom<Wallet | null, Wallet | null>(
  (get) => get(originalWalletAtom),
  (get, set, update) => {
    set(originalWalletAtom, update)
    set(walletNameAtom, update ? update.extensionName : null)
  }
)
