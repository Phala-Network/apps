import React from 'react'
import Button from '../Button'
import {Modal} from '../Modal'
import {Content} from './styledComponets'

export type AlertModalProps = {
  content: React.ReactNode
  visible: boolean
  onClose: () => void
}

export const AlertModal: React.FC<AlertModalProps> = (props) => {
  return (
    <Modal {...props} title="Alert">
      <Content>{props.content}</Content>
      <Button style={{width: '100%'}} onClick={() => props.onClose?.()}>
        Cancel
      </Button>
    </Modal>
  )
}
