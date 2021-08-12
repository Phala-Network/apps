import React, { createElement } from 'react'
import { createPortal } from 'react-dom'
import { down } from 'styled-breakpoints'
import styled, { css } from 'styled-components'
import usePortal from '../hooks/usePortal'
import Backdrop from './Backdrop'

export type ModalProps = {
  visible: boolean
  onClose?: () => void
  title?: React.ReactNode
  bodyStyle?: React.CSSProperties
  actions?: React.ReactNode[]
}

const Wrap = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Content = styled.div`
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

  ${down('sm')} {
    width: calc(100vw - 30px);
    box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.3);

    &:hover {
      box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.4);
    }
  }
`

const Title = styled.div`
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

export const ModalAction = styled.div<{ full?: boolean }>`
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

const Modal: React.FC<ModalProps> = (props) => {
  const {
    children,
    title,
    visible = false,
    onClose,
    bodyStyle,
    actions,
  } = props
  const portal = usePortal('modal')

  if (!portal) return null

  return createPortal(
    <Backdrop onClick={onClose} visible={visible}>
      <Wrap>
        <Content style={bodyStyle}>
          {title && <Title>{title}</Title>}
          {children}

          {actions && actions?.length > 0 && (
            <ModalActions>
              {actions?.map((item) => {
                return createElement(ModalAction, null, item)
              })}
            </ModalActions>
          )}
        </Content>
      </Wrap>
    </Backdrop>,
    portal
  )
}

export default Modal
