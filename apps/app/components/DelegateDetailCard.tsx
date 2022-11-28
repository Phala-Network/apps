import ClientOnly from '@/components/ClientOnly'
import useAccountQuery from '@/hooks/useAccountQuery'
import useAsset from '@/hooks/useAsset'
import useSelectedVaultState from '@/hooks/useSelectedVaultState'
import {BasePoolKind} from '@/lib/subsquid'
import {colors} from '@/lib/theme'
import {
  Box,
  Button,
  Chip,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {formatCurrency} from '@phala/util'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {FC, useMemo} from 'react'
import DelegatorSelect from './DelegatorSelect'

const DelegateDataCard: FC<{
  kind: BasePoolKind
  count?: number
  value?: string
}> = ({kind, count, value}) => {
  const theme = useTheme()
  const isVault = kind === BasePoolKind.Vault
  const label = isVault ? 'Vault' : 'Stake Pool'
  const background = isVault ? colors.vault[300] : colors.main[500]

  return (
    <Box
      sx={{background}}
      borderRadius="2px"
      px={{xs: 1.5, sm: 2}}
      py={{xs: 1, sm: 1.5}}
    >
      <Stack direction="row" alignItems="center" height={24}>
        <Typography
          variant="subtitle1"
          color={theme.palette.text.secondary}
          lineHeight={1}
        >
          {label}
        </Typography>
        {!!count && <Chip size="small" label={count} sx={{ml: 'auto'}} />}
      </Stack>
      <Typography
        variant="num3"
        component="div"
        mb={{xs: 0, md: 0.5}}
        mt={{xs: -0.5, md: 0}}
      >
        <ClientOnly fallback={<Skeleton width={64} />}>
          {value &&
            (value === '-' ? (
              '-'
            ) : (
              <>
                {formatCurrency(value)}
                <sub>PHA</sub>
              </>
            ))}
        </ClientOnly>
      </Typography>
      <Stack direction="row" alignItems="baseline" spacing={1}>
        <Typography
          variant="caption"
          component="div"
          color={theme.palette.text.secondary}
        >
          {isVault ? 'Est. APY' : 'Est. APR'}
        </Typography>
        {/* <Typography variant="num7" component="div">
          34.5%
        </Typography> */}
      </Stack>
    </Box>
  )
}

const DelegateDetailCard: FC = () => {
  const {data} = useAccountQuery()
  const theme = useTheme()
  const [account] = useAtom(polkadotAccountAtom)
  const {balance: locked} = useAsset(account?.address, 1)
  const accountState = data?.accountById
  const selectedVaultState = useSelectedVaultState()
  const isAccount = selectedVaultState === null
  const {stakePoolNftCount, stakePoolValue, vaultNftCount, vaultValue} =
    selectedVaultState?.account ?? accountState ?? {}

  const totalValue = useMemo(() => {
    if (!stakePoolValue || !vaultValue) return
    return formatCurrency(new Decimal(stakePoolValue).plus(vaultValue))
  }, [stakePoolValue, vaultValue])

  return (
    <Paper sx={{p: {xs: 1.5, sm: 2}, background: 'none'}}>
      <Stack spacing={{xs: 1.5, sm: 2}}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography
              variant="subtitle1"
              component="div"
              color={theme.palette.text.secondary}
            >
              Delegation
            </Typography>
            <Typography
              variant="num1"
              component="div"
              display={{xs: 'none', md: 'block'}}
              lineHeight="1.2"
            >
              {totalValue ? (
                <>
                  {totalValue}
                  <sub>PHA</sub>
                </>
              ) : (
                <Skeleton width={128} />
              )}
            </Typography>
            <Typography
              variant="num2"
              component="div"
              display={{xs: 'block', md: 'none'}}
              lineHeight="36px"
            >
              {totalValue ? (
                <>
                  {totalValue}
                  <sub>PHA</sub>
                </>
              ) : (
                <Skeleton width={64} />
              )}
            </Typography>
          </Box>
          <DelegatorSelect />
        </Stack>
        <Stack
          direction="row"
          spacing={{xs: 1.5, sm: 2}}
          sx={{'>div': {flex: '1 0'}}}
        >
          <DelegateDataCard
            kind={BasePoolKind.Vault}
            count={vaultNftCount}
            value={isAccount ? vaultValue : '-'}
          />
          <DelegateDataCard
            kind={BasePoolKind.StakePool}
            count={stakePoolNftCount}
            value={stakePoolValue}
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          borderRadius="2px"
          pl={{xs: 1, sm: 2}}
          pr={0.5}
          py={1}
          sx={{background: theme.palette.action.hover}}
        >
          <Typography
            lineHeight="32px"
            variant="subtitle1"
            component="div"
            color={theme.palette.text.secondary}
            alignSelf="baseline"
          >
            Locked
          </Typography>
          <Typography
            variant="num6"
            component="div"
            flex="1 0"
            ml={1.5}
            alignSelf="baseline"
          >
            <ClientOnly fallback={<Skeleton width={100} />}>
              {isAccount ? locked && `${formatCurrency(locked)} PHA` : '-'}
            </ClientOnly>
          </Typography>
          <ClientOnly>
            {isAccount && (
              <>
                <Button variant="text" size="small">
                  Claim All
                </Button>
                <Button variant="text" size="small">
                  Track
                </Button>
              </>
            )}
          </ClientOnly>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default DelegateDetailCard
