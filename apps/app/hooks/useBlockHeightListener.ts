import {subsquidClient} from '@/lib/graphql'
import {useGlobalStateQuery} from '@/lib/subsquidQuery'
import {useQueryClient} from '@tanstack/react-query'
import {useEffect, useRef} from 'react'

const useBlockHeightListener = () => {
  const enabled = useRef(false)
  const {data} = useGlobalStateQuery(
    subsquidClient,
    {},
    {refetchInterval: 1000}
  )
  const queryClient = useQueryClient()
  const height = data?.globalStateById?.height

  useEffect(() => {
    if (height && queryClient) {
      if (enabled.current) {
        queryClient.invalidateQueries(['AccountById'])
        queryClient.invalidateQueries(['BasePoolById'])
        queryClient.invalidateQueries(['BasePoolsConnection.infinite"'])
        queryClient.invalidateQueries(['BasePoolWhitelistsConnection'])
        queryClient.invalidateQueries(['DelegationById'])
        queryClient.invalidateQueries(['DelegationsConnection'])
        queryClient.invalidateQueries(['DelegationsConnection.infinite'])
        queryClient.invalidateQueries(['WorkersConnection'])
      } else {
        // Skip the first time
        enabled.current = true
      }
    }
  }, [queryClient, height])
}

export default useBlockHeightListener
