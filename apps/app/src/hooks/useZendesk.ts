import {useEffect} from 'react'

function insertScript() {
  const script = document.createElement('script')
  script.defer = true
  script.id = 'ze-snippet'
  script.src =
    'https://static.zdassets.com/ekr/snippet.js?key=fca22f47-80b0-47a4-8cde-80ca1fe206d2'
  document.body.appendChild(script)
}

// use the Web Widget (Classic)
// re-position: https://developer.zendesk.com/api-reference/widget/settings/?_ga=2.264317322.488128662.1641529242-1063742040.1641529242#offset
const useZendesk = () => {
  useEffect(() => {
    if (!window.zE) {
      insertScript()
      window.zESettings = {
        webWidget: {
          offset: {
            mobile: {
              vertical: '70px',
            },
          },
        },
      }
    }
    return () => {
      if (!window.zE) {
        return
      }
      delete window.zE
      delete window.zESettings
    }
  }, [])
}

export default useZendesk
