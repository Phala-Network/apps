import type {} from '@ethersproject/providers'
import type {MetaMaskInpageProvider} from '@metamask/providers'

declare module '@ethersproject/providers' {
  export interface ExternalProvider extends MetaMaskInpageProvider {}
}
