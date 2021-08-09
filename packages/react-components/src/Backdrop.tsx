import React, { MouseEvent, useCallback } from 'react'
import styled from 'styled-components'
import useCurrentState from '../hooks/useCurrentState'

const Wrap = styled.div`
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

const Layer = styled.div`
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

const Content = styled.div`
  position: relative;
  z-index: 1001;
  outline: none;
  width: 100%;
  margin: 20px auto;
  vertical-align: middle;
  display: inline-block;
`

type Props = {
  onClick?: (event: MouseEvent<HTMLElement>) => void
  visible?: boolean
}

const Backdrop: React.FC<Props> = ({
  children,
  onClick,
  visible = false,
  ...props
}) => {
  const [, setIsContentMouseDown, IsContentMouseDownRef] = useCurrentState(
    false
  )
  const clickHandler = (event: MouseEvent<HTMLElement>) => {
    if (IsContentMouseDownRef.current) return
    onClick && onClick(event)
  }
  const childrenClickHandler = useCallback((event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
  }, [])
  const mouseUpHandler = () => {
    if (!IsContentMouseDownRef.current) return
    const timer = setTimeout(() => {
      setIsContentMouseDown(false)
      clearTimeout(timer)
    }, 0)
  }

  if (!visible) return null

  return (
    <Wrap
      className="backdrop"
      onClick={clickHandler}
      onMouseUp={mouseUpHandler}
      {...props}>
      <Layer></Layer>
      <Content
        onClick={childrenClickHandler}
        className="content"
        onMouseDown={() => setIsContentMouseDown(true)}>
        {children}
      </Content>
    </Wrap>
  )
}

export default Backdrop
