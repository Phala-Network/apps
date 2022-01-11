import styled from 'styled-components'
import {down} from 'styled-breakpoints'

export const ModalFooterWrapper = styled.div`
  padding: 40px 0 20px;
  margin: 0;

  ${down('md')} {
    padding: 20px 0 20px;
  }
`
