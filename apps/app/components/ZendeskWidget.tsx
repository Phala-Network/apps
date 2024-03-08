import Script from 'next/script'
import type {FC} from 'react'

declare global {
  interface Window {
    zESettings: unknown
  }
}

const ZendeskWidget: FC = () => {
  return (
    <Script
      id="ze-snippet"
      src="https://static.zdassets.com/ekr/snippet.js?key=fca22f47-80b0-47a4-8cde-80ca1fe206d2"
      defer
    />
  )
}

export default ZendeskWidget
