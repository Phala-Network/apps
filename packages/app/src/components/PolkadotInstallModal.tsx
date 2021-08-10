import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import Modal from './Modal'

type Props = {
  visible: boolean
  onClose: () => void
}

const Content = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  color: #878787;
  margin-bottom: 28px;
`

const PolkadotInstallModal: React.FC<Props> = (props) => {
  return (
    <Modal {...props} title="Alert">
      <Content>{`No Polkadot{.js} extension found, please install it first.`}</Content>
      <Button
        type="primary"
        style={{ width: '100%' }}
        onClick={() => {
          window.open('https://polkadot.js.org/extension/')
          props.onClose()
        }}>
        Install
      </Button>
    </Modal>
  )
}

export default PolkadotInstallModal
