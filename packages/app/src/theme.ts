import {createLightTheme} from 'baseui'
import {DefaultTheme} from 'styled-components'

const theme: DefaultTheme = {
  colors: {
    phala: '#D1FF52',
    khala: '#03FFFF',
  },
}

export const baseTheme = createLightTheme({
  // TODO: add base theme here
  // primaryFontFamily: 'Lato',
})

export default theme
