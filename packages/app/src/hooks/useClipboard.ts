import usePortal from './usePortal'
import warning from '../utils/warning'

export type UseClipboardOptions = {
  onError: () => unknown
}

export type UseClipboardResult = {
  copy: (text: string) => void
}

const defaultOptions: UseClipboardOptions = {
  onError: () => warning('Failed to copy.', 'use-clipboard'),
}

const useClipboard = (
  options: UseClipboardOptions = defaultOptions
): UseClipboardResult => {
  const el = usePortal('clipboard')

  const copyText = (el: HTMLElement | null, text: string) => {
    if (!el || !text) return
    const selection = window.getSelection()
    if (!selection) return

    el.style.whiteSpace = 'pre'
    el.textContent = text

    const range = window.document.createRange()
    selection.removeAllRanges()
    range.selectNode(el)
    selection.addRange(range)

    try {
      window.document.execCommand('copy')
    } catch (e) {
      options.onError && options.onError()
    }

    selection.removeAllRanges()
    if (el) {
      el.textContent = ''
    }
  }

  const copy = (text: string) => {
    copyText(el, text)
  }

  return { copy }
}

export default useClipboard
