import {createGlobalStyle} from 'styled-components'
import {reactToastifyGlobalStyle} from './reactToastifyGlobalStyle'
import {tooltipGlobalStyle} from './tooltipGlobalStyle'

export const ComponentsGlobalStyle = createGlobalStyle`
  ${reactToastifyGlobalStyle}
  ${tooltipGlobalStyle}
`
