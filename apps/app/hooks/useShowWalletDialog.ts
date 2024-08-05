import {walletDialogOpenAtom} from '@/store/ui'
import {useTimeout} from '@phala/lib'
import {polkadotAccountAtom} from '@phala/store'
import {useAtom} from 'jotai'
import {usePathname} from 'next/navigation'

const whiteListPathnames = ['/phala', '/khala', '/wiki']

const useShowWalletDialog = (): void => {
  const pathname = usePathname()
  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  const [, setWalletDialogOpen] = useAtom(walletDialogOpenAtom)
  useTimeout(() => {
    if (!whiteListPathnames.includes(pathname) && !polkadotAccount) {
      setWalletDialogOpen(true)
    }
  }, 5000)
}

export default useShowWalletDialog
