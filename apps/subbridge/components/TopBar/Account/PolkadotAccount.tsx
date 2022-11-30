import {useCurrentPolkadotApi} from '@/hooks/usePolkadotApi'
import {polkadotAvailableBalanceFetcher} from '@/lib/polkadotFetcher'
import {polkadotWalletModalOpenAtom} from '@/store/polkadotWalletModal'
import {polkadotAccountAtom} from '@phala/store'
import {toCurrency} from '@phala/util'
import {useAtom} from 'jotai'
import {FC} from 'react'
import useSWR from 'swr'
import AccountTemplate from './AccountTemplate'

const PolkadotAccount: FC = () => {
  const [, setPolkadotWalletModalOpen] = useAtom(polkadotWalletModalOpenAtom)
  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  const polkadotApi = useCurrentPolkadotApi()
  const {data} = useSWR(
    polkadotApi && polkadotAccount
      ? [polkadotApi, polkadotAccount.address]
      : null,
    polkadotAvailableBalanceFetcher,
    {
      refreshInterval: 12000,
    }
  )

  const tokenSymbol = polkadotApi?.registry.chainTokens[0]

  const handleClick = () => {
    setPolkadotWalletModalOpen(true)
  }

  if (!polkadotAccount) return null

  return (
    <AccountTemplate
      balance={
        tokenSymbol && data !== undefined
          ? `${toCurrency(data)} ${tokenSymbol}`
          : undefined
      }
      account={polkadotAccount.name}
      ButtonProps={{onClick: handleClick}}
    />
  )
}

export default PolkadotAccount
