import {walletDialogOpenAtom} from '@/store/ui'
import {Button, useTheme} from '@mui/material'
import {polkadotAccountAtom, walletAtom} from '@phala/store'
import {useAtom} from 'jotai'
import Image from 'next/image'
import {FC} from 'react'

const Account: FC = () => {
  const theme = useTheme()
  const [wallet] = useAtom(walletAtom)
  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  const [, setWalletDialogOpen] = useAtom(walletDialogOpenAtom)
  return (
    <Button
      color={polkadotAccount ? 'inherit' : 'primary'}
      onClick={() => setWalletDialogOpen(true)}
      {...(polkadotAccount &&
        wallet && {
          startIcon: (
            <Image
              src={wallet.logo.src}
              alt={wallet.logo.alt}
              width={22}
              height={22}
            />
          ),
          sx: {color: theme.palette.text.secondary},
        })}
    >
      {polkadotAccount ? polkadotAccount.name : 'Connect Wallet'}
    </Button>
  )
}

export default Account
