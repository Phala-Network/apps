import type {Wallet} from '@talismn/connect-wallets'
import {atom} from 'jotai'

const originalWalletAtom = atom<Wallet | null>(null)
originalWalletAtom.debugLabel = 'wallet'
export const walletAtom = atom<Wallet | null, Wallet | null>(
  (get) => get(originalWalletAtom),
  (get, set, update) => {
    set(originalWalletAtom, update)
  }
)
