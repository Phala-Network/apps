import {CHAINS, type SubstrateChainId} from '@/config/chain'
import {fromChainAtom} from '@/store/bridge'
import {createPolkadotApi} from '@phala/lib'
import type {ApiPromise} from '@polkadot/api'
import {useAtomValue} from 'jotai'
import useSWRImmutable from 'swr/immutable'

const create = async ([chainId]: [SubstrateChainId]): Promise<ApiPromise> => {
  const endpoint = CHAINS[chainId].endpoint
  const api = await createPolkadotApi(
    typeof endpoint === 'string' ? endpoint : endpoint[0],
  )
  return api
}

export const usePolkadotApi = (
  chainId: SubstrateChainId | null,
): ApiPromise | undefined => {
  const {data: polkadotApi} = useSWRImmutable(
    chainId != null && [chainId],
    create,
  )

  return polkadotApi
}

export const useCurrentPolkadotApi = (): ApiPromise | undefined => {
  const fromChain = useAtomValue(fromChainAtom)
  const polkadotApi = usePolkadotApi(
    fromChain.kind === 'substrate' ? fromChain.id : null,
  )

  return polkadotApi
}
