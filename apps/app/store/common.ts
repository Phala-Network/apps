import type {WikiEntry} from '@/assets/wikiData'
import {atom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'

export const vaultIdAtom = atomWithStorage<string | null>(
  'jotai:phala_vault',
  null,
)

export const favoritePoolsAtom = atomWithStorage<string[]>(
  'jotai:phala_favorite_pools',
  [],
)
export const basePoolMinDelegableAtom = atomWithStorage<string>(
  'jotai:base_pool_min_delegable',
  '100',
)

export const basePoolMinTvlAtom = atomWithStorage<string>(
  'jotai:base_pool_min_tvl',
  '100',
)

export const basePoolMinAprAtom = atomWithStorage<string>(
  'jotai:base_pool_min_apr',
  '',
)

export const basePoolMinWorkersAtom = atomWithStorage<string>(
  'jotai:base_pool_min_workers',
  '',
)

export const wikiExpandEntryAtom = atom<WikiEntry | null>(null)

export const selectedEndpointAtom = atomWithStorage<string>(
  'jotai:phala_selected_endpoint',
  'wss://phala-rpc.n.dwellir.com',
)
