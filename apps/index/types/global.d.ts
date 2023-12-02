import {type Eip1193Provider} from 'ethers'
declare global {
  interface Window {
    ethereum?: Eip1193Provider
    dataLayer?: Array<Record<string, any>>
  }
}

export {}
