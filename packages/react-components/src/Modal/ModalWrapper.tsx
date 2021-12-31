import styled from 'styled-components'
import {Modal, ModalProps} from 'baseui/modal'

const ModalTitle = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  margin-bottom: 30px;
`

interface IModalProps extends ModalProps {
  visible: boolean
  title?: React.ReactNode
}

export const ModalWrapper = (props: IModalProps): JSX.Element => {
  const {title, children, visible, onClose, closeable} = props
  return (
    <Modal
      // From https://baseweb.design/components/modal:
      // Makes modal scrollable while cursor is over the modal's backdrop.
      // Will be removed and implemented as the default behavior in the
      // next major version.
      unstable_ModalBackdropScroll={true}
      onClose={onClose}
      closeable={closeable === undefined ? false : closeable}
      isOpen={visible}
      overrides={{
        Dialog: {
          style: () => ({
            boxSizing: 'border-box',
            width: '615px',
            outline: `2px #AAD829 solid`,
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
            padding: '40px',
          }),
        },
      }}
    >
      {title ? <ModalTitle>{title}</ModalTitle> : null}

      {children}
    </Modal>
  )
}
