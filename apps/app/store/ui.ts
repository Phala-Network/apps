import {atom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'

export const walletDialogOpenAtom = atom(false)
export const wikiDialogOpenAtom = atom(false)
export const assetVisibleAtom = atomWithStorage('jotai:asset_visible', true)
export const hideSmallBalanceAtom = atomWithStorage(
  'jotai:hide_small_balance',
  true,
)
