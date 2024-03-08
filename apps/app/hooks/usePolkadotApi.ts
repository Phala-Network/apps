import {KHALA_ENDPOINTS, PHALA_ENDPOINTS} from '@/config'
import {chainAtom} from '@/store/common'
import {createPolkadotApi} from '@phala/lib'
import type {ApiPromise} from '@polkadot/api'
import {useAtom} from 'jotai'
import useSWRImmutable from 'swr/immutable'

const create = async ([endpoint, _]: [string, string]): Promise<ApiPromise> =>
  await createPolkadotApi(endpoint)

const usePolkadotApi = (): ApiPromise | undefined => {
  const [chain] = useAtom(chainAtom)
  const {data: polkadotApi} = useSWRImmutable(
    [
      chain === 'khala' ? KHALA_ENDPOINTS[0] : PHALA_ENDPOINTS[0],
      'polkadotApi',
    ],
    create,
  )

  return polkadotApi
}

export default usePolkadotApi
