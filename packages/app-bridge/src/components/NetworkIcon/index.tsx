import {FC} from 'react'
import Ethereum from './images/Ethereum.jpg'
import Khala from './images/Khala.jpg'
import Phala from './images/Phala.jpg'
import Karura from './images/Karura.jpg'

const images = {
  Ethereum,
  Khala,
  Phala,
  Karura,
} as const

export interface NetworkIconProps {
  network: keyof typeof images
}

export const NetworkIcon: FC<NetworkIconProps> = (props) => {
  const {network} = props

  return (
    <img
      style={{
        width: 55,
        height: 55,
        display: 'block',
      }}
      src={images[network]}
      alt={network}
      {...props}
    />
  )
}
