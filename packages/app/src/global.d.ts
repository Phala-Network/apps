declare module '*.png'

declare module '*.jpg' {
  const value: any
  export = value
}

declare module '*.svg' {
  const content: any
  export default content
}

interface Window {
  injectedWeb3: any
  web3: any
  zESettings?: any
}
