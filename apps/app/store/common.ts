import {atom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'

export type Chain = 'khala' | 'phala'

export const chainAtom = atomWithStorage<Chain>('jotai:network', 'khala')
export const vaultIdAtom = atom<string | null>(null)
