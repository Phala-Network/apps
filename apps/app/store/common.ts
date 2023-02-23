import {atom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'

export type Chain = 'khala' | 'phala'

export const chainAtom = atomWithStorage<Chain>('jotai:network', 'khala')
export const vaultIdAtom = atomWithStorage<string | null>('jotai:vault', null)
export const favoritePoolsAtom = atomWithStorage<string[]>(
  'jotai:favorite_pools',
  []
)

export const basePoolMinDelegableAtom = atomWithStorage<string>(
  'jotai:base_pool_min_delegable',
  '100'
)

export const basePoolMinTvlAtom = atomWithStorage<string>(
  'jotai:base_pool_min_tvl',
  '100'
)

export const basePoolMinAprAtom = atomWithStorage<string>(
  'jotai:base_pool_min_apr',
  ''
)

export const basePoolMinWorkersAtom = atomWithStorage<string>(
  'jotai:base_pool_min_workers',
  ''
)

export const wikiExpandAtom = atom<string | null>(null)
