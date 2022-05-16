import React from 'react'
import {down} from 'styled-breakpoints'
import styled from 'styled-components'
import {ModalButtonWrapper, ModalWrapper} from '../Modal'

const Content = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-size: 16px;
  line-height: 16px;
  color: #111111;
`

const ModalFooter = styled.div`
  padding: 30px 0 0;

  ${down('lg')} {
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
