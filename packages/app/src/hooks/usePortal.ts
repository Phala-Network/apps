import { useEffect, useState } from 'react'
import useSSR from './useSSR'

const createElement = (id: string): HTMLElement => {
  const el = document.createElement('div')
  el.setAttribute('id', id)
  return el
}

const usePortal = (
  selectId: string,
  getContainer?: () => HTMLElement | null
): HTMLElement | null => {
  const id = selectId
  const { isBrowser } = useSSR()
  const [elSnapshot, setElSnapshot] = useState<HTMLElement | null>(
    isBrowser ? createElement(id) : null
  )

  useEffect(() => {
    const customContainer = getContainer?.()
    const parentElement = customContainer || document.body
    const hasElement = parentElement.querySelector<HTMLElement>(`#${id}`)
    const el = hasElement || createElement(id)

    if (!hasElement) {
      parentElement.appendChild(el)
    }
    setElSnapshot(el)
  }, [getContainer, id])

  return elSnapshot
}

export default usePortal
