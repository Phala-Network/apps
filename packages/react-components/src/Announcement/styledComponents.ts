import styled from 'styled-components'

export const Link = styled.a`
  text-decoration-line: underline;
  color: #03b8ff;

  &:hover {
    opacity: 0.8;
  }
`

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: white;
  padding: 12px 24px;
  box-sizing: border-box;
`

export const Content = styled.div`
  flex: 1;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 17px;
  color: #202020;
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
