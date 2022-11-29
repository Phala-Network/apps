import useAccountQuery from '@/hooks/useAccountQuery'
import useAsset from '@/hooks/useAsset'
import useSelectedVaultState from '@/hooks/useSelectedVaultState'
import {colors} from '@/lib/theme'
import {vaultIdAtom} from '@/store/common'
import {
  Box,
  Chip,
  MenuItem,
  Skeleton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {formatCurrency} from '@phala/util'
import {useAtom} from 'jotai'
import {FC, useMemo} from 'react'

const ACCOUNT = 'account'

const DelegatorSelect: FC<{isVault?: boolean}> = ({isVault = false}) => {
  const theme = useTheme()
  const [account] = useAtom(polkadotAccountAtom)
  const [, setVaultId] = useAtom(vaultIdAtom)
  const {data: accountData} = useAccountQuery()
  const vaultIds = useMemo(
    () => accountData?.accountById?.ownedPools.map((x) => x.id) ?? [],
    [accountData?.accountById?.ownedPools]
  )
  const selectedVaultState = useSelectedVaultState()
  const {balance} = useAsset(
    selectedVaultState !== undefined
      ? selectedVaultState
        ? selectedVaultState.account.id
        : account?.address
      : undefined,
    selectedVaultState ? 1 : undefined
  )
  if (!account || !accountData) return null
  // MEMO: vault cannot delegate to another vault
  const value = (!isVault && selectedVaultState?.id) || ACCOUNT

  return (
    <TextField
      value={value}
      select
      size="small"
      disabled={isVault || !vaultIds.length}
      FormHelperTextProps={{sx: {textAlign: 'right', mx: 0}}}
      onChange={(e) => {
        setVaultId(e.target.value === ACCOUNT ? null : e.target.value)
      }}
      helperText={
        <Typography variant="num7">
          {balance ? (
            `${formatCurrency(balance)} PHA`
          ) : (
            <Skeleton width={55} sx={{marginLeft: 'auto'}} />
          )}
        </Typography>
      }
      SelectProps={{
        sx: {
          borderRadius: '20px',
          background: theme.palette.action.hover,
          fieldset: {border: 'none'},
          '.MuiSelect-select': {pl: '9px', py: 1},
        },
      }}
    >
      <MenuItem value={ACCOUNT}>
        <Stack direction="row" spacing={1}>
          <Chip
            label="Account"
            size="small"
            sx={{
              transition: 'none',
              backgroundColor: colors.main[300],
              color: theme.palette.getContrastText(colors.main[300]),
              WebkitTextFillColor: 'currentColor',
            }}
          />
          <Box
            sx={{
              maxWidth: '40px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {account.name}
          </Box>
        </Stack>
      </MenuItem>
      {vaultIds.map((pid) => (
        <MenuItem value={pid} key={pid}>
          <Stack direction="row" spacing={1}>
            <Chip
              label="Vault"
              size="small"
              sx={{
                transition: 'none',
                backgroundColor: colors.vault[300],
                color: theme.palette.getContrastText(colors.vault[300]),
              }}
            />
            <span>{`#${pid}`}</span>
          </Stack>
        </MenuItem>
      ))}
    </TextField>
  )
}

export default DelegatorSelect
