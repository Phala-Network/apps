import { useAtom } from 'jotai'
import React, { useEffect, useMemo } from 'react'
import ethereumAccountAtom from '../atoms/ethereumAccountAtom'
import useSSR from '../hooks/useSSR'
import { useEthers } from '../libs/ethereum/contexts/useEthers'
import { useAccountsQuery } from '../libs/ethereum/queries/useAccountsQuery'
import { Account, voidFn } from '../types/normal'
import AlertModal from './AlertModal'
import EthereumInstallModal from './EthereumInstallModal'
import SelectAccountModal from './SelectAccountModal'

type Props = {
  visible: boolean
  onClose: voidFn
}

const EthereumAccountModal: React.FC<Props> = (props) => {
  const { data: accounts = [] } = useAccountsQuery()
  const { readystate: readyState } = useEthers()
  const isReady = readyState === 'connected'
  const [ethereumAccount, setEthereumAccount] = useAtom(ethereumAccountAtom)
  const accountsIsEmpty = accounts.length === 0
  const ethereumAccounts = useMemo(
    () =>
      accounts?.map<Account>((address) => ({
        address,
      })),
    [accounts]
  )
  const { isServer } = useSSR()

  useEffect(() => {
    if (accounts.length === 0 || !isReady || accountsIsEmpty) {
      return
    }

    setEthereumAccount({
      name: accounts[0],
      address: accounts[0],
    })
  }, [accounts])

  if (isServer) return null

  if (window && !window?.web3?.currentProvider?.isMetaMask) {
    return <EthereumInstallModal {...props}></EthereumInstallModal>
  }

  if (!isReady) {
    return (
      <AlertModal
        content="Please allow access in the MetaMask extension."
        {...props}
      />
    )
  }

  if (accountsIsEmpty) {
    return (
      <AlertModal
        content="No account found, please add account in your wallet extension or unlock it."
        {...props}
      />
    )
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

export default EthereumAccountModal
