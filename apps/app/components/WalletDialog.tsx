import novaLogo from '@/assets/nova_logo.png'
import subwalletLogo from '@/assets/subwallet_logo.png'
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
  useMediaQuery,
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
import {type FC, useEffect, useState} from 'react'

const walletsOrder = ['subwallet-js', 'talisman', 'polkadot-js']

const WalletDialog: FC = () => {
  const theme = useTheme()
  const [open, setOpen] = useAtom(walletDialogOpenAtom)
  const [polkadotAccount, setPolkadotAccount] = useAtom(polkadotAccountAtom)
  const [polkadotAccounts] = useAtom(polkadotAccountsAtom)
  const [, setWallet] = useAtom(walletAtom)
  const [wallets, setWallets] = useState<Wallet[]>([])
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const connected = polkadotAccounts !== null

  useEffect(() => {
    let unmounted = false
    void import('@talismn/connect-wallets').then(({getWallets}) => {
      let sortedWallets = getWallets()
        .filter((x) => walletsOrder.includes(x.extensionName))
        .sort((a, b) => {
          return (
            walletsOrder.indexOf(a.extensionName) -
            walletsOrder.indexOf(b.extensionName)
          )
        })
      const subwalletWallet = sortedWallets.find(
        (w) => w.extensionName === 'subwallet-js',
      )
      if (subwalletWallet != null) {
        subwalletWallet.logo.src = subwalletLogo.src
        if (isMobile) {
          subwalletWallet.installUrl =
            'https://mobile.subwallet.app/browser?url=https%3A%2F%2Fapp.phala.network'
        }
      }
      const polkadotJsWallet = sortedWallets.find(
        (w) => w.extensionName === 'polkadot-js',
      )
      if (polkadotJsWallet != null && isMobile) {
        if (
          (window as {SubWallet?: {isSubWallet?: boolean}}).SubWallet
            ?.isSubWallet === true
        ) {
          polkadotJsWallet.title = 'SubWallet'
          polkadotJsWallet.logo = {src: subwalletLogo.src, alt: 'SubWallet'}
          sortedWallets = [polkadotJsWallet]
        } else if (
          (window as {walletExtension?: {isNovaWallet?: boolean}})
            .walletExtension?.isNovaWallet === true
        ) {
          polkadotJsWallet.title = 'Nova Wallet'
          polkadotJsWallet.logo = {src: novaLogo.src, alt: 'Nova Wallet'}
          sortedWallets = [polkadotJsWallet]
        }
      }

      if (!unmounted) {
        setWallets(sortedWallets)
      }
    })
    return () => {
      unmounted = true
    }
  }, [isMobile])

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
        polkadotAccounts.length > 0 ? (
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
                      sx={{wordBreak: 'break-all'}}
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
              {...(w.installed === true
                ? {
                    onClick: () => {
                      void (async () => {
                        await w.enable('Phala App')
                        setWallet(w)
                      })()
                    },
                  }
                : {href: w.installUrl, target: '_blank'})}
            >
              <Image src={w.logo.src} alt={w.logo.alt} width={24} height={24} />
              <Typography ml={2} color="text.primary">
                {w.installed !== true &&
                  !(w.extensionName === 'subwallet-js' && isMobile) &&
                  'Install '}
                {w.title}
              </Typography>
              {jsx(
                w.installed === true ||
                  (w.extensionName === 'subwallet-js' && isMobile)
                  ? ArrowForwardIos
                  : Download,
                {
                  fontSize: 'small',
                  sx: {ml: 'auto', color: theme.palette.text.secondary},
                },
              )}
            </Button>
          ))}
        </Stack>
      )}
    </Dialog>
  )
}

export default WalletDialog
