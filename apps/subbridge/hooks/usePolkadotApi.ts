import {type PolkadotChainId} from '@/config/chain'
import {createPolkadotApi} from '@/lib/createPolkadotApi'
import {fromChainAtom} from '@/store/bridge'
import {type ApiPromise} from '@polkadot/api'
import {useAtomValue} from 'jotai'
import useSWRImmutable from 'swr/immutable'

export const usePolkadotApi = (
  chainId: PolkadotChainId | null
): ApiPromise | undefined => {
  const {data: polkadotApi} = useSWRImmutable(chainId, createPolkadotApi)

  return polkadotApi
}

export const useCurrentPolkadotApi = (): ApiPromise | undefined => {
  const fromChain = useAtomValue(fromChainAtom)
  const polkadotApi = usePolkadotApi(
    fromChain.kind === 'polkadot' ? fromChain.id : null
  )

  return polkadotApi
}
