import {down} from 'styled-breakpoints'
import styled from 'styled-components'

export const Link = styled.a`
  text-decoration-line: underline;
  color: #03b8ff;

  &:hover {
    opacity: 0.8;
  }
`

export const Container = styled.div`
  background: #f3ffd3;
  display: flex;
  align-items: center;
  padding: 12px 24px;
  box-sizing: border-box;
  margin: 0 -95px 18px -95px;

  ${down('lg')} {
    margin: 0 0 18px 0;
  }
`

export const Content = styled.div`
  flex: 1;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #111111;
`

export const NotificationIcon = styled.div`
  margin-right: 24px;
  display: flex;
  align-items: center;
`

export const CloseIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  cursor: pointer;
  transition: all 0.2s linear;

  &:hover {
    transform: scale(1.2);
  }
  &:active {
    transform: scale(0.9);
  }
`
