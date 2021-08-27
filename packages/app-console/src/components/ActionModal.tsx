import styled from 'styled-components'
import {Button, Modal, ModalProps} from '@phala/react-components'
import {useCallback, useState} from 'react'

type ActionModalProps = Omit<ModalProps, 'actions' | 'visible'> & {
  subtitle?: string
  onConfirm: () => Promise<unknown>
  disabled?: boolean
}

const Subtitle = styled.div`
  font-size: 12px;
  color: #878787;
`

export const Value = styled.div`
  word-break: break-all;
  font-size: 20px;
  font-weight: bold;
  color: #202020;
`

export const Label = styled.div`
  font-size: 12px;
  color: #878787;
  margin-top: 24px;
  margin-bottom: 12px;
`

const ActionModal: React.FC<ActionModalProps> = (props) => {
  const {onConfirm, onClose, disabled, children, subtitle, ...restProps} = props
  const [loading, setLoading] = useState(false)
  const onConfirmClick = useCallback(() => {
    setLoading(true)
    onConfirm()
      .then(() => {
        onClose?.()
      })
      .catch(() => {
        setLoading(false)
      })
  }, [onConfirm, onClose])

  return (
    <Modal
      visible={true}
      actions={[
        <Button key="cancel" onClick={() => onClose?.()}>
          Cancel
        </Button>,
        <Button
          disabled={disabled}
          key="confirm"
          type="primary"
          onClick={onConfirmClick}
          loading={loading}
        >
          Confirm
        </Button>,
      ]}
      onClose={onClose}
      {...restProps}
    >
      {Boolean(subtitle) && <Subtitle>{subtitle}</Subtitle>}
      {children}
    </Modal>
  )
}

export default ActionModal
