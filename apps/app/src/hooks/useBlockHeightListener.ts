import {useEffect, useRef} from 'react'
import {subsquidClient} from '../utils/GraphQLClient'
import {useGlobalStateQuery} from './subsquid'

const useBlockHeightListener = (callback: () => void) => {
  const enabled = useRef(false)
  const callbackRef = useRef(callback)
  callbackRef.current = callback
  const {data} = useGlobalStateQuery(
    subsquidClient,
    {},
    {refetchInterval: 1000}
  )

  const height = data?.globalStateById?.height

  useEffect(() => {
    if (height) {
      if (enabled.current) {
        callbackRef.current()
      } else {
        // Skip the first time
        enabled.current = true
      }
    }
  }, [height])
}

export default useBlockHeightListener
