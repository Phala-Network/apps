import {type WikiEntry} from '@/assets/wikiData'
import {KHALA_SUBSQUID_URL, PHALA_SUBSQUID_URL} from '@/config'
import {GraphQLClient} from 'graphql-request'
import {atom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'

export type Chain = 'khala' | 'phala'

export const chainAtom = atom<Chain>('khala')
export const subsquidClientAtom = atom((get) => {
  const url =
    process.env.NEXT_PUBLIC_SUBSQUID_URL ??
    (get(chainAtom) === 'khala' ? KHALA_SUBSQUID_URL : PHALA_SUBSQUID_URL)

  return new GraphQLClient(url)
})
export const khalaVaultIdAtom = atomWithStorage<string | null>(
  'jotai:khala_vault',
  null
)
export const phalaVaultIdAtom = atomWithStorage<string | null>(
  'jotai:phala_vault',
  null
)
export const vaultIdAtom = atom(
  (get) => {
    const chain = get(chainAtom)
    return chain === 'khala' ? get(khalaVaultIdAtom) : get(phalaVaultIdAtom)
  },
  (get, set, update: string | null) => {
    const chain = get(chainAtom)
    if (chain === 'khala') {
      set(khalaVaultIdAtom, update)
    } else {
      set(phalaVaultIdAtom, update)
    }
  }
)

export const khalaFavoritePoolsAtom = atomWithStorage<string[]>(
  'jotai:favorite_pools',
  []
)
export const phalaFavoritePoolsAtom = atomWithStorage<string[]>(
  'jotai:phala_favorite_pools',
  []
)
export const favoritePoolsAtom = atom(
  (get) => {
    const chain = get(chainAtom)
    return chain === 'khala'
      ? get(khalaFavoritePoolsAtom)
      : get(phalaFavoritePoolsAtom)
  },
  (get, set, update: string[]) => {
    const chain = get(chainAtom)
    if (chain === 'khala') {
      set(khalaFavoritePoolsAtom, update)
    } else {
      set(phalaFavoritePoolsAtom, update)
    }
  }
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

export const wikiExpandEntryAtom = atom<WikiEntry | null>(null)
