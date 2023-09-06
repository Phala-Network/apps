import {type Eip1193Provider} from 'ethers'
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
      readonly CONTEXT: 'production' | 'deploy-preview' | 'branch-deploy'
    }
  }

  interface Window {
    ethereum?: Eip1193Provider
  }
}

export {}
