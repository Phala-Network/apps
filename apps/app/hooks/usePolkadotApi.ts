import {KHALA_ENDPOINTS, PHALA_ENDPOINTS} from '@/config'
import createPolkadotApi from '@/lib/createPolkadotApi'
import {chainAtom} from '@/store/polkadot'
import {useAtom} from 'jotai'
import useSWRImmutable from 'swr/immutable'

const usePolkadotApi = () => {
  const [chain] = useAtom(chainAtom)
  const {data: polkadotApi} = useSWRImmutable(
    [chain === 'khala' ? KHALA_ENDPOINTS : PHALA_ENDPOINTS],
    createPolkadotApi
  )

  return polkadotApi
}

export default usePolkadotApi
