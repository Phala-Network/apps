import {selectedEndpointAtom} from '@/store/common'
import {createPolkadotApi} from '@phala/lib'
import type {ApiPromise} from '@polkadot/api'
import {useAtomValue} from 'jotai'
import useSWRImmutable from 'swr/immutable'

const create = async ([endpoint, _]: [string, string]): Promise<ApiPromise> =>
  await createPolkadotApi(endpoint)

const usePolkadotApi = (): ApiPromise | undefined => {
  const selectedEndpoint = useAtomValue(selectedEndpointAtom)
  const {data: polkadotApi} = useSWRImmutable(
    [selectedEndpoint, 'polkadotApi'],
    create,
  )

  return polkadotApi
}

export default usePolkadotApi
