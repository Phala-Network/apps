import {usePortal} from '@phala/react-hooks'
import React, {createElement} from 'react'
import {createPortal} from 'react-dom'
import {Backdrop} from '../Backdrop'
import {
  Content,
  ModalAction,
  ModalActions,
  Title,
  Wrap,
} from './styledComponents'

export type ModalProps = {
  visible: boolean
  onClose?: () => void
  title?: React.ReactNode
  bodyStyle?: React.CSSProperties
  actions?: React.ReactNode[]
}

export const Modal: React.FC<ModalProps> = (props) => {
  const {children, title, visible = false, onClose, bodyStyle, actions} = props
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
