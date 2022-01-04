import {FC} from 'react'
import Ethereum from './images/Ethereum.jpg'
import Khala from './images/Khala.jpg'
import Phala from './images/Phala.jpg'

const images = {
  Ethereum,
  Khala,
  Phala,
} as const

interface NetworkIconProps {
  network: keyof typeof images
}

export const NetworkIcon: FC<NetworkIconProps> = (props) => {
  const {network} = props

  return (
    <img
      style={{
        width: 54,
        height: 54,
      }}
      src={images[network]}
      alt={network}
      {...props}
    />
  )
}
