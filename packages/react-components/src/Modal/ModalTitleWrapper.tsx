import {down} from 'styled-breakpoints'
import styled from 'styled-components'

export const ModalTitleWrapper = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-size: 32px;
  line-height: 32px;
  margin: 0;
  padding: 20px 0 40px;

  ${down('lg')} {
    font-size: 20px;
    line-height: 20px;
    padding: 20px 0 20px;
  }
`
