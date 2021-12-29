import React from 'react'
import styled from 'styled-components'
import {ModalFooter, ModalButton} from 'baseui/modal'
import {ModalWrapper} from '../Modal'

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
      <ModalFooter style={{padding: 0, margin: '30px 0 0 0'}}>
        <ModalButton
          onClick={() => props.onClose()}
          overrides={{
            BaseButton: {
              style: () => ({
                width: '100%',
                backgroundColor: '#EEEEEE',
                fontFamily: 'Montserrat',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: '20px',
                paddingTop: '16px',
                paddingBottom: '16px',
                color: '#111111',
                ':hover': {
                  backgroundColor: '#D1FF52',
                },
              }),
            },
          }}
        >
          Cancel
        </ModalButton>
      </ModalFooter>
    </ModalWrapper>
  )
}
