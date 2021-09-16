import {down} from 'styled-breakpoints'
import {useBreakpoint} from 'styled-breakpoints/react-styled'

export const useIsMobile = () => useBreakpoint(down('sm'))
