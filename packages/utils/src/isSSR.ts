// https://www.gatsbyjs.com/docs/using-client-side-only-packages/
export const isSSR = (): boolean => typeof window === 'undefined'
