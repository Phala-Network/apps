import {chainAtom} from '@/store/common'
import {useAtom} from 'jotai'
import {useRouter} from 'next/router'
import {useEffect} from 'react'

const useSyncPath = (): void => {
  const router = useRouter()
  const [chain] = useAtom(chainAtom)
  useEffect(() => {
    if (router.query.chain !== chain && router.isReady) {
      void router.replace(
        router.asPath.replace(/^\/(phala|khala)/, `/${chain}`),
        undefined,
        {shallow: true},
      )
    }
  }, [chain, router, router.isReady, router.query.chain, router.asPath])
}

export default useSyncPath
