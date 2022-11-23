import useAsset from '@/hooks/useAsset'
import {colors} from '@/lib/theme'
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
import {useAtom} from 'jotai'
import {FC} from 'react'

const DelegatorSelect: FC = () => {
  const theme = useTheme()
  const [account] = useAtom(polkadotAccountAtom)
  const {balance} = useAsset(account?.address, 1)
  const vaults = ['12321', '1233', '424']

  if (!account) return null
  return (
    <TextField
      value={-1}
      select
      size="small"
      disabled={!vaults.length}
      FormHelperTextProps={{sx: {textAlign: 'right'}}}
      helperText={
        <Typography variant="num7">
          {balance ? (
            `${balance.toString()} PHA`
          ) : (
            <Skeleton width={55} sx={{marginLeft: 'auto'}} />
          )}
        </Typography>
      }
    >
      <MenuItem value={-1}>
        <Stack direction="row" spacing={1}>
          <Chip
            label="Account"
            size="small"
            sx={{
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
