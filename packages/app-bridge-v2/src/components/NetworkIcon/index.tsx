import {DetailedHTMLProps, FC, ImgHTMLAttributes} from 'react'
import Ethereum from './images/Ethereum.jpg'
import Khala from './images/Khala.jpg'
import Phala from './images/Phala.jpg'

type Image = FC<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
>

export const EthereumIcon: Image = (props) => (
  <img src={Ethereum} alt="Ethereum" {...props} />
)

export const KhalaIcon: Image = (props) => (
  <img src={Khala} alt="Khala" {...props} />
)

export const PhalaIcon: Image = (props) => (
  <img src={Phala} alt="Phala" {...props} />
)
