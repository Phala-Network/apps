import {useClickAway} from '@phala/react-hooks'
import {FC, useEffect, useRef, useState} from 'react'
import {down} from 'styled-breakpoints'
import styled from 'styled-components'
import {Backdrop} from '../Backdrop'
import {FloatModalHeader} from './FloatModalHeader'

const Root = styled.div`
  width: 210px;
  height: 44px;
  margin-left: auto;
  bottom: 48px;
  transform: translate3d(0, 0, 0);
  background: #000000;
  color: white;
  box-sizing: border-box;
  z-index: 950;
  transition: all 0.2s ease;

  ${down('sm')} {
    position: fixed;
    left: 16px;
    bottom: 16px;
    border: none;
  }

  &.active {
    width: 420px;
    height: 191px;
    box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.3);
    background: white;
    color: black;

    ${down('sm')} {
      width: 100%;
      left: 0;
      bottom: 0;
    }
  }
`

export interface FloatModalProps {
  title?: string
  children?: React.ReactNode
  onActive?(value: boolean): void
}

export const FloatModal: FC<FloatModalProps> = (props) => {
  const {title, onActive, children} = props
  const [active, setActive] = useState(false)
  const rootRef = useRef(null)

  useClickAway(rootRef, () => {
    setActive(false)
  })

  useEffect(() => {
    onActive?.(active)
  }, [onActive, active])

  return (
    <>
      <Backdrop visible={active} zIndex={900} />
      <Root ref={rootRef} className={active ? 'active' : ''}>
        <FloatModalHeader
          active={active}
          onClickHeader={() => setActive((prev) => !prev)}>
          {title}
        </FloatModalHeader>

        {active && children}
      </Root>
    </>
  )
}
