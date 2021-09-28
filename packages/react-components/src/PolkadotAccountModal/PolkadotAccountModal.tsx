import {usePolkadotAccountAtom} from '@phala/app-store'
import {useSSR} from '@phala/react-hooks'
import {useTranslation} from '@phala/react-i18n'
import {
  useAddressNormalizer,
  useApiPromise,
  usePolkadotWeb3,
} from '@phala/react-libs'
import React, {useMemo} from 'react'
import {AlertModal} from '../AlertModal'
import {PolkadotInstallModal} from '../PolkadotInstallModal'
import {SelectAccountModal} from '../SelectAccountModal'

type Props = {
  visible: boolean
  onClose: () => void
}

export function web3IsInjected(): boolean {
  if (typeof window === undefined) return false

  return window?.injectedWeb3 && Object.keys(window?.injectedWeb3).length !== 0
}

export const PolkadotAccountModal: React.FC<Props> = (props) => {
  const {t} = useTranslation()
  const {accounts, enabled} = usePolkadotWeb3()
  const {api} = useApiPromise()
  const normalizeAddress = useAddressNormalizer(api)
  const {isServer} = useSSR()
  const [polkadotAccount, setPolkadotAccount] = usePolkadotAccountAtom()
  const polkadotAccounts = useMemo(
    () =>
      accounts.map((item) => ({
        name: item.meta?.name || 'Account',
        address: normalizeAddress(item.address),
      })),
    [accounts, normalizeAddress]
  )

  if (isServer) return null

  if (!web3IsInjected()) {
    return <PolkadotInstallModal {...props}></PolkadotInstallModal>
  }

  if (!enabled) {
    return <AlertModal content={t('polkadot.allow_access')} {...props} />
  }

  if (polkadotAccounts.length === 0) {
    return <AlertModal content={t('polkadot.no_account_found')} {...props} />
  }

  return (
    <SelectAccountModal
      {...props}
      accounts={polkadotAccounts}
      currentAccount={polkadotAccount}
      onSelect={(account) => setPolkadotAccount(account)}
    />
  )
}
