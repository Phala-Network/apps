import {useCurrentAccount} from '@phala/app-store'
import {Modal, ModalProps} from 'baseui/modal'
import {useEffect, useState, VFC} from 'react'
import AccountModalBody from './AccountModalBody'
import WalletModalBody from './WalletModalBody'

export type SelectAccountModalProps = Required<
  Pick<ModalProps, 'isOpen' | 'onClose'>
>

export const SelectAccountModal: VFC<SelectAccountModalProps> = (props) => {
  const [polkadotAccount] = useCurrentAccount()
  const {isOpen, onClose} = props

  const [isWalletOpen, setIsWalletOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)

  useEffect(() => {
    if (polkadotAccount) {
      setIsAccountOpen(isOpen)
    } else {
      setIsWalletOpen(isOpen)
    }
  }, [isOpen, polkadotAccount])

  return (
    <>
      <Modal
        isOpen={isWalletOpen}
        onClose={onClose}
        overrides={{
          Dialog: {
            style: ({$theme}) => ({
              borderRadius: 0,
              borderWidth: '2px',
              borderColor: $theme.colors.accent,
              borderStyle: 'solid',
            }),
          },
        }}
      >
        <WalletModalBody />
      </Modal>
      <Modal
        isOpen={isAccountOpen}
        onClose={onClose}
        overrides={{
          Dialog: {
            style: ({$theme}) => ({
              borderRadius: 0,
              borderWidth: '2px',
              borderColor: $theme.colors.accent,
              borderStyle: 'solid',
            }),
          },
        }}
      >
        <AccountModalBody />
      </Modal>
    </>
  )
}
