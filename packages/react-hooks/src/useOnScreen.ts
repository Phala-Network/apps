import {RefObject, useEffect, useState} from 'react'

export const useOnScreen = <T extends Element>(
  ref: RefObject<T>,
  options?: IntersectionObserverInit,
  enabled = true
) => {
  const {root, rootMargin, threshold} = options || {}
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const target = ref.current
    let observer: IntersectionObserver
    if (enabled) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setIntersecting(entry.isIntersecting)
        },
        {root, rootMargin, threshold}
      )
      if (target) {
        observer.observe(target)
      }
    }
    return () => {
      if (observer && target) {
        observer.unobserve(target)
      }
    }
  }, [root, rootMargin, threshold, ref, enabled])

  return isIntersecting
}

export const useOnScreenOnce = <T extends Element>(
  ref: RefObject<T>,
  options?: IntersectionObserverInit
) => {
  const [enabled, setEnabled] = useState(true)
  const isIntersecting = useOnScreen(ref, options, enabled)
  useEffect(() => {
    if (isIntersecting) {
      setEnabled(false)
    }
  }, [isIntersecting])

  return isIntersecting
}
