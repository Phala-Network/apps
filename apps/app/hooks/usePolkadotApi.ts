import {PHALA_ENDPOINTS} from '@/config'
import {createPolkadotApi} from '@phala/lib'
import type {ApiPromise} from '@polkadot/api'
import useSWRImmutable from 'swr/immutable'

const create = async ([endpoint, _]: [string, string]): Promise<ApiPromise> =>
  await createPolkadotApi(endpoint)

const usePolkadotApi = (): ApiPromise | undefined => {
  const {data: polkadotApi} = useSWRImmutable(
    [PHALA_ENDPOINTS[0], 'polkadotApi'],
    create,
  )

  return polkadotApi
}

export default usePolkadotApi
