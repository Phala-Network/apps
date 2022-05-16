import {useCurrentAccount, walletAtom} from '@phala/store'
import {Wallet} from '@talisman-connect/wallets'
import {ModalProps} from 'baseui/modal'
import {toaster} from 'baseui/toast'
import {useAtom} from 'jotai'
import {FC} from 'react'
import AccountModal from './AccountModal'
import WalletModal from './WalletModal'

export const SelectAccountModal: FC<
  Required<Pick<ModalProps, 'isOpen' | 'onClose'>> & {dappName: string}
> = (props) => {
  const [currentAccount, setCurrentAccount] = useCurrentAccount()
  const [wallet, setWallet] = useAtom(walletAtom)
  const {isOpen, onClose} = props

  const showWalletModal = !currentAccount && !wallet

  const onSelectWallet = async (wallet: Wallet) => {
    try {
      await wallet.enable('Phala App')
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
