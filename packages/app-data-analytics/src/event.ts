declare global {
  interface Window {
    gtag: any
  }
}

type GtagData = Record<string, string | number | boolean>

export default function gtag(event: string, data: GtagData = {}): void {
  if (!event) return

  window?.gtag?.('event', event, {...data})
}

export function clickEvent(target: string, data: GtagData = {}): void {
  if (!target) return

  gtag('click', {
    target,
    ...data,
  })
}
