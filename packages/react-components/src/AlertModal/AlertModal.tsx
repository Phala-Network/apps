import React from 'react'
import styled from 'styled-components'
import {ModalFooter} from 'baseui/modal'
import {ModalWrapper, ModalButtonWrapper} from '../Modal'

const Content = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 16px;
  color: #111111;
`

export type AlertModalProps = {
  content: React.ReactNode
  visible: boolean
  onClose: () => void
}

export const AlertModal: React.FC<AlertModalProps> = (props) => {
  return (
    <ModalWrapper {...props} title="Alert">
      <Content>{props.content}</Content>
      <ModalFooter style={{padding: 0, margin: '30px 0 0'}}>
        <ModalButtonWrapper onClick={props.onClose}>Cancel</ModalButtonWrapper>
      </ModalFooter>
    </ModalWrapper>
  )
}
