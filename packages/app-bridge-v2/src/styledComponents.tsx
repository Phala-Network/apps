import {up} from 'styled-breakpoints'
import styled from 'styled-components'

export const Root = styled.div`
  ${up('md')} {
    width: 672px;
    margin: 0;
  }
`

export const BlockItem = styled.div`
  filter: drop-shadow(0px 16px 48px rgba(0, 0, 0, 0.1));
  width: 100%;
  margin-top: 20px;
`
