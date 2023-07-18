import {KHALA_ENDPOINTS, PHALA_ENDPOINTS} from '@/config'
import createPolkadotApi from '@/lib/createPolkadotApi'
import {chainAtom} from '@/store/common'
import {type ApiPromise} from '@polkadot/api'
import {useAtom} from 'jotai'
import useSWRImmutable from 'swr/immutable'

const usePolkadotApi = (): ApiPromise | undefined => {
  const [chain] = useAtom(chainAtom)
  const {data: polkadotApi} = useSWRImmutable(
    [chain === 'khala' ? KHALA_ENDPOINTS : PHALA_ENDPOINTS, 'polkadotApi'],
    createPolkadotApi,
  )

  return polkadotApi
}

export default usePolkadotApi
