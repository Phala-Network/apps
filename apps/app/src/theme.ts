import {createLightTheme, LightTheme} from 'baseui'
import {Breakpoints, MediaQuery} from 'baseui/theme'
import {DefaultTheme} from 'styled-components'

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

const typography = Object.keys(LightTheme.typography).reduce<
  Record<string, unknown>
>((acc, key) => {
  // Override Headings font weight to 600
  if (key.includes('Heading')) {
    acc[key] = {fontWeight: 600}
  }

  return acc
}, {})

const overrides = {
  breakpoints,
  mediaQuery,
  // lighting: {
  //   shallowAbove: '0px -4px 16px rgba(0, 0, 0, 0.05)',
  //   shallowBelow: '0px 4px 16px rgba(0, 0, 0, 0.05)',
  // },
  typography,
}

export const baseTheme = createLightTheme(
  {
    primaryFontFamily: 'Montserrat, system-ui',
    accent: '#D1FF52',
    primaryA: '#1A1A1A',
  },
  overrides
)

export default theme
