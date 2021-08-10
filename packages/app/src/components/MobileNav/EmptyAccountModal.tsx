import Modal from '../Modal'
import Button from '../Button'
import styled from 'styled-components'

const Content = styled.div`
  color: #848484;
  font-family: Lato;
  font-size: 14px;
`

const ConfirmButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`

const EmptyAccountModal: React.FC<{
  visible: boolean
  onClose: () => void
}> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} title="Alert">
      <Content>
        No account found, please add account in your wallet or make sure that
        the correct wallet is used.
      </Content>
      <ConfirmButton onClick={onClose}>OK</ConfirmButton>
    </Modal>
  )
}

export default EmptyAccountModal
