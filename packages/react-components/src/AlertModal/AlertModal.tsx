import React from 'react'
import styled from 'styled-components'
import {down} from 'styled-breakpoints'
import {ModalWrapper, ModalButtonWrapper} from '../Modal'

const Content = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 16px;
  color: #111111;
`

const ModalFooter = styled.div`
  padding: 30px 0 0;

  ${down('md')} {
    padding: 20px 0 0;
  }
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
      <ModalFooter>
        <ModalButtonWrapper onClick={props.onClose}>Cancel</ModalButtonWrapper>
      </ModalFooter>
    </ModalWrapper>
  )
}
