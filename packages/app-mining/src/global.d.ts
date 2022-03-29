declare module '*.png' {
  const content: any
  export default content
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GATSBY_METABASE_SECRET_KEY: string
    }
  }
}

export {}
