import {PolkadotChainId} from '@/config/chain'
import {createPolkadotApi} from '@/lib/createPolkadotApi'
import {fromChainAtom} from '@/store/bridge'
import {useAtomValue} from 'jotai'
import useSWRImmutable from 'swr/immutable'

export const usePolkadotApi = (chainId: PolkadotChainId | null) => {
  const {data: polkadotApi} = useSWRImmutable(chainId, createPolkadotApi)

  return polkadotApi
}

export const useCurrentPolkadotApi = () => {
  const fromChain = useAtomValue(fromChainAtom)
  const polkadotApi = usePolkadotApi(
    fromChain.kind === 'polkadot' ? fromChain.id : null
  )

  return polkadotApi
}
