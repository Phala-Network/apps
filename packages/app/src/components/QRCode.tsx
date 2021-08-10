import React from 'react'
import { QRCode as ReactQrSvg } from 'react-qr-svg'

type Props = React.ComponentProps<typeof ReactQrSvg>

const QRCode: React.FC<Props> = (props) => {
  const { value, style, ...others } = props

  return (
    <ReactQrSvg
      bgColor='#FFFFFF'
      fgColor='#000000'
      level='Q'
      style={{
        backgroundColor: 'white',
        border: '6px solid white',
        ...style,
      }}
      value={value.toString()}
      {...others}
    />
  )
}

export default QRCode
