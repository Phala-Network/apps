import PhalaLogo from '@/assets/phala_logo.svg'
import useAssetBalance from '@/hooks/useAssetBalance'
import useWrapAsset from '@/hooks/useWrapAsset'
import {subsquidClient} from '@/lib/graphql'
import {useAccountByIdQuery} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import {assetVisibleAtom, walletDialogOpenAtom} from '@/store/ui'
import ContentCopy from '@mui/icons-material/ContentCopy'
import RemoveRedEye from '@mui/icons-material/RemoveRedEye'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Box,
  Button,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  styled,
  Typography,
} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {toCurrency, trimAddress} from '@phala/util'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import dynamic from 'next/dynamic'
import {useSnackbar} from 'notistack'
import {FC} from 'react'

const BalanceBox = styled(Box)(({theme}) =>
  theme.unstable_sx({
    flex: 1,
    background: colors.main[500],
    padding: {xs: 1, sm: 2},
    borderRadius: '2px',
  })
)

const Identicon = dynamic(() => import('@polkadot/react-identicon'), {
  ssr: false,
})

const DashboardAccount: FC = () => {
  const [, setWalletDialogOpen] = useAtom(walletDialogOpenAtom)
  const wrapAsset = useWrapAsset()
  const {enqueueSnackbar} = useSnackbar()
  const [assetVisible, setAssetVisible] = useAtom(assetVisibleAtom)
  const [account] = useAtom(polkadotAccountAtom)
  const freeBalance = useAssetBalance(account?.address)
  const {data} = useAccountByIdQuery(
    subsquidClient,
    {accountId: account?.address ?? ''},
    {enabled: !!account?.address}
  )
  const accountData =
    data?.accountById === null
      ? {vaultValue: '0', stakePoolValue: '0'}
      : data?.accountById
  return (
    <Paper
      sx={{
        background: 'transparent',
        p: {xs: 2, md: 2.5},
        flex: 1,
        minWidth: 0,
      }}
    >
      <Box>
        <Stack direction="row" spacing={{xs: 2, md: 3}} alignItems="center">
          <Box
            width="64px"
            height="64px"
            borderRadius="32px"
            overflow="hidden"
            flexShrink="0"
          >
            {account ? (
              <Identicon value={account.address} theme="polkadot" size={64} />
            ) : (
              <PhalaLogo width="100%" />
            )}
          </Box>
          <Box flex="1">
            <Typography
              variant="h4"
              component="div"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              minWidth={0}
            >
              {account ? account.name : 'Phala App'}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              sx={{cursor: account ? 'pointer' : 'auto'}}
              onClick={() => {
                if (account) {
                  navigator.clipboard.writeText(account.address)
                  enqueueSnackbar('Copied to clipboard')
                }
              }}
            >
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
              >
                {account
                  ? trimAddress(account.address)
                  : 'To host, connect, and gain in the world of Web3'}
              </Typography>
              <ContentCopy sx={{ml: 1, width: 16}} color="disabled" />
            </Stack>
          </Box>
          {account ? (
            <IconButton onClick={() => setAssetVisible((x) => !x)}>
              {assetVisible ? (
                <RemoveRedEye color="disabled" />
              ) : (
                <VisibilityOff color="disabled" />
              )}
            </IconButton>
          ) : (
            <Button
              sx={{flexShrink: 0}}
              onClick={() => {
                setWalletDialogOpen(true)
              }}
            >
              Connect Wallet
            </Button>
          )}
        </Stack>

        <Stack spacing={{xs: 2, md: 2.5}} direction="row" mt={{xs: 2, md: 2.5}}>
          <BalanceBox>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              lineHeight={1}
            >
              Balance
            </Typography>
            <Typography variant="num3" mt={1} component="div" lineHeight={1}>
              {account ? (
                freeBalance ? (
                  <>
                    {wrapAsset(toCurrency(freeBalance))}
                    <sub>PHA</sub>
                  </>
                ) : (
                  <Skeleton width={120} />
                )
              ) : (
                '-'
              )}
            </Typography>
          </BalanceBox>
          <BalanceBox>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              lineHeight={1}
            >
              Delegation
            </Typography>
            <Typography variant="num3" mt={1} component="div" lineHeight={1}>
              {account ? (
                accountData ? (
                  <>
                    {wrapAsset(
                      toCurrency(
                        new Decimal(accountData.vaultValue).plus(
                          accountData.stakePoolValue
                        )
                      )
                    )}
                    <sub>PHA</sub>
                  </>
                ) : (
                  <Skeleton width={120} />
                )
              ) : (
                '-'
              )}
            </Typography>
          </BalanceBox>
        </Stack>
      </Box>
    </Paper>
  )
}

export default DashboardAccount
