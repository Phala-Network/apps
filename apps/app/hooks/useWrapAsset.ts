import {assetVisibleAtom} from '@/store/ui'
import {useAtom} from 'jotai'
import {useCallback} from 'react'

const useWrapAsset = () => {
  const [assetVisible] = useAtom(assetVisibleAtom)
  return useCallback(
    (asset: unknown) => {
      return assetVisible ? asset : '***'
    },
    [assetVisible]
  )
}

export default useWrapAsset
