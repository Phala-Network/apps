import {useGlobalStateQuery} from '@/lib/subsquidQuery'
import {subsquidClientAtom} from '@/store/common'
import {useQueryClient} from '@tanstack/react-query'
import {useAtom} from 'jotai'
import {useEffect, useRef} from 'react'

const useListenBlockHeight = (): void => {
  const enabled = useRef(false)
  const [subsquidClient] = useAtom(subsquidClientAtom)
  const {data: globalStateData} = useGlobalStateQuery(
    subsquidClient,
    undefined,
    {
      refetchInterval: 3000,
      select: (data) => data.globalStateById,
    },
  )
  const queryClient = useQueryClient()
  const height = globalStateData?.height

  useEffect(() => {
    if (height != null) {
      if (enabled.current) {
        void queryClient.invalidateQueries({queryKey: ['AccountById']})
        void queryClient.invalidateQueries({queryKey: ['BasePoolById']})
        void queryClient.invalidateQueries({
          queryKey: ['BasePoolsConnection.infinite'],
        })
        void queryClient.invalidateQueries({
          queryKey: ['BasePoolWhitelistsConnection'],
        })
        void queryClient.invalidateQueries({queryKey: ['DelegationById']})
        void queryClient.invalidateQueries({
          queryKey: ['DelegationsConnection'],
        })
        void queryClient.invalidateQueries({
          queryKey: ['DelegationsConnection.infinite'],
        })
        void queryClient.invalidateQueries({queryKey: ['WorkersConnection']})
        void queryClient.invalidateQueries({queryKey: ['OwnedVaults']})
        void queryClient.invalidateQueries({queryKey: ['ClaimableStakePools']})
        void queryClient.invalidateQueries({queryKey: ['lockedWrappedBalance']})
        void queryClient.invalidateQueries({queryKey: ['assetBalance']})
      } else {
        // Skip the first time
        enabled.current = true
      }
    }
  }, [queryClient, height])
}

export default useListenBlockHeight
