import { useAtom } from 'jotai'
import React, { useMemo } from 'react'
import polkadotAccountAtom from '../atoms/polkadotAccountAtom'
import useSSR from '../hooks/useSSR'
import { useApiPromise } from '../libs/polkadot/hooks/useApiPromise'
import { useWeb3 } from '../libs/polkadot/hooks/useWeb3'
import { useAddressNormalizer } from '../libs/polkadot/useAddressNormalizer'
import AlertModal from './AlertModal'
import PolkadotInstallModal from './PolkadotInstallModal'
import SelectAccountModal from './SelectAccountModal'

type Props = {
  visible: boolean
  onClose: () => void
}

export function web3IsInjected(): boolean {
  if (typeof window === undefined) return false

  return window?.injectedWeb3 && Object.keys(window?.injectedWeb3).length !== 0
}

const PolkadotAccountModal: React.FC<Props> = (props) => {
  const { accounts, enabled } = useWeb3()
  const { api } = useApiPromise()
  const normalizeAddress = useAddressNormalizer(api)
  const { isServer } = useSSR()
  const [polkadotAccount, setPolkadotAccount] = useAtom(polkadotAccountAtom)
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
    return (
      <AlertModal
        content="Please allow access in the Polkadot extension."
        {...props}
      />
    )
  }

  if (polkadotAccounts.length === 0) {
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
      accounts={polkadotAccounts}
      currentAccount={polkadotAccount}
      onSelect={(account) => setPolkadotAccount(account)}
    />
  )
}

export default PolkadotAccountModal
