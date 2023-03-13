import {subsquidClient} from '@/lib/graphql'
import {useGlobalStateQuery} from '@/lib/subsquidQuery'
import {chainAtom} from '@/store/common'
import {useQueryClient} from '@tanstack/react-query'
import {useAtom} from 'jotai'
import {useEffect, useRef} from 'react'

const useBlockHeightListener = (): void => {
  const [chain] = useAtom(chainAtom)
  const enabled = useRef(false)
  const {data: squidStatus} = useGlobalStateQuery(
    subsquidClient,
    {},
    {
      refetchInterval: 3000,
      enabled: chain === 'khala',
      select: (data) => data.squidStatus,
    }
  )
  const queryClient = useQueryClient()
  const height = squidStatus?.height

  useEffect(() => {
    if (height != null && chain === 'khala') {
      if (enabled.current) {
        void queryClient.invalidateQueries(['AccountById'])
        void queryClient.invalidateQueries(['BasePoolById'])
        void queryClient.invalidateQueries(['BasePoolsConnection.infinite'])
        void queryClient.invalidateQueries(['BasePoolWhitelistsConnection'])
        void queryClient.invalidateQueries(['DelegationById'])
        void queryClient.invalidateQueries(['DelegationsConnection'])
        void queryClient.invalidateQueries(['DelegationsConnection.infinite'])
        void queryClient.invalidateQueries(['WorkersConnection'])
        void queryClient.invalidateQueries(['OwnedVaults'])
        void queryClient.invalidateQueries(['ClaimableStakePools'])
      } else {
        // Skip the first time
        enabled.current = true
      }
    }
  }, [queryClient, height, chain])
}

export default useBlockHeightListener
