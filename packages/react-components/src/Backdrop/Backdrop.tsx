import {useCurrentState} from '@phala/react-hooks'
import React, {MouseEvent, useCallback} from 'react'
import {Content, Layer, Wrap} from './styledComponents'

export interface BackdropProps {
  onClick?: (event: MouseEvent<HTMLElement>) => void
  visible?: boolean
}

export const Backdrop: React.FC<BackdropProps> = ({
  children,
  onClick,
  visible = false,
  ...props
}) => {
  const [, setIsContentMouseDown, IsContentMouseDownRef] =
    useCurrentState(false)
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
      {...props}
    >
      <Layer></Layer>
      <Content
        onClick={childrenClickHandler}
        className="content"
        onMouseDown={() => setIsContentMouseDown(true)}
      >
        {children}
      </Content>
    </Wrap>
  )
}
