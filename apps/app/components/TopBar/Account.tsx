import {walletDialogOpenAtom} from '@/store/ui'
import {Box, Button, useTheme} from '@mui/material'
import {polkadotAccountAtom, walletAtom} from '@phala/store'
import {useAtom} from 'jotai'
import Image from 'next/image'
import {FC} from 'react'

const Account: FC = () => {
  const theme = useTheme()
  const [wallet] = useAtom(walletAtom)
  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  const [, setWalletDialogOpen] = useAtom(walletDialogOpenAtom)
  const isConnected = !!wallet && !!polkadotAccount
  return (
    <Button
      color={polkadotAccount ? 'inherit' : 'primary'}
      onClick={() => setWalletDialogOpen(true)}
      sx={{
        color: isConnected ? theme.palette.text.secondary : undefined,
        flexShrink: 0,
        maxWidth: 145,
      }}
      startIcon={
        isConnected && (
          <Image
            src={wallet.logo.src}
            alt={wallet.logo.alt}
            width={22}
            height={22}
          />
        )
      }
    >
      {polkadotAccount ? (
        <Box textOverflow="ellipsis" overflow="hidden">
          {polkadotAccount.name}
        </Box>
      ) : (
        'Connect Wallet'
      )}
    </Button>
  )
}

export default Account
