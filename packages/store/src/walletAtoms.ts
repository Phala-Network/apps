import {Wallet} from '@talisman-connect/wallets'
import {atom, useAtom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'

export const lastWalletExtensionNameAtom = atomWithStorage<string | null>(
  'jotai:last_wallet_extension_name',
  null
)
lastWalletExtensionNameAtom.debugLabel = 'lastWalletExtensionName'
const originalWalletAtom = atom<Wallet | null>(null)
originalWalletAtom.debugLabel = 'wallet'
export const walletAtom = atom<Wallet | null, Wallet | null>(
  (get) => get(originalWalletAtom),
  (get, set, update) => {
    set(originalWalletAtom, update)
    set(lastWalletExtensionNameAtom, update ? update.extensionName : null)
  }
)

// TODO: remove hooks below in @phala/app
export const useWallet = () => useAtom(walletAtom)
export const useLastWalletExtensionName = () =>
  useAtom(lastWalletExtensionNameAtom)
