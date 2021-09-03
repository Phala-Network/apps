import styled from 'styled-components'

export const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  z-index: 1000;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  text-align: center;

  &:before {
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
    content: '';
  }
`

export const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  background-color: black;
  transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 1000;
`

export const Content = styled.div`
  position: relative;
  z-index: 1001;
  outline: none;
  width: 100%;
  margin: 20px auto;
  vertical-align: middle;
  display: inline-block;
`
