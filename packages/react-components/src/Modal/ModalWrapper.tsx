import styled from 'styled-components'
import {down} from 'styled-breakpoints'
import {Modal, ModalProps} from 'baseui/modal'

const ModalTitle = styled.div`
  font-family: Montserrat;
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
  padding-bottom: 30px;

  ${down('md')} {
    padding-bottom: 20px;
  }
`

interface IModalProps extends ModalProps {
  visible: boolean
  title?: React.ReactNode
}

export const ModalWrapper: React.FC<IModalProps> = (props) => {
  const {title, children, visible, ...params} = props
  return (
    <Modal
      closeable={false}
      isOpen={visible}
      overrides={{
        Dialog: {
          style: ({$theme}) => ({
            boxSizing: 'border-box',
            width: '615px',
            outline: `2px #AAD829 solid`,
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
            padding: '40px',
            [$theme.mediaQuery.medium]: {
              padding: '20px',
            },
          }),
        },
      }}
      {...params}
    >
      {title ? <ModalTitle>{title}</ModalTitle> : null}

      {children}
    </Modal>
  )
}
