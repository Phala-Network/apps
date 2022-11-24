import useAsset from '@/hooks/useAsset'
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
import {FC} from 'react'

const DelegatorSelect: FC = () => {
  const theme = useTheme()
  const [vaultId, setVaultId] = useAtom(vaultIdAtom)
  const [account] = useAtom(polkadotAccountAtom)
  const {balance} = useAsset(account?.address, vaultId === null ? undefined : 1)
  const vaults = ['12321', '1233', '424']

  if (!account) return null
  return (
    <TextField
      value={vaultId || 'account'}
      select
      size="small"
      disabled={!vaults.length}
      FormHelperTextProps={{sx: {textAlign: 'right', mx: 0}}}
      onChange={(e) => {
        setVaultId(e.target.value === 'account' ? null : e.target.value)
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
      <MenuItem value="account">
        <Stack direction="row" spacing={1}>
          <Chip
            label="Account"
            size="small"
            sx={{
              transition: 'none',
              backgroundColor: colors.main[300],
              color: theme.palette.getContrastText(colors.main[300]),
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
      {vaults.map((pid) => (
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
            <span>{pid}</span>
          </Stack>
        </MenuItem>
      ))}
    </TextField>
  )
}

export default DelegatorSelect
