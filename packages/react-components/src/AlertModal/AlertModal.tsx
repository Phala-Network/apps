import {useTranslation} from '@phala/react-i18n'
import React from 'react'
import {Button} from '../Button'
import {Modal} from '../Modal'
import {Content} from './styledComponets'

export type AlertModalProps = {
  content: React.ReactNode
  visible: boolean
  onClose: () => void
}

export const AlertModal: React.FC<AlertModalProps> = (props) => {
  const {t} = useTranslation()

  return (
    <Modal {...props} title={t('account.alert')}>
      <Content>{props.content}</Content>
      <Button style={{width: '100%'}} onClick={() => props.onClose?.()}>
        Cancel
      </Button>
    </Modal>
  )
}
