import {useClickAway} from '@phala/react-hooks'
import {forwardRef, useRef, useState} from 'react'
import {down} from 'styled-breakpoints'
import styled from 'styled-components'
import Backdrop from '../Backdrop'
import {FloatModalHeader} from './FloatModalHeader'

const Root = styled.div`
  position: fixed;
  width: 210px;
  height: 44px;
  right: 48px;
  bottom: 48px;
  transform: translate3d(0, 0, 0);
  background: #000000;
  color: white;
  box-sizing: border-box;
  z-index: 1000;
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
}

export const FloatModal = forwardRef<HTMLDivElement, FloatModalProps>(
  (props) => {
    const {title, children} = props
    const [active, setActive] = useState(false)
    const rootRef = useRef(null)

    useClickAway(rootRef, () => {
      setActive(false)
    })

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
)
