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

type Props = {
  visible: boolean
  onClose: () => void
}

export const PolkadotInstallModal: React.FC<Props> = (props) => {
  return (
    <ModalWrapper {...props} title="Alert">
      <Content>{`No Polkadot{.js} extension found, please install it first.`}</Content>
      <ModalFooter style={{padding: 0, margin: '30px 0 0'}}>
        <ModalButtonWrapper
          onClick={() => {
            window.open('https://polkadot.js.org/extension/')
            props.onClose()
          }}
        >
          Install
        </ModalButtonWrapper>
      </ModalFooter>
    </ModalWrapper>
  )
}
