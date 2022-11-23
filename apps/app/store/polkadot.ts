import {atomWithStorage} from 'jotai/utils'

export type Chain = 'khala' | 'phala'

export const chainAtom = atomWithStorage<Chain>('jotai:network', 'khala')
