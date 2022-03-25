import {FC} from 'react'
import PHA from './images/PHA.jpg'

const images = {
  PHA,
} as const

export interface CoinIconProps {
  coin: string
}

export const CoinIcon: FC<CoinIconProps> = (props) => {
  const {coin} = props

  return (
    <img
      style={{
        width: 54,
        height: 54,
        display: 'block',
      }}
      src={images[coin as keyof typeof images]}
      alt={coin}
      {...props}
    />
  )
}
