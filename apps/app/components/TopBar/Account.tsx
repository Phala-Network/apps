import {walletDialogOpenAtom} from '@/store/ui'
import {Box, Button, useTheme} from '@mui/material'
import {polkadotAccountAtom, walletAtom} from '@phala/store'
import {useAtom} from 'jotai'
import Image from 'next/image'
import type {FC} from 'react'

const Account: FC = () => {
  const theme = useTheme()
  const [wallet] = useAtom(walletAtom)
  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  const [, setWalletDialogOpen] = useAtom(walletDialogOpenAtom)
  const isConnected = wallet !== null && polkadotAccount !== null
  return (
    <Button
      color={polkadotAccount != null ? 'inherit' : 'primary'}
      onClick={() => {
        setWalletDialogOpen(true)
      }}
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
      {polkadotAccount != null ? (
        <Box textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
          {polkadotAccount.name}
        </Box>
      ) : (
        'Connect Wallet'
      )}
    </Button>
  )
}

export default Account
