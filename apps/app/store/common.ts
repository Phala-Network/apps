import {atomWithStorage} from 'jotai/utils'

export type Chain = 'khala' | 'phala'

export const chainAtom = atomWithStorage<Chain>('jotai:network', 'khala')
export const vaultIdAtom = atomWithStorage<string | null>('jotai:vault', null)
