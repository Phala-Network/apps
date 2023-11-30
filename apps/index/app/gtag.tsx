import Script from 'next/script'
import {FC} from 'react'

const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID

const Gtag: FC = () => {
  if (GA_MEASUREMENT_ID == null || process.env.NODE_ENV === 'development') {
    return null
  }
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      ></Script>
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}

export default Gtag
