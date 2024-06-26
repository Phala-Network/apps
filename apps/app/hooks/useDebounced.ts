import {debounce} from 'radash'
import {useEffect, useMemo, useState} from 'react'

const useDebounced = <T>(state: T, delay = 500): T => {
  const [debouncedState, setDebouncedState] = useState(state)
  const debouncedSetState = useMemo(
    () => debounce({delay}, setDebouncedState),
    [delay],
  )

  useEffect(() => {
    debouncedSetState(state)
  }, [state, debouncedSetState])

  return debouncedState
}

export default useDebounced
