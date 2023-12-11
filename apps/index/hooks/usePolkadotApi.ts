import {fromChainAtom} from '@/store/core'
import {createPolkadotApi} from '@phala/utils'
import {type ApiPromise} from '@polkadot/api'
import {useAtom} from 'jotai'
import useSWRImmutable from 'swr/immutable'

const create = async ([endpoint]: [string]): Promise<ApiPromise> =>
  await createPolkadotApi(endpoint)

export const usePolkadotApi = (
  endpoint: string | false | undefined,
): ApiPromise | undefined => {
  const {data: polkadotApi} = useSWRImmutable([endpoint], create)

  return polkadotApi
}

export const useCurrentPolkadotApi = (): ApiPromise | undefined => {
  const [fromChain] = useAtom(fromChainAtom)
  const polkadotApi = usePolkadotApi(
    fromChain?.chainType === 'Sub' && fromChain.endpoint,
  )

  return polkadotApi
}
