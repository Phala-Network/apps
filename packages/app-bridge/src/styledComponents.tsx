import {down, up} from 'styled-breakpoints'
import styled from 'styled-components'

export const Root = styled.div`
  margin: 20px;
  flex: 1;

  ${down('md')} {
    margin: 10px;
    padding: 10px;
  }
`

export const MainContent = styled.div`
  margin-top: 24px;
  ${up('md')} {
    width: 672px;
    margin: 0 auto;
    margin-top: 48px;
  }
`

export const BlockItem = styled.div`
  filter: drop-shadow(0px 16px 48px rgba(0, 0, 0, 0.1));
  width: 100%;
  margin-top: 20px;
`
