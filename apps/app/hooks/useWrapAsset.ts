import {assetVisibleAtom} from '@/store/ui'
import {useAtom} from 'jotai'
import {useCallback} from 'react'

const useWrapAsset = (): (<T>(asset: T) => string | T) => {
  const [assetVisible] = useAtom(assetVisibleAtom)
  return useCallback(
    <T>(asset: T): T | string => {
      return assetVisible ? asset : '***'
    },
    [assetVisible],
  )
}

export default useWrapAsset
