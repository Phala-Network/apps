import Script from 'next/script'
import {FC} from 'react'

// https://nextjs.org/docs/messages/next-script-for-ga
const GtagScript: FC = () => {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-QMSFC1R9JT"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-QMSFC1R9JT');
        `}
      </Script>
    </>
  )
}

export default GtagScript
