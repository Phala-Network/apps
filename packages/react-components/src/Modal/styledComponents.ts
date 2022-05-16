import {down} from 'styled-breakpoints'
import styled, {css} from 'styled-components'

export const Wrap = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`

export const Content = styled.div`
  width: 480px;
  background: #ffffff;
  box-shadow: 16px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 24px;
  transition: all 0.1s ease-in-out;
  text-align: left;
  box-sizing: border-box;

  &:hover {
    box-shadow: 16px 16px 0px rgba(0, 0, 0, 0.3);
  }

  ${down('md')} {
    width: calc(100vw - 30px);
    box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.3);

    &:hover {
      box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.4);
    }
  }
`

export const Title = styled.div`
  height: 48px;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #202020;
  margin-bottom: 16px;
`

export const ModalAction = styled.div<{full?: boolean}>`
  & + & {
    margin-left: 7px;
  }

  ${(props) =>
    props.full &&
    css`
      flex: 1;

      & > * {
        width: 100%;
      }
    `}
`

export const ModalActions = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
