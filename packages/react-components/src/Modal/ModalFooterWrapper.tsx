import {down} from 'styled-breakpoints'
import styled from 'styled-components'

export const ModalFooterWrapper = styled.div`
  padding: 40px 0 20px;
  margin: 0;

  ${down('lg')} {
    padding: 20px 0 20px;
  }
`
