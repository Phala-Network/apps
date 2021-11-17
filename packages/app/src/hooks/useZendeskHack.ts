import {useWindowSize} from '@phala/react-hooks'
import {useEffect} from 'react'

export function useZendeskHack() {
  const {width = 0} = useWindowSize()
  const right = width < 660 ? '20px' : '48px'

  useEffect(() => {
    const timerId = setInterval(() => {
      const result: HTMLIFrameElement[] = Array.from(
        document.querySelectorAll('iframe[title]')
      )

      if (result.length === 0) return

      const chatContainer = document.querySelector(
        'div[role="presentation"] div'
      )

      if (chatContainer) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        chatContainer.style.right = right
      } else {
        return
      }

      result.forEach((iframe) => {
        iframe.style.right = right
        iframe.style.zIndex = '100'

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const svgs = iframe.contentDocument?.querySelectorAll(
          'div div button div svg'
        )

        if (svgs && svgs[0] && svgs[0].parentElement) {
          svgs[0].parentElement.innerHTML = `
            <svg width="64px" height="64px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><defs><style>.cls-1{fill:#111;}.cls-2{fill:none;stroke:#cdfa50;stroke-miterlimit:10;stroke-width:2px;}.cls-3{fill:#cdfa50;}</style></defs><rect class="cls-1" x="-5.28" y="-5.28" width="266.56" height="266.56"/><polygon class="cls-2" points="205.47 76.68 50.53 76.68 50.53 167.78 163.29 167.78 188.77 192.71 188.77 167.78 205.47 167.78 205.47 76.68"/><rect class="cls-3" x="86.03" y="117.48" width="9.5" height="9.5"/><rect class="cls-3" x="123.25" y="117.48" width="9.5" height="9.5"/><rect class="cls-3" x="160.47" y="117.48" width="9.5" height="9.5"/></svg>
          `

          clearInterval(timerId)
        }
      })

      return () => {
        clearInterval(timerId)
      }
    }, 200)
  }, [right])
}
