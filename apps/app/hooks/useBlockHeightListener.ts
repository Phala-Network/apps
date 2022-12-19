import {subsquidClient} from '@/lib/graphql'
import {useGlobalStateQuery} from '@/lib/subsquidQuery'
import {chainAtom} from '@/store/common'
import {useQueryClient} from '@tanstack/react-query'
import {useAtom} from 'jotai'
import {useEffect, useRef} from 'react'

const useBlockHeightListener = () => {
  const [chain] = useAtom(chainAtom)
  const enabled = useRef(false)
  const {data} = useGlobalStateQuery(
    subsquidClient,
    {},
    {refetchInterval: 3000, enabled: chain === 'khala'}
  )
  const queryClient = useQueryClient()
  const height = data?.squidStatus?.height

  useEffect(() => {
    if (height && queryClient && chain === 'khala') {
      if (enabled.current) {
        queryClient.invalidateQueries(['AccountById'])
        queryClient.invalidateQueries(['BasePoolById'])
        queryClient.invalidateQueries(['BasePoolsConnection.infinite'])
        queryClient.invalidateQueries(['BasePoolWhitelistsConnection'])
        queryClient.invalidateQueries(['DelegationById'])
        queryClient.invalidateQueries(['DelegationsConnection'])
        queryClient.invalidateQueries(['DelegationsConnection.infinite'])
        queryClient.invalidateQueries(['WorkersConnection'])
        queryClient.invalidateQueries(['OwnedVaults'])
        queryClient.invalidateQueries(['ClaimableStakePools'])
      } else {
        // Skip the first time
        enabled.current = true
      }
    }
  }, [queryClient, height, chain])
}

export default useBlockHeightListener
