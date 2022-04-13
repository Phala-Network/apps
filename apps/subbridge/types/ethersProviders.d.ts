import type {} from '@ethersproject/providers'
import type {MetaMaskInpageProvider} from '@metamask/providers'

declare module '@ethersproject/providers' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface ExternalProvider extends MetaMaskInpageProvider {}
}
