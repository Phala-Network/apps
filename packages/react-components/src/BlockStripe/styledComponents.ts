import styled from 'styled-components'
import {RootProps} from './BlockStripe'

export const Root = styled.div<RootProps>`
  position: relative;
  width: ${(props) => props.blockSize * props.column}px;
  height: ${(props) => props.blockSize * props.row}px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props) => (props.column > props.row ? 'column' : 'row')};
`

export const Inner = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`
