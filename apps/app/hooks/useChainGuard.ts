import {chainAtom} from '@/store/common'
import {useAtom} from 'jotai'
import {useRouter} from 'next/router'
import {useEffect} from 'react'

const useChainGuard = () => {
  const {pathname, replace} = useRouter()
  const [chain] = useAtom(chainAtom)

  useEffect(() => {
    if (pathname !== '/' && chain === 'phala') {
      replace('/')
    }
  }, [chain, pathname, replace])
}

export default useChainGuard
