import {type SubstrateChainId} from '@/config/chain'
import {createPolkadotApi} from '@/lib/createPolkadotApi'
import {fromChainAtom} from '@/store/bridge'
import {type ApiPromise} from '@polkadot/api'
import {useAtomValue} from 'jotai'
import useSWRImmutable from 'swr/immutable'

export const usePolkadotApi = (
  chainId: SubstrateChainId | null,
): ApiPromise | undefined => {
  const {data: polkadotApi} = useSWRImmutable(chainId, createPolkadotApi)

  return polkadotApi
}

export const useCurrentPolkadotApi = (): ApiPromise | undefined => {
  const fromChain = useAtomValue(fromChainAtom)
  const polkadotApi = usePolkadotApi(
    fromChain.kind === 'substrate' ? fromChain.id : null,
  )

  return polkadotApi
}
