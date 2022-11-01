import {useQueryClient} from '@tanstack/react-query'
import {useEffect, useRef} from 'react'
import {subsquidClient} from '../lib/graphqlClient'
import {useGlobalStateQuery} from './subsquid'

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
        queryClient.invalidateQueries(['AccountRewards'])
        queryClient.invalidateQueries(['StakePoolById'])
        queryClient.invalidateQueries(['StakePoolsConnection'])
        queryClient.invalidateQueries(['StakePoolWhitelistsConnection'])
        queryClient.invalidateQueries(['StakePoolStakesConnection'])
        queryClient.invalidateQueries(['WorkersConnection'])
        queryClient.invalidateQueries(['TokenomicParameters'])
      } else {
        // Skip the first time
        enabled.current = true
      }
    }
  }, [queryClient, height])
}

export default useBlockHeightListener
