import {useCurrentAccount, useWallet} from '@phala/app-store'
import {Wallet} from '@phala/wallets/types'
import {ModalProps} from 'baseui/modal'
import {toaster} from 'baseui/toast'
import {VFC} from 'react'
import AccountModal from './AccountModal'
import WalletModal from './WalletModal'

export const SelectAccountModal: VFC<
  Required<Pick<ModalProps, 'isOpen' | 'onClose'>>
> = (props) => {
  const [currentAccount, setCurrentAccount] = useCurrentAccount()
  const [wallet, setWallet] = useWallet()
  const {isOpen, onClose} = props

  const showWalletModal = !currentAccount && !wallet

  const onSelectWallet = async (wallet: Wallet) => {
    try {
      await wallet.enable()
      setWallet(wallet)
    } catch (err) {
      if (err instanceof Error) {
        toaster.negative(err.message, {})
      }
      throw err
    }
  }

  const onSelectAccount = (address: string) => {
    setCurrentAccount(address)
    onClose({})
  }

  const onDisconnect = () => {
    setCurrentAccount(null)
    setWallet(null)
  }

  return (
    <>
      <WalletModal
        isOpen={isOpen && showWalletModal}
        onSelect={onSelectWallet}
        onClose={onClose}
      />
      <AccountModal
        isOpen={isOpen && !showWalletModal}
        onSelect={onSelectAccount}
        onDisconnect={onDisconnect}
        onClose={(args) => {
          // If no account is selected, clear wallet and start over next time
          if (!currentAccount) {
            setWallet(null)
          }
          onClose(args)
        }}
      />
    </>
  )
}
