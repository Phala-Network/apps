import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      phala: string
      khala: string
    }
    breakpoints?: {
      sm: string
      md: string
      lg: string
      xl: string
    }
  }
}
