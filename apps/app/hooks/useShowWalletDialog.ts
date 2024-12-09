import {walletDialogOpenAtom} from '@/store/ui'
import {useTimeout} from '@phala/lib'
import {polkadotAccountAtom} from '@phala/store'
import {useAtom} from 'jotai'
import {useRouter} from 'next/router'

const whiteListPathnames = [
  '/[chain]',
  '/wiki',
  '/staking',
  '/claim-khala-assets',
]

const useShowWalletDialog = (): void => {
  const router = useRouter()
  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  const [, setWalletDialogOpen] = useAtom(walletDialogOpenAtom)
  useTimeout(() => {
    if (!whiteListPathnames.includes(router.pathname) && !polkadotAccount) {
      setWalletDialogOpen(true)
    }
  }, 5000)
}

export default useShowWalletDialog
