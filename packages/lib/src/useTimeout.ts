'use client'
import {useEffect, useRef} from 'react'

export const useTimeout = (
  callback: () => void,
  delay: number | null,
): void => {
  const savedCallback = useRef(callback)
  savedCallback.current = callback
  useEffect(() => {
    if (delay == null) {
      return
    }
    const id = setTimeout(() => {
      savedCallback.current()
    }, delay)
    return () => {
      clearTimeout(id)
    }
  }, [delay])
}
