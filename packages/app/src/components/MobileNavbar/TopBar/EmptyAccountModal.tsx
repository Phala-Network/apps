import {AlertModal} from '@phala/react-components'

const EmptyAccountModal: React.FC<{
  visible: boolean
  onClose: () => void
}> = ({visible, onClose}) => {
  return (
    <AlertModal
      visible={visible}
      onClose={onClose}
      content={`No account found, please add account in your wallet or make sure that
      the correct wallet is used.`}
    />
  )
}

export default EmptyAccountModal
