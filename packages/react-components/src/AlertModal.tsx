import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import Modal from './Modal'

type Props = {
  content: React.ReactNode
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

const AlertModal: React.FC<Props> = (props) => {
  return (
    <Modal {...props} title="Alert">
      <Content>{props.content}</Content>
      <Button
        style={{ width: '100%' }}
        onClick={() => {
          props.onClose()
        }}>
        Cancel
      </Button>
    </Modal>
  )
}

export default AlertModal
