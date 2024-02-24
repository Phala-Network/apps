import ClientOnly from '@/components/ClientOnly'
import {WPHA_ASSET_ID} from '@/config'
import useAccountQuery from '@/hooks/useAccountQuery'
import useAssetBalance from '@/hooks/useAssetBalance'
import useGetApr from '@/hooks/useGetApr'
import useLockedWrappedBalance from '@/hooks/useLockedWrappedBalance'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSelectedVaultState from '@/hooks/useSelectedVaultState'
import useSignAndSend from '@/hooks/useSignAndSend'
import {aprToApy} from '@/lib/apr'
import type {BasePoolKind} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import {
  Box,
  Button,
  Chip,
  NoSsr,
  Paper,
  Skeleton,
  Stack,
  type SxProps,
  Typography,
  useTheme,
} from '@mui/material'
import {toCurrency, toPercentage} from '@phala/lib'
import {polkadotAccountAtom} from '@phala/store'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {type FC, useMemo} from 'react'
import DelegatorSelect from './DelegatorSelect'
import PromiseButton from './PromiseButton'
import Property from './Property'
import WikiButton from './Wiki/Button'
import WrapDecimal from './WrapDecimal'

const DelegationDataCard: FC<{
  kind: BasePoolKind
  count?: number
  value?: string | false
  aprMultiplier?: string | false
}> = ({kind, count, value, aprMultiplier}) => {
  const isVault = kind === 'Vault'
  const background = isVault ? colors.vault[300] : colors.main[500]
  const getApr = useGetApr()

  const apr = typeof aprMultiplier === 'string' && getApr(aprMultiplier)

  return (
    <Box sx={{background}} borderRadius="2px" px={1.5} py={1}>
      <Stack direction="row" alignItems="center" height={24}>
        <WikiButton entry={isVault ? 'vault' : 'stakePool'}>
          <Typography variant="subtitle1" color="text.secondary" lineHeight={1}>
            {kind}
          </Typography>
        </WikiButton>
        {typeof count === 'number' && count > 0 && (
          <Chip size="small" label={count} sx={{ml: 'auto'}} />
        )}
      </Stack>
      <Typography variant="num3" component="div" mt={{xs: -0.5, md: 0}}>
        <ClientOnly fallback={<Skeleton width={64} />}>
          {value === false
            ? '-'
            : typeof value === 'string' && (
                <>
                  {toCurrency(value)}
                  <sub>PHA</sub>
                </>
              )}
        </ClientOnly>
      </Typography>
      <Stack direction="row" alignItems="baseline" spacing={1}>
        <WikiButton entry="estApr">
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
            flexShrink="0"
          >
            {isVault ? 'Est. APY' : 'Est. APR'}
          </Typography>
        </WikiButton>
        <Typography
          variant="num6"
          component="div"
          maxWidth="100px"
          overflow="hidden"
        >
          <ClientOnly fallback={<Skeleton width={32} />}>
            {apr === false
              ? '-'
              : apr != null && toPercentage(isVault ? aprToApy(apr) : apr)}
          </ClientOnly>
        </Typography>
      </Stack>
    </Box>
  )
}

const DelegationDetailCard: FC<{sx?: SxProps}> = ({sx}) => {
  const {data: accountData} = useAccountQuery()
  const theme = useTheme()
  const api = usePolkadotApi()
  const signAndSend = useSignAndSend()
  const [account] = useAtom(polkadotAccountAtom)
  const lockedWrappedBalance = useLockedWrappedBalance(account?.address)
  const wrapped = useAssetBalance(account?.address, WPHA_ASSET_ID)
  const selectedVaultState = useSelectedVaultState()
  const asAccount = selectedVaultState === null
  const {
    stakePoolNftCount,
    stakePoolValue,
    stakePoolAvgAprMultiplier,
    vaultNftCount,
    vaultValue,
    vaultAvgAprMultiplier,
  } =
    selectedVaultState?.account ??
    (accountData === null
      ? {
          stakePoolNftCount: 0,
          stakePoolValue: '0',
          stakePoolAvgAprMultiplier: '0',
          vaultNftCount: 0,
          vaultValue: '0',
          vaultAvgAprMultiplier: '0',
        }
      : accountData) ??
    {}

  const totalValue = useMemo(() => {
    if (
      stakePoolValue === undefined ||
      vaultValue === undefined ||
      (wrapped == null && selectedVaultState === null)
    ) {
      return
    }

    let total = new Decimal(stakePoolValue).plus(vaultValue)
    if (selectedVaultState === null && wrapped != null) {
      total = total.plus(wrapped)
    }
    return toCurrency(total, 0)
  }, [stakePoolValue, vaultValue, selectedVaultState, wrapped])

  const unwrapAll = async (): Promise<void> => {
    if (api == null) return
    await signAndSend(api.tx.phalaWrappedBalances.unwrapAll())
  }

  return (
    <Paper
      sx={[
        {p: {xs: 1.5, sm: 2}, background: 'none'},
        // biome-ignore lint/suspicious/noExplicitAny: pass isArray type check
        ...(Array.isArray(sx) ? (sx as any[]) : [sx]),
      ]}
    >
      <Stack spacing={{xs: 1.5, sm: 2}}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Property label="Delegation" wikiEntry="delegation" size="large">
            {typeof totalValue === 'string' ? (
              <>
                <WrapDecimal>{totalValue}</WrapDecimal>
                <sub>PHA</sub>
              </>
            ) : (
              <Skeleton width={128} />
            )}
          </Property>
          <DelegatorSelect />
        </Stack>
        <Stack
          direction="row"
          spacing={{xs: 1.5, sm: 2}}
          sx={{'>div': {flex: '1 0'}}}
        >
          <DelegationDataCard
            kind="Vault"
            count={vaultNftCount}
            value={asAccount && vaultValue}
            aprMultiplier={asAccount && vaultAvgAprMultiplier}
          />
          <DelegationDataCard
            kind="StakePool"
            count={stakePoolNftCount}
            value={stakePoolValue}
            aprMultiplier={stakePoolAvgAprMultiplier}
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          borderRadius="2px"
          pl={1.5}
          pr={0.5}
          py={0.75}
          sx={{background: theme.palette.action.hover}}
        >
          <WikiButton entry="wrappedPHA">
            <Typography
              lineHeight="32px"
              variant="subtitle1"
              component="div"
              color="text.secondary"
              alignSelf="baseline"
            >
              Wrapped
            </Typography>
          </WikiButton>
          <Typography variant="num5" component="div" flex="1 0" ml={1.5}>
            <ClientOnly fallback={<Skeleton width={100} />}>
              {asAccount
                ? wrapped != null &&
                  lockedWrappedBalance != null && (
                    <>
                      {toCurrency(wrapped)} PHA
                      {lockedWrappedBalance.gt(0) && (
                        <Box component="span" color="text.secondary">
                          {' '}
                          / {toCurrency(lockedWrappedBalance)} PHA Locked
                        </Box>
                      )}
                    </>
                  )
                : '-'}
            </ClientOnly>
          </Typography>
          <NoSsr>
            {asAccount && (
              <>
                <PromiseButton
                  variant="text"
                  size="small"
                  disabled={wrapped == null || wrapped.eq(0)}
                  onClick={unwrapAll}
                >
                  Unwrap All
                </PromiseButton>
                <Button
                  variant="text"
                  size="small"
                  href="https://wiki.phala.network/en-us/general/applications/use-delegation-to-vote/#the-voting-is-over-how-can-i-unlock-my-voting-rights"
                  target="_blank"
                >
                  Track
                </Button>
              </>
            )}
          </NoSsr>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default DelegationDetailCard
