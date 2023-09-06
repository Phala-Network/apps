import {createPolkadotApi} from '@/lib/createPolkadotApi'
import {fromChainAtom} from '@/store/core'
import {type ApiPromise} from '@polkadot/api'
import {useAtom} from 'jotai'
import useSWRImmutable from 'swr/immutable'

export const usePolkadotApi = (
  endpoint: string | false | undefined,
): ApiPromise | undefined => {
  const {data: polkadotApi} = useSWRImmutable(endpoint, createPolkadotApi)

  return polkadotApi
}

export const useCurrentPolkadotApi = (): ApiPromise | undefined => {
  const [fromChain] = useAtom(fromChainAtom)
  const polkadotApi = usePolkadotApi(
    fromChain?.chainType === 'Sub' && fromChain.endpoint,
  )

  return polkadotApi
}
