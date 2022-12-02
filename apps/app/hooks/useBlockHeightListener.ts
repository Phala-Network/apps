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
        queryClient.invalidateQueries(['BasePoolsConnection.infinite"'])
      } else {
        // Skip the first time
        enabled.current = true
      }
    }
  }, [queryClient, height])
}

export default useBlockHeightListener
