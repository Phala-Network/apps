declare module '*.png'

declare module '*.svg' {
  const content: any
  export default content
}

interface Window {
  injectedWeb3: any
  web3: any
  zE?: any
  zESettings?: any
}
