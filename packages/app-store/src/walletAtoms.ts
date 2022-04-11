import {Wallet} from '@phala/wallets/types'
import {atom, useAtom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'

const lastWalletExtensionNameAtom = atomWithStorage<string | null>(
  'jotai:last_wallet_extension_name',
  null
)
lastWalletExtensionNameAtom.debugLabel = 'lastWalletExtensionName'
const walletAtom = atom<Wallet | null>(null)
walletAtom.debugLabel = 'wallet'
const walletAtomWithWrite = atom<Wallet | null, Wallet | null>(
  (get) => get(walletAtom),
  (get, set, update) => {
    set(walletAtom, update)
    set(lastWalletExtensionNameAtom, update ? update.extensionName : null)
  }
)

export const useWallet = () => useAtom(walletAtomWithWrite)
export const useLastWalletExtensionName = () =>
  useAtom(lastWalletExtensionNameAtom)
