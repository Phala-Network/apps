import {createLightTheme} from 'baseui'
import {DefaultTheme} from 'styled-components'
import {Breakpoints, MediaQuery} from 'baseui/theme'

const theme: DefaultTheme = {
  colors: {
    phala: '#D1FF52',
    khala: '#03FFFF',
  },
}

const breakpoints: Breakpoints = {
  small: 576,
  medium: 768,
  large: 992,
}

const mediaQuery: MediaQuery = {
  small: '@media screen and (max-width: 576px)',
  medium: '@media screen and (max-width: 768px)',
  large: '@media screen and (max-width: 992px)',
}

const overrides = {
  breakpoints,
  mediaQuery,
  lighting: {
    shallowAbove: '0px -4px 16px rgba(0, 0, 0, 0.06',
    shallowBelow: '0px 4px 16px rgba(0, 0, 0, 0.06)',
  },
}

export const baseTheme = createLightTheme(
  {
    accent: '#D1FF52',
  },
  overrides
)

export default theme
