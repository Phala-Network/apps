import {polkadotWalletModalOpenAtom} from '@/store/polkadotWalletModal'
import {
  polkadotAccountAtom,
  polkadotAccountsAtom,
  walletAtom,
} from '@phala/store'
import {WalletSelect} from '@talisman-connect/components'
import {useAtom} from 'jotai'
import {FC} from 'react'

const PolkadotWalletDialog: FC = () => {
  const [open, setOpen] = useAtom(polkadotWalletModalOpenAtom)
  const [, setPolkadotAccount] = useAtom(polkadotAccountAtom)
  const [, setPolkadotAccounts] = useAtom(polkadotAccountsAtom)
  const [, setWallet] = useAtom(walletAtom)
  return (
    <WalletSelect
      dappName="SubBridge"
      open={open}
      showAccountsList
      onWalletConnectClose={() => setOpen(false)}
      onWalletSelected={(wallet) => {
        if (wallet.installed) {
          setWallet(wallet)
        }
      }}
      onUpdatedAccounts={(accounts) => {
        if (accounts) {
          setPolkadotAccounts(accounts)
        }
      }}
      onAccountSelected={(account) => {
        setPolkadotAccount(account.address)
      }}
    />
  )
}

export default PolkadotWalletDialog
