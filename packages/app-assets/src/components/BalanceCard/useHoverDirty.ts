import {RefObject, useEffect, useState} from 'react'

export function on<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args:
    | Parameters<T['addEventListener']>
    | [string, () => void | null, ...any]
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(
      ...(args as Parameters<HTMLElement['addEventListener']>)
    )
  }
}

export function off<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args:
    | Parameters<T['removeEventListener']>
    | [string, () => void | null, ...any]
): void {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(
      ...(args as Parameters<HTMLElement['removeEventListener']>)
    )
  }
}

// kudos: https://usehooks.com/
const useHoverDirty = (ref: RefObject<Element>, enabled = true) => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof ref !== 'object' || typeof ref.current === 'undefined') {
      console.error('useHoverDirty expects a single ref argument.')
    }
  }

  const [value, setValue] = useState(false)

  useEffect(() => {
    const onMouseOver = () => setValue(true)
    const onMouseOut = () => setValue(false)

    if (enabled && ref && ref.current) {
      on(ref.current, 'mouseover', onMouseOver)
      on(ref.current, 'mouseout', onMouseOut)
    }

    // fixes react-hooks/exhaustive-deps warning about stale ref elements
    const {current} = ref

    return () => {
      if (enabled && current) {
        off(current, 'mouseover', onMouseOver)
        off(current, 'mouseout', onMouseOut)
      }
    }
  }, [enabled, ref])

  return value
}

export default useHoverDirty
