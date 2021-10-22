import styled, {keyframes} from 'styled-components'
import * as Icon from 'react-feather'
import {ButtonProps} from './Button'

export const ButtonWrap = styled.button<ButtonProps>`
  position: relative;
  align-items: center;
  display: flex;
  font-family: Lato;
  font-size: ${({size}) => (size === 'small' ? '12px' : '16px')};
  font-style: normal;
  font-weight: bold;
  height: ${({size}) => (size === 'small' ? '32px' : '56px')};
  justify-content: center;
  line-height: 19px;
  order: 1;
  padding: ${({size}) => (size === 'small' ? '0 12px' : '0 24px')};
  text-align: center;
  border-width: 3px;
  border-style: solid;
  border-color: transparent;
  border-radius: ${(props) => (props.shape === 'round' ? 56 : 0)}px;
  color: #494949;
  background: ${({type, theme}) => {
    if (type === 'plain') return 'none'
    if (type === 'primary') return theme.colors.phala
    return '#ececec'
  }};

  &:disabled {
    color: rgba(32, 32, 32, 0.3);
  }

  &:not(:disabled):hover {
    border-color: #494949;
  }

  &:active {
    background: #ececec;
    border-color: transparent;
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Loading = styled(Icon.Loader).attrs({size: 16})`
  animation: ${rotate} 3s linear infinite;
  margin-right: 4px;
`
