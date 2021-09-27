import {useEthereumAccountAtom} from '@phala/app-store'
import {Account} from '@phala/app-types'
import {useSSR} from '@phala/react-hooks'
import {useTranslation} from '@phala/react-i18n'
import {useAccountsQuery, useEthers} from '@phala/react-libs'
import React, {useEffect, useMemo} from 'react'
import {AlertModal} from '../AlertModal'
import {EthereumInstallModal} from '../EthereumInstallModal'
import {SelectAccountModal} from '../SelectAccountModal'

type Props = {
  visible: boolean
  onClose(): void
}

export const EthereumAccountModal: React.FC<Props> = (props) => {
  const {t} = useTranslation()
  const {data: accounts = []} = useAccountsQuery()
  const {readystate: readyState} = useEthers()
  const isReady = readyState === 'connected'
  const [ethereumAccount, setEthereumAccount] = useEthereumAccountAtom()
  const accountsIsEmpty = accounts.length === 0
  const ethereumAccounts = useMemo(
    () =>
      accounts?.map<Account>((address) => ({
        address,
      })),
    [accounts]
  )
  const {isServer} = useSSR()

  useEffect(() => {
    const [account] = accounts
    if (!accounts || !isReady || accountsIsEmpty) {
      return
    }

    setEthereumAccount({
      name: account,
      address: account || '',
    })
  }, [accounts, isReady, accountsIsEmpty, setEthereumAccount])

  if (isServer) return null

  if (window && !window?.web3?.currentProvider?.isMetaMask) {
    return <EthereumInstallModal {...props}></EthereumInstallModal>
  }

  if (!isReady) {
    return <AlertModal content={t('metamask_allow_access')} {...props} />
  }

  if (accountsIsEmpty) {
    return <AlertModal content={t('metamask_no_account_found')} {...props} />
  }

  return (
    <SelectAccountModal
      {...props}
      accounts={ethereumAccounts}
      currentAccount={ethereumAccount}
      onSelect={(account) => setEthereumAccount(account)}
    />
  )
}
