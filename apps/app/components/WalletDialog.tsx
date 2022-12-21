import {walletDialogOpenAtom} from '@/store/ui'
import {jsx} from '@emotion/react'
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos'
import Download from '@mui/icons-material/Download'
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import {
  polkadotAccountAtom,
  polkadotAccountsAtom,
  walletAtom,
} from '@phala/store'
import type {Wallet} from '@talismn/connect-wallets'
import {useAtom} from 'jotai'
import Image from 'next/image'
import {FC, useEffect, useState} from 'react'

const walletsOrder = ['talisman', 'polkadot-js', 'subwallet-js']

const WalletDialog: FC = () => {
  const theme = useTheme()
  const [open, setOpen] = useAtom(walletDialogOpenAtom)
  const [polkadotAccount, setPolkadotAccount] = useAtom(polkadotAccountAtom)
  const [polkadotAccounts] = useAtom(polkadotAccountsAtom)
  const [, setWallet] = useAtom(walletAtom)
  const [wallets, setWallets] = useState<Wallet[]>([])

  const connected = !!polkadotAccounts

  useEffect(() => {
    let unmounted = false
    import('@talismn/connect-wallets').then(({getWallets}) => {
      const sortedWallets = getWallets().sort((a, b) => {
        return (
          walletsOrder.indexOf(a.extensionName) -
          walletsOrder.indexOf(b.extensionName)
        )
      })
      if (!unmounted) {
        setWallets(sortedWallets)
      }
    })
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false)
      }}
    >
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {connected ? 'Select Account' : 'Connect Wallet'}
        {connected && (
          <Button
            variant="text"
            size="small"
            onClick={() => {
              setWallet(null)
              setPolkadotAccount(null)
            }}
          >
            Disconnect
          </Button>
        )}
      </DialogTitle>
      {connected ? (
        polkadotAccounts.length ? (
          <Stack px={3} pb={3} spacing={2}>
            {polkadotAccounts.map((account) => {
              const isActive = polkadotAccount?.address === account.address
              return (
                <Button
                  color={isActive ? 'primary' : 'inherit'}
                  key={account.address}
                  onClick={() => {
                    setPolkadotAccount(account.address)
                    setOpen(false)
                  }}
                  sx={{
                    py: 1,
                    width: 1,
                    color: isActive ? undefined : 'rgba(255, 255, 255, 0.12)',
                    textAlign: 'initial',
                  }}
                >
                  <Box width={1}>
                    <Typography
                      variant="body1"
                      component="div"
                      color={isActive ? undefined : 'text.primary'}
                    >
                      {account.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      component="div"
                      color={isActive ? undefined : 'text.secondary'}
                    >
                      {account.address}
                    </Typography>
                  </Box>
                </Button>
              )
            })}
          </Stack>
        ) : (
          <Stack alignItems="center" pt={3} pb={5}>
            <Typography variant="subtitle1">No accounts found</Typography>
            <Typography variant="caption" color="text.secondary">
              Check wallet settings and try again
            </Typography>
          </Stack>
        )
      ) : (
        <Stack px={3} pb={3} spacing={2}>
          {wallets.map((w) => (
            <Button
              color="inherit"
              key={w.extensionName}
              sx={{
                width: 1,
                py: 2.5,
                color: 'rgba(255, 255, 255, 0.12)',
                textAlign: 'initial',
              }}
              {...(w.installed
                ? {
                    onClick: async () => {
                      await w.enable('Phala App')
                      setWallet(w)
                    },
                  }
                : {href: w.installUrl, target: '_blank'})}
            >
              <Image src={w.logo.src} alt={w.logo.alt} width={24} height={24} />
              <Typography ml={2} color="text.primary">
                {!w.installed && 'Install '}
                {w.title}
              </Typography>
              {jsx(w.installed ? ArrowForwardIos : Download, {
                fontSize: 'small',
                sx: {ml: 'auto', color: theme.palette.text.secondary},
              })}
            </Button>
          ))}
        </Stack>
      )}
    </Dialog>
  )
}

export default WalletDialog
