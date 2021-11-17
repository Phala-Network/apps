import {useClickAway} from '@phala/react-hooks'
import {FC, useEffect, useRef, useState} from 'react'
import {down} from 'styled-breakpoints'
import styled from 'styled-components'
import {Backdrop} from '../Backdrop'
import {FloatModalHeader} from './FloatModalHeader'

const Root = styled.div`
  width: 210px;
  height: 44px;
  right: 48px;
  margin-left: auto;
  bottom: 48px;
  transform: translate3d(0, 0, 0);
  background: #000000;
  color: white;
  box-sizing: border-box;
  z-index: 9000;
  transition: all 0.2s ease;

  ${down('sm')} {
    right: 0;
    bottom: 0;
    border: none;
  }

  &.active {
    width: 420px;
    height: 191px;
    box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.3);
    background: white;
    color: black;

    ${down('sm')} {
      width: 100vw;
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
      <Backdrop visible={active} />
      <Root ref={rootRef} className={active ? 'active' : ''}>
        <FloatModalHeader
          active={active}
          onClickHeader={() => setActive((prev) => !prev)}
        >
          {title}
        </FloatModalHeader>

        {active && children}
      </Root>
    </>
  )
}
