import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

export type ElementStackItem = {
  last: string
}

export type BodyScrollOptions = {
  scrollLayer: boolean
}

const defaultOptions: BodyScrollOptions = {
  scrollLayer: false,
}

const elementStack = new Map<HTMLElement, ElementStackItem>()

const isIos = () => {
  /* istanbul ignore next */
  if (typeof window === 'undefined' || !window.navigator) return false
  return /iP(ad|hone|od)/.test(window.navigator.platform)
}

const touchHandler = (event: TouchEvent): boolean => {
  if (event.touches && event.touches.length > 1) return true
  event.preventDefault()
  return false
}

const useBodyScroll = (
  options?: BodyScrollOptions
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const elRef = useRef<HTMLElement>(document.body)
  const [hidden, setHidden] = useState<boolean>(false)
  const safeOptions = {
    ...defaultOptions,
    ...(options || {}),
  }

  // don't prevent touch event when layer contain scroll
  const isIosWithCustom = useCallback(() => {
    if (safeOptions.scrollLayer) return false
    return isIos()
  }, [safeOptions.scrollLayer])

  useEffect(() => {
    if (!elRef || !elRef.current) return
    const lastOverflow = elRef.current.style.overflow
    if (hidden) {
      if (elementStack.has(elRef.current)) return
      if (!isIosWithCustom()) {
        elRef.current.style.overflow = 'hidden'
      } else {
        document.addEventListener('touchmove', touchHandler, { passive: false })
      }
      elementStack.set(elRef.current, {
        last: lastOverflow,
      })
      return
    }

    // reset element overflow
    if (!elementStack.has(elRef.current)) return
    if (!isIosWithCustom()) {
      const store = elementStack.get(elRef.current) as ElementStackItem
      elRef.current.style.overflow = store.last
    } else {
      document.removeEventListener('touchmove', touchHandler)
    }
    elementStack.delete(elRef.current)
  }, [hidden, elRef, isIosWithCustom])

  return [hidden, setHidden]
}

export default useBodyScroll
