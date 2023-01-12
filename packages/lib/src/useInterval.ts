import {useEffect, useRef} from 'react'

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback)
  savedCallback.current = callback
  useEffect(() => {
    if (!delay && delay !== 0) {
      return
    }
    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}
