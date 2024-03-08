import PhalaLogo from '@/assets/phala_logo.svg'
import {WPHA_ASSET_ID} from '@/config'
import useAssetBalance from '@/hooks/useAssetBalance'
import useWrapAsset from '@/hooks/useWrapAsset'
import {useAccountByIdQuery} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import {chainAtom, subsquidClientAtom} from '@/store/common'
import {assetVisibleAtom, walletDialogOpenAtom} from '@/store/ui'
import ContentCopy from '@mui/icons-material/ContentCopy'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import RemoveRedEye from '@mui/icons-material/RemoveRedEye'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Box,
  Button,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import {toCurrency, trimAddress} from '@phala/lib'
import {polkadotAccountAtom} from '@phala/store'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import {useSnackbar} from 'notistack'
import type {FC} from 'react'
import WikiButton from './Wiki/Button'

const BalanceBox = styled(Box)(({theme}) =>
  theme.unstable_sx({
    flex: 1,
    background: colors.main[500],
    padding: {xs: 1, sm: 1.5},
    borderRadius: '2px',
  }),
)

const Identicon = dynamic(
  async () => await import('@polkadot/react-identicon'),
  {
    ssr: false,
  },
)

const DashboardAccount: FC = () => {
  const router = useRouter()
  const [chain] = useAtom(chainAtom)
  const [, setWalletDialogOpen] = useAtom(walletDialogOpenAtom)
  const wrapAsset = useWrapAsset()
  const {enqueueSnackbar} = useSnackbar()
  const [assetVisible, setAssetVisible] = useAtom(assetVisibleAtom)
  const [account] = useAtom(polkadotAccountAtom)
  const freeBalance = useAssetBalance(account?.address, 'free')
  const wrapped = useAssetBalance(account?.address, WPHA_ASSET_ID)
  const [subsquidClient] = useAtom(subsquidClientAtom)
  const {data: accountData} = useAccountByIdQuery(
    subsquidClient,
    {accountId: account?.address ?? ''},
    {
      enabled: account?.address !== undefined,
      select: (data) =>
        data.accountById ?? {vaultValue: '0', stakePoolValue: '0'},
    },
  )

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
            {account != null ? (
              <Identicon value={account.address} theme="polkadot" size={64} />
            ) : (
              <PhalaLogo width="100%" />
            )}
          </Box>
          <Stack flex="1" alignItems="flex-start">
            <Typography
              variant="h4"
              component="div"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              minWidth={0}
            >
              {account != null ? account.name : 'Phala App'}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              sx={{cursor: account != null ? 'pointer' : 'auto'}}
              onClick={() => {
                if (account != null) {
                  void navigator.clipboard.writeText(account.address)
                  enqueueSnackbar('Copied to clipboard')
                }
              }}
            >
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
              >
                {account != null
                  ? trimAddress(account.address)
                  : 'To host, connect, and gain in the world of Web3'}
              </Typography>
              {account !== null && (
                <ContentCopy sx={{ml: 1, width: 16}} color="disabled" />
              )}
            </Stack>
          </Stack>
          {account != null ? (
            <IconButton
              onClick={() => {
                setAssetVisible((x) => !x)
              }}
            >
              {assetVisible ? (
                <RemoveRedEye color="disabled" />
              ) : (
                <VisibilityOff color="disabled" />
              )}
            </IconButton>
          ) : (
            <Button
              sx={{flexShrink: 0, display: {xs: 'none', sm: 'inline-flex'}}}
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
            <WikiButton entry="balance">
              <Typography
                variant="subtitle1"
                color="text.secondary"
                lineHeight={1}
              >
                Balance
              </Typography>
            </WikiButton>

            <Typography variant="num3" mt={1} component="div" lineHeight={1}>
              {account != null ? (
                freeBalance != null ? (
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
          <BalanceBox
            onClick={() => {
              void router.push(`/${chain}/delegate/my-delegation`, undefined, {
                shallow: true,
              })
            }}
          >
            <Stack direction="row" alignItems="center">
              <Box>
                <WikiButton entry="delegation">
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    lineHeight={1}
                  >
                    Delegation
                  </Typography>
                </WikiButton>
                <Typography
                  variant="num3"
                  mt={1}
                  component="div"
                  lineHeight={1}
                >
                  {account != null ? (
                    accountData != null && wrapped != null ? (
                      <>
                        {wrapAsset(
                          toCurrency(
                            new Decimal(accountData.vaultValue)
                              .plus(accountData.stakePoolValue)
                              .plus(wrapped),
                          ),
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
              </Box>
              <KeyboardArrowRight sx={{ml: 'auto'}} />
            </Stack>
          </BalanceBox>
        </Stack>
      </Box>
    </Paper>
  )
}

export default DashboardAccount
